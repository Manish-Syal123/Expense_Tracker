import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import SideNav from "./[...dashboard]/_components/SideNav";
import DashboardHeader from "./[...dashboard]/_components/DashboardHeader";

export default function DashboardLayout({ children }) {
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
