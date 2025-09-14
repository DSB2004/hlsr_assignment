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
import { useSendInvite } from "@/hooks/use-invite.hook";
import { useSearchParams, useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { Guest } from "@/types/guest";
export default function SendInvite({ data }: { data: Guest }) {
  const { mutateAsync, isPending } = useSendInvite();
  const searchParams = useSearchParams();
  const { event } = useParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    if (!event) return;
    const path = pathname + searchParams.toString();
    await mutateAsync({
      eventId: event.toString(),
      guestIds: [data.id],
      path,
      redirectURL: window.location.origin + "/invite",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DialogTrigger className="">
          <Send className="" size={16}></Send>
        </DialogTrigger>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will send invite to the guest and
            that will be active for next 24 hours
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
              "Send Invite"
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
