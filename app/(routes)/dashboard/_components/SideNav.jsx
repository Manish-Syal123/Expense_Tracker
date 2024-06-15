"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  MoreVertical,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
const SideNav = ({ expanded, setExpanded }) => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image
        src={"/logo3-removebg.png"}
        alt="logo"
        width={expanded ? 195 : 0}
        height={200}
        className="overflow-hidden transition-all"
      />
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
      >
        {expanded ? <ChevronFirst /> : <ChevronLast />}
      </button>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 mb-2 items-center text-gray-500 font-medium p-5 
          cursor-pointer rounded-md hover:text-primary hover:bg-blue-100
          ${path == menu.path && "text-primary bg-blue-100"}
          overflow-hidden transition-all ${!expanded && "w-14"} group
          `}
            >
              <menu.icon />
              {expanded && menu.name}
              {!expanded && (
                <div
                  className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-blue-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                >
                  {menu.name}
                </div>
              )}
            </h2>
          </Link>
        ))}
      </div>
      <div
        className={`fixed bottom-10 p-5 flex gap-2 items-center 
         hover:text-primary hover:outline 
         rounded-md cursor-pointer overflow-hidden transition-all ${
           !expanded && "w-14"
         }`}
      >
        <UserButton />
        Profile
      </div>
    </div>
  );
};

export default SideNav;
