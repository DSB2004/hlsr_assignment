import React from "react";
import Search from "@/components/common/search";

import EventTable from "@/components/events/table";
export default function page() {
  return (
    <>
      <div className="flex gap-2 m-4">
        <Search></Search>
      </div>
      <EventTable></EventTable>
    </>
  );
}
