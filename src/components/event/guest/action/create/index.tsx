import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateForm from "./form";
export default function Create() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="flex items-center !flex-1 gap-2 !h-12 !bg-white !px-2 rounded-lg border"
        asChild
      >
        <Button
          variant="outline"
          className="flex items-center !flex-1 gap-2 !h-12 !bg-white !px-2 rounded-lg border"
        >
          <span className="text-sm">Add Guest</span>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Guest</DialogTitle>
          <DialogDescription>
            Add new guest for this event. Hit create to confirm changes
          </DialogDescription>
        </DialogHeader>
        <CreateForm open={open} setOpen={setOpen}></CreateForm>
      </DialogContent>
    </Dialog>
  );
}
