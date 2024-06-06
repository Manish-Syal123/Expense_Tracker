import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import SideNav from "./dashboard/_components/SideNav";
import DashboardHeader from "./dashboard/_components/DashboardHeader";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
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
      </body>
    </html>
  );
}

//read this : https://clerk.com/docs/components/clerk-provider
