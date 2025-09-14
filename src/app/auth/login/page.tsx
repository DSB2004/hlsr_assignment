import React from "react";
import Link from "next/link";
import LoginForm from "@/components/auth/login/form";
export default function page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border p-4 rounded-xl w-72 md:w-[400px] flex flex-col items-center gap-5 ">
        <h2 className="text-2xl font-bold">Login</h2>

        <LoginForm></LoginForm>

        <div className="flex gap-1 items-center justify-center flex-col">
          <p className="text-sm">
            Don't have an account!
            <Link href="/auth/signup" className="underline text-blue-400">
              {" "}
              Create Now
            </Link>
          </p>

          <p className="text-sm">
            Forget Password!
            <Link
              href="/auth/password/forget"
              className="underline text-blue-400"
            >
              {" "}
              Reset here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
