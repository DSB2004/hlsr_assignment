import React from "react";
import Create from "@/components/events/action/create";
export default function Header() {
  return (
    <header className="flex justify-between items-center  p-4 ">
      <h2 className="text-xl font-semibold">Moment Planner</h2>
      <Create></Create>
    </header>
  );
}
