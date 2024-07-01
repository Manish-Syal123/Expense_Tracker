import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Rabbit, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ExpenseListTable = ({ expensesList, refreshData }) => {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast("Expense Deleted!");
      refreshData();
    }
  };

  const formatDate = (date) => {
    if (typeof date === "string") {
      date = new Date(date);
    }
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString();
    }
    return "Invalid date";
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 bg-slate-200 p-2 mt-3 font-semibold">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>
      {expensesList?.length > 0 ? (
        expensesList.map((expenses, index) => (
          <div className="grid grid-cols-4 bg-slate-50 p-2" key={index}>
            <h2>{expenses.name}</h2>
            <h2>{expenses.amount}</h2>
            <h2>{formatDate(expenses.createdAt)}</h2>{" "}
            {/* Ensure proper date format */}
            <h2>
              <Trash
                onClick={() => deleteExpense(expenses)}
                className="text-red-600 cursor-pointer"
              />
            </h2>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center mt-10">
          <Rabbit size={150} />
          <h2 className="font-bold text-xl">No Expense Found!</h2>
        </div>
      )}
    </div>
  );
};

export default ExpenseListTable;
