"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Loader } from "lucide-react";
import { useInviteStore } from "@/store/invite.store";

import { GuestRSVP } from "@/generated/prisma";
import { useReplyInvite } from "@/hooks/use-invite.hook";
const formSchema = z.object({
  rsvp: z.enum(GuestRSVP),
});

export default function InviteForm() {
  const searchParams = useSearchParams();
  const { event, isFetching, isLoading } = useInviteStore();
  const { mutateAsync } = useReplyInvite();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rsvp: GuestRSVP.MAYBE,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const inviteToken = searchParams.get("invite_token");
    if (!event || !inviteToken) return;
    await mutateAsync({ token: inviteToken, reply: values.rsvp });
    router.replace("/invite/done");
  }

  if (!event || isFetching || isLoading) {
    return (
      <div className="w-full h-20 flex items-center justify-center">
        <Loader className="animate-spin"></Loader>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 p-4 border rounded-md ">
          <div>
            <p className="text-sm text-muted-foreground">Event Name</p>
            <p className="font-medium">{event.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Venue</p>
            <p className="font-medium">{event.venue}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date & Time</p>
            <p className="font-medium">
              {new Date(event.timing).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-sm">{event.description}</p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="rsvp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your RSVP</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your response" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={GuestRSVP.ACCEPTED}>Accepted</SelectItem>
                    <SelectItem value={GuestRSVP.DECLINED}>Declined</SelectItem>
                    <SelectItem value={GuestRSVP.MAYBE}>Maybe</SelectItem>
                    <SelectItem value={GuestRSVP.PENDING}>Pending</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isLoading || form.formState.isSubmitting}
        >
          {form.formState.isLoading || form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            <>Send Reply</>
          )}
        </Button>
      </form>
    </Form>
  );
}
