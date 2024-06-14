"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import ExpenseListTable from "./_components/ExpenseListTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyExpenses = () => {
  const [expensesList, setExpenseslist] = useState([]);
  const [filteredExpensesList, setFilteredExpensesList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    user && getAllExpenses();
  }, [user]);

  useEffect(() => {
    if (selectedYear !== null) {
      const filtered = expensesList.filter(
        (expense) => new Date(expense.createdAt).getFullYear() === selectedYear
      );
      setFilteredExpensesList(filtered);
    } else {
      setFilteredExpensesList(expensesList);
    }
  }, [expensesList, selectedYear]);

  // Getting all the expenses of the current logged In user
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpenseslist(result);
  };

  const handleYearChange = (date) => {
    if (date) {
      setSelectedYear(date.getFullYear());
    } else {
      setSelectedYear(null);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">My All Expenses</h2>
      <div className="mt-4">
        <DatePicker
          selected={selectedYear ? new Date(selectedYear, 0) : null}
          onChange={handleYearChange}
          showYearPicker
          dateFormat="yyyy"
          className="border p-2"
          placeholderText="Select Year"
          showPopperArrow={false}
          customInput={<input type="text" className="border p-2" readOnly />}
          isClearable
        />
      </div>
      <div className="mt-11">
        <ExpenseListTable
          expensesList={filteredExpensesList}
          refreshData={() => getAllExpenses()}
        />
      </div>
    </div>
  );
};

export default MyExpenses;
