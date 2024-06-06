"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      {/* <Image src={"./logo.svg"} alt="logo" width={160} height={100} /> */}
      <Image src={"/logo3.jpg"} alt="logo" width={240} height={200} />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={"/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
