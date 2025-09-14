import React from "react";
import CreateForm from "@/components/account/form";

export default function page() {
  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className=" border rounded p-6 md:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Continue by filling in your details below to create your account. It's
          quick and secure.
        </p>

        <div className="w-full">
          <CreateForm />
        </div>

        <p className="text-center text-gray-400 text-sm mt-4">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>
          and
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
