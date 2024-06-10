"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";

const DashboardPage = () => {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  // function to get list of budgets
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);

    // console.log(result);
  };
  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">
        Hii,
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          {user?.fullName}
        </span>
        ✌
      </h2>
      <p className="text-gray-500">
        Hear's what happening with your Money!, Let's manage your Expense
      </p>

      <CardInfo budgetList={budgetList} />
    </div>
  );
};

export default DashboardPage;
