import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manage Your Expense
            <strong className="font-extrabold text-primary sm:block">
              Control Your Money
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed font-medium ">
            Start Creating your budget and save ton's of money. We are here to
            manage your money effeciently.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-lg font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <Image
        src={"/dashboard.png"}
        alt="dashboard"
        width={1150}
        height={700}
        className="-mt-5 rounded-2xl border-2 shadow-2xl"
      />
    </section>
  );
};

export default Hero;
