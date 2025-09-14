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
import { useDeleteGuest } from "@/hooks/use-guest.hook";
import { useSearchParams, useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { Guest } from "@/types/guest";
export default function Delete({ data }: { data: Guest }) {
  const { mutateAsync, isPending } = useDeleteGuest();
  const searchParams = useSearchParams();
  const { event } = useParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    if (!event) return;
    const path = pathname + searchParams.toString();
    await mutateAsync({ guestIds: [data.id], path });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">
        <Trash2 size={16} className="text-red-500"></Trash2>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the guest
            and remove the data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="h-10"></div>

        <div className="flex gap-2 w-full items-center justify-end">
          <Button
            onClick={handleClick}
            disabled={isPending}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isPending ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              "Delete"
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
