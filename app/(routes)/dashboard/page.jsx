import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import DashboardPage from "./_components/DashboardPage";
const page = () => {
  const { userId } = auth();
  const isAuth = !!userId;

  return (
    <div>
      {!isAuth ? (
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      ) : (
        <div>
          <DashboardPage />
        </div>
      )}
    </div>
  );
};

export default page;
