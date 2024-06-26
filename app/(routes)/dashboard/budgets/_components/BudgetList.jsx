"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { Rabbit } from "lucide-react";

const BudgetList = () => {
  const [budgetList, setBudgetList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  // function to get list of budgets
  const getBudgetList = async () => {
    setLoading(true);
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
    setLoading(false);
    // console.log(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={() => getBudgetList()} />
        {loading &&
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div className="w-full bg-slate-200 rounded-lg h-[145px] animate-pulse"></div>
          ))}
        {budgetList?.length > 0 ? (
          budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))
        ) : (
          <div className="flex flex-col items-center mt-60">
            <Rabbit size={190} />

            <h2 className="font-bold md:text-xl lg:text-4xl">
              No Budget Found!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetList;

// <div className="mt-7">
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//   <CreateBudget refreshData={() => getBudgetList()} />
//   {budgetList?.length > 0
//     ? budgetList.map((budget, index) => (
//         <BudgetItem budget={budget} key={index} />
//       ))
//     : //Skeleton effect while loading
//       [1, 2, 3, 4, 5, 6].map((item, index) => (
//         <div className="w-full bg-slate-200 rounded-lg h-[145px] animate-pulse"></div>
//       ))}
// </div>
// </div>
