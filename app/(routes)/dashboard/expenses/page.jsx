"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  router.replace("/dashboard/expenses/0");
  return <div>Expenses</div>;
};

export default page;