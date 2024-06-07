"use client";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/nextjs";
import SideNav from "./dashboard/_components/SideNav";
import DashboardHeader from "./dashboard/_components/DashboardHeader";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);
  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    console.log(result);
    if (result?.length == 0) {
      router.replace("/dashboard/budgets");
    }
  };
  return (
    <div>
      {/* <ClerkProvider> */}
      <SignedIn>
        <div className="fixed md:w-64 hidden md:block">
          <SideNav />
        </div>
        <div className="md:ml-64">
          <DashboardHeader />
          {children}
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      {/* </ClerkProvider> */}
    </div>
  );
}

//read this : https://clerk.com/docs/components/clerk-provider
