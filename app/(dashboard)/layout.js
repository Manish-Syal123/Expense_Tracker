import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* <ClerkProvider> */}
        <SignedIn>{children}</SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        {/* </ClerkProvider> */}
      </body>
    </html>
  );
}

//read this : https://clerk.com/docs/components/clerk-provider
