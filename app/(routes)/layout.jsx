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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [expanded, setExpanded] = useState(true);
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

    // console.log(result);
    if (result?.length == 0) {
      router.replace("/dashboard/budgets");
    }
  };

  // For responsiveness of SideNav based on screen size: When screen size becames smaller it will automatically collaps the sideNav for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      {/* <ClerkProvider> */}
      <SignedIn>
        <div
          className={`fixed md:block md:${() => setExpanded(flase)} ${
            !expanded && "w-20"
          }`}
        >
          <SideNav expanded={expanded} setExpanded={setExpanded} />
        </div>
        <div className={`${expanded ? "md:ml-64" : "ml-20"}`}>
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
