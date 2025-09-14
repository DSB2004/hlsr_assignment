import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { GuestRSVP } from "@/generated/prisma";
import Update from "./action/update";
import Delete from "./action/delete";
import SendInvite from "./action/invite";
import { Guest } from "@/generated/prisma";
export default function Row({ data }: { data: Guest }) {
  const RSVPStyle = (rsvp: string) => {
    switch (rsvp.toUpperCase()) {
      case GuestRSVP.PENDING:
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case GuestRSVP.MAYBE:
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case GuestRSVP.ACCEPTED:
        return "bg-green-100 text-green-800 border border-green-300";
      case GuestRSVP.DECLINED:
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  return (
    <TableRow className="border-b border-muted !p-4">
      <TableCell className="">{data.name}</TableCell>
      <TableCell>{data.email}</TableCell>
      <TableCell>{data.phone}</TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${RSVPStyle(
            data.rsvp
          )}`}
        >
          {data.rsvp.toUpperCase()}
        </span>
      </TableCell>

      <TableCell className="flex gap-2">
        <Update data={data}></Update>
        <SendInvite data={data}></SendInvite>
        <Delete data={data}></Delete>
      </TableCell>
    </TableRow>
  );
}
