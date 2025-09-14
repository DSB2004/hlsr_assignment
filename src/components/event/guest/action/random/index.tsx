"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useRandomCreateGuest } from "@/hooks/use-guest.hook";
import { useSearchParams, useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { Plus } from "lucide-react";
export default function Random() {
  const { mutateAsync, isPending } = useRandomCreateGuest();
  const searchParams = useSearchParams();
  const { event } = useParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    if (!event) return;
    const path = pathname + searchParams.toString();
    await mutateAsync({ eventId: event.toString(), path });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center !flex-1 gap-2 !h-12 !bg-white !px-2 rounded-lg border"
        >
          <span className="text-sm">Add Random Guest</span>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will add a random guest to your event's guest list.
          </DialogDescription>
        </DialogHeader>
        <div className="h-10"></div>
        <div className="flex gap-2 w-full items-center justify-end">
          <Button
            onClick={handleClick}
            disabled={isPending}
            className="bg-yellow-500 text-white"
          >
            {isPending ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              "Add Random Guest"
            )}
          </Button>

          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
