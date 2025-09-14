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

import {
  useSearchParams,
  useParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { Guest } from "@/types/guest";
import { useDeleteEvent } from "@/hooks/use-event.hook";
export default function Delete() {
  const { mutateAsync, isPending } = useDeleteEvent();
  const searchParams = useSearchParams();
  const { event } = useParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    if (!event) return;
    const path = pathname + searchParams.toString();
    await mutateAsync({ id: event.toString(), path });
    router.push("/");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 !h-12 !bg-white !px-2 rounded-lg border"
        >
          <span className="text-sm">Delete Event</span>
          <Trash2 size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the event
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
