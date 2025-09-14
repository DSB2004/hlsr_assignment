"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export default function PendingPage() {
  const searchParams = useSearchParams();
  const session = searchParams.get("session");
  const email = searchParams.get("email") as string;

  let message = "Please check your email.";
  if (session === "verification") {
    message =
      "We’ve sent you an email to verify your account. Please check your inbox and follow the instructions.";
  } else if (session === "password") {
    message =
      "We’ve sent you an email to reset your password. Please check your inbox and follow the link.";
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col gap-4 border p-6 rounded-lg w-72 md:w-96 ">
        <h1 className="text-2xl font-bold text-center">Email Sent</h1>
        <p className="text-sm text-center">{message}</p>

        <p className="text-sm text-center">
          This session is only active for next 5 minutes
        </p>

      </div>
    </div>
  );
}
