import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
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
        <div>Dashboard</div>
      )}
    </div>
  );
};

export default page;

// import React from "react";
// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
// import Dashboard from "@/app/_components/Dashboard";
// const page = () => {
//   return (
//     <div>
//       <SignedIn publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
//         <Dashboard />
//       </SignedIn>
//       <SignedOut>
//         <RedirectToSignIn />
//       </SignedOut>
//     </div>
//   );
// };

// export default page;
