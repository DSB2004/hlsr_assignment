import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function Header() {
  return (
    <TableHeader>
      <TableRow className="border-b-2  border-muted !p-4">
        <TableHead className="">Name</TableHead>
        <TableHead className="">Email</TableHead>
        <TableHead className=" ">Phone</TableHead>
        <TableHead className=" ">RSVP</TableHead>
        <TableHead className=" ">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}
