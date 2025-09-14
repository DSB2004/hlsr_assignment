"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";

import { getEvents } from "@/actions/event/getAll.action";
import { EventsPaginated } from "@/types/event";

interface EventsStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  events: EventsPaginated | undefined;
  error: Error | null;
}

const EventsStoreContext = createContext<EventsStoreInterface | null>(null);

export const EventsStore = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const filter = React.useMemo(
    () => ({
      path: pathname + "?" + searchParams.toString(),
      search: searchParams.get("search") || undefined,
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
    }),
    [pathname, searchParams]
  );

  const {
    isFetching,
    isError,
    isLoading,
    data: events,
    error,
  } = useQuery<EventsPaginated>({
    queryKey: ["events", filter],
    queryFn: async () => {
      const res = await getEvents(filter);
      if (!res.success || !res.data) throw new Error(res.message);
      return res;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <EventsStoreContext.Provider
      value={{ isLoading, isError, isFetching, events, error }}
    >
      {children}
    </EventsStoreContext.Provider>
  );
};

export const useEventsStore = () => {
  const ctx = useContext(EventsStoreContext);
  if (!ctx)
    throw new Error("useEventsStore must be used inside <EventsProvider>");
  return ctx;
};
