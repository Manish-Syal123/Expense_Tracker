import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
  const { user } = useUser();
  return (
    <div className="p-5 shadow-sm border-b flex justify-between">
      <div>
        <h2 className="font-bold text-3xl md: hidden sm:hidden lg:block">
          Hii,
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            {user?.fullName}
          </span>
          ✌
        </h2>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
