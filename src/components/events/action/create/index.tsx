"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import CreateForm from "./form";
export default function Create() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center  gap-2 !h-11 bg-black text-white px-4 rounded-lg border">
        <span className="text-sm">Create Event</span>
        <Plus></Plus>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Create new event. Hit create to confirm changes
          </DialogDescription>
        </DialogHeader>
        <CreateForm open={open} setOpen={setOpen}></CreateForm>
      </DialogContent>
    </Dialog>
  );
}
