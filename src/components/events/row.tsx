import React from "react";
import { TableRow, TableCell } from "../ui/table";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Row({ data }: { data: Event }) {
  const router = useRouter();

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium", // e.g. "Sep 14, 2025"
    }).format(date);

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      timeStyle: "short", // e.g. "10:30 AM"
    }).format(date);

  return (
    <TableRow className="border-b border-[#949494]">
      <TableCell className="">{data.name}</TableCell>
      <TableCell>{formatTime(data.timing)}</TableCell>
      <TableCell>{formatDate(data.timing)}</TableCell>
      <TableCell>{data.venue}</TableCell>
      <TableCell>
        <Button onClick={() => router.push(`/${data.id}`)} size={"sm"}>
          Know More
        </Button>
      </TableCell>
    </TableRow>
  );
}
