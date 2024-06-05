import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      {/* <Image src={"./logo.svg"} alt="logo" width={160} height={100} /> */}
      <Image src={"/logo3.jpg"} alt="logo" width={240} height={200} />
      <Button>Get Started</Button>
    </div>
  );
};

export default Header;
