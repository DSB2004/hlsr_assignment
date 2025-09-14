import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Plus } from "lucide-react";
import UpdateForm from "./form";
export default function Update() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center  gap-2 !h-12 !bg-white !px-2 rounded-lg border">
        <span className="text-sm">Update Event</span>
        <Plus></Plus>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
          <DialogDescription>
            Update event. Hit create to confirm changes
          </DialogDescription>
        </DialogHeader>
        <UpdateForm open={open} setOpen={setOpen}></UpdateForm>
      </DialogContent>
    </Dialog>
  );
}
