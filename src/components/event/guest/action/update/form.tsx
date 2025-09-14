"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateGuest } from "@/hooks/use-guest.hook";
import { useSearchParams, usePathname, useParams } from "next/navigation";
import { GuestRSVP } from "@/generated/prisma";
import { Loader } from "lucide-react";
import { Guest } from "@/generated/prisma";

const formSchema = z.object({
  name: z.string().min(1, { message: "Missing title" }),
  email: z.email({ message: "Enter valid email" }),
  phone: z.string().min(10, { message: "Enter valid phone" }),
  rsvp: z.enum(GuestRSVP, { message: "Please enter a valid RSVP Status" }),
});

export default function UpdateForm({ data }: { data: Guest }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { event } = useParams();
  const { mutateAsync } = useUpdateGuest();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      rsvp: data.rsvp,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const path = pathname + searchParams.toString();
    if (!event) return;
    await mutateAsync({
      ...values,
      id: data.id,
      path,
      eventId: event?.toString(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guest Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter guest name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guest Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter guest email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guest Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter guest phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rsvp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RSVP Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Update RSVP Status" />
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
            <>Update Guest</>
          )}
        </Button>
      </form>
    </Form>
  );
}
