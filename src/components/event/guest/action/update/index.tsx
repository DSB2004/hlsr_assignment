import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Guest } from "@/generated/prisma";
import { Pencil } from "lucide-react";
import UpdateForm from "./form";
export default function Update({ data }: { data: Guest }) {
  return (
    <Dialog>
      <DialogTrigger className="">
        <Pencil size={16} className="stroke-yellow-500"></Pencil>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Guest</DialogTitle>
          <DialogDescription>
            Add new guest for this event. Hit create to confirm changes
          </DialogDescription>
        </DialogHeader>
        <UpdateForm data={data}></UpdateForm>
      </DialogContent>
    </Dialog>
  );
}
