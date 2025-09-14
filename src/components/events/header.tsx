import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function Header() {
  return (
    <TableHeader>
      <TableRow className="border-b-2  border-muted">
        <TableHead className="">Name</TableHead>
        <TableHead className="">Time</TableHead>
        <TableHead className="">Date</TableHead>
        <TableHead className=" ">Venue</TableHead>
        <TableHead className=" ">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
