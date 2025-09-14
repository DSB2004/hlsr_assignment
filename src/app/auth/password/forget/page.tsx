import React from "react";
import Link from "next/link";
import ForgetForm from "@/components/auth/forget/form";
export default function page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border p-4 rounded-xl w-72 md:w-[400px] flex flex-col items-center gap-5 ">
        <h2 className="text-2xl font-bold">Forget Password</h2>
        <p className="text-xs text-center">
          Please enter your registered email! For verification purpose you will
          sent an email with further instruction
        </p>
        <ForgetForm></ForgetForm>

        <div className="flex gap-1 items-center justify-center flex-col">
          <p className="text-sm">
            Continue Login!
            <Link href="/auth/login" className="underline text-blue-400">
              {" "}
              Create Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
