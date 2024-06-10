"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ExpenseListTable from "./_components/ExpenseListTable";

const MyExpenses = () => {
  const [expensesList, setExpenseslist] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getAllExpenses();
  }, [user]);

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
    // console.log(result);
  };
  return (
    <div>
      <h2 className="font-bold text-3xl">My All Expenses</h2>
      <div className="mt-11">
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getAllExpenses()}
        />
      </div>
    </div>
  );
};

export default MyExpenses;
