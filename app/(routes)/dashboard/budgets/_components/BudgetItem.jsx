import Link from "next/link";
import React from "react";

const BudgetItem = ({ budget }) => {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    if (perc >= 100) return 100;
    return perc.toFixed(2);
  };
  return (
    <Link
      href={"/dashboard/expenses/" + budget?.id}
      className="p-5 border rounded-lg hover:shadow-2xl hover:border hover:border-blue-200 cursor-pointer h-[170px]"
    >
      <div className="flex gap-2 items-center justify-between ">
        <div className="flex gap-2 items-center ">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2 className=" font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500 font-semibold">
              {budget.totalItem} item
            </h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg"> ${budget.amount}</h2>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs text-slate-400 font-semibold">
            ${budget.totalSpend ? budget.totalSpend : 0} Spend
          </h2>
          <h2 className="text-xs text-slate-400 font-semibold">
            ${budget.amount - budget.totalSpend} Remaining
          </h2>
        </div>
        {/* Progress bar */}
        <div className=" w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full"
            style={{
              width: `${calculateProgressPerc()}%`,
            }}
          ></div>
        </div>
        <p className="text-xs  text-slate-500 font-bold">
          {calculateProgressPerc()}%
        </p>
      </div>
    </Link>
  );
};

export default BudgetItem;
