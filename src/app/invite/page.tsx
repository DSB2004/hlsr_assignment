import React from "react";
import InviteForm from "@/components/invite/form";

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border p-6 rounded-xl w-80 md:w-[450px] flex flex-col gap-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center">You are Invited</h2>

        <InviteForm></InviteForm>

        <div className="text-center text-sm text-gray-500">
          <p>We look forward to seeing you at the event!</p>
        </div>
      </div>
    </div>
  );
}
