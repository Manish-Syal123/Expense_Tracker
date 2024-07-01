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
  const [selectedYearMonth, setSelectedYearMonth] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    user && getAllExpenses();
  }, [user]);

  useEffect(() => {
    filterExpenses();
  }, [expensesList, selectedYear, selectedYearMonth]);

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

    // Parse database date format (assuming DD/MM/YYYY)
    const parsedExpenses = result.map((expense) => ({
      ...expense,
      createdAt: parseDatabaseDate(expense.createdAt),
    }));

    setExpenseslist(parsedExpenses);
  };

  // Function to parse database date format (DD/MM/YYYY) to Date object
  const parseDatabaseDate = (dateString) => {
    const parts = dateString.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]); // year, month (0-based), day
  };

  // Filter expenses based on selected year and month
  const filterExpenses = () => {
    console.log("Selected Year:", selectedYear);
    console.log("Selected YearMonth:", selectedYearMonth);
    console.log("Expenses List:", expensesList);

    if (selectedYearMonth instanceof Date && !isNaN(selectedYearMonth)) {
      const filtered = expensesList.filter((expense) => {
        const expenseDate = new Date(expense.createdAt);
        console.log("Expense Date:", expenseDate);
        return (
          expenseDate.getFullYear() === selectedYearMonth.getFullYear() &&
          expenseDate.getMonth() === selectedYearMonth.getMonth()
        );
      });
      console.log("Filtered by YearMonth:", filtered);
      setFilteredExpensesList(filtered);
    } else if (selectedYear !== null) {
      const filtered = expensesList.filter(
        (expense) => new Date(expense.createdAt).getFullYear() === selectedYear
      );
      console.log("Filtered by Year:", filtered);
      setFilteredExpensesList(filtered);
    } else {
      console.log("No filter applied, using all expenses");
      setFilteredExpensesList(expensesList);
    }
  };

  // Handle change when selecting year and month
  const handleYearMonthChange = (date) => {
    setSelectedYearMonth(date);
    setSelectedYear(null); // Reset year selection when month changes
  };

  // Handle change when selecting year only
  const handleYearChange = (date) => {
    if (date) {
      setSelectedYear(date.getFullYear());
    } else {
      setSelectedYear(null);
    }
    setSelectedYearMonth(null); // Reset month selection when year changes
  };

  return (
    <div className="mb-8">
      <h2 className="font-bold text-3xl">My All Expenses</h2>
      {/* Filter based on year or year & month */}
      <div className="md:flex justify-end sm:grid gap-4 items-center">
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
            disabled={selectedYearMonth !== null}
          />
        </div>
        <h3>OR</h3>
        <div className="mt-4">
          <DatePicker
            selected={selectedYearMonth}
            onChange={handleYearMonthChange}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            className="border p-2"
            placeholderText="Select Month and Year"
            showPopperArrow={false}
            customInput={<input type="text" className="border p-2" readOnly />}
            isClearable
          />
        </div>
      </div>

      <div className="mt-11">
        <ExpenseListTable
          expensesList={filteredExpensesList}
          refreshData={getAllExpenses} // Refresh data callback
        />
      </div>
    </div>
  );
};

export default MyExpenses;
