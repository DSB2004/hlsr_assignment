import React from "react";
import { TableRow, TableCell } from "../ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

export default function Loading() {
  return (
    <TableRow className="border-b border-[#949494]">
      <TableCell className="w-fit ">
        <Skeleton className="h-4 w-6 mx-auto" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-48" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-8 w-36" />
      </TableCell>
    </TableRow>
  );
}
