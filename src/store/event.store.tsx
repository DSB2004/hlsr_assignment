"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getEvent } from "@/actions/event/get.action";

import { Event } from "@/types/event";

interface EventStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  event: Event | undefined;
  error: Error | null;
}

const EventStoreContext = createContext<EventStoreInterface | null>(null);

export const EventStore = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { event: eventId } = useParams();
  const {
    isFetching,
    isError,
    isLoading,
    data: event,
    error,
  } = useQuery<Event | undefined>({
    queryKey: ["event", eventId],
    queryFn: async () => {
      if (!eventId) return;
      const res = await getEvent({
        id: eventId.toString(),
        path: pathname + "?" + searchParams.toString(),
      });
  
      if (!res.success || !res.event) {
        toast.error(res.message);
        throw new Error(res.message);
      }
      return res.event;
    },
    enabled: !!eventId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <EventStoreContext.Provider
      value={{ isLoading, isError, isFetching, event, error }}
    >
      {children}
    </EventStoreContext.Provider>
  );
};

export const useEventStore = () => {
  const ctx = useContext(EventStoreContext);
  if (!ctx)
    throw new Error("useEventStore must be used inside <EventProvider>");
  return ctx;
};
