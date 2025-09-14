import React from "react";
import Link from "next/link";
import SignupForm from "@/components/auth/signup/form";
export default function page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border p-4 rounded-xl w-72 md:w-[400px] flex flex-col items-center gap-5 ">
        <h2 className="text-2xl font-bold">Signup</h2>

        <SignupForm></SignupForm>

        <div className="flex gap-1 items-center justify-center flex-col">
          <p className="text-sm">
            Already have an account!
            <Link href="/auth/login" className="underline text-blue-400">
              {" "}
              Continue here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
