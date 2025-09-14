"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { getGuests } from "@/actions/guest/getAll.action";
import { GuestsPaginated } from "@/types/guest";

interface GuestsStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  guests: GuestsPaginated | undefined;
  error: Error | null;
}

const GuestsStoreContext = createContext<GuestsStoreInterface | null>(null);

export const GuestsStore = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { event } = useParams();
  const filter = {
    path: pathname + "?" + searchParams.toString(),
    search: searchParams.get("search") || undefined,
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  };
  const {
    isFetching,
    isError,
    isLoading,
    data: guests,
    error,
  } = useQuery<GuestsPaginated | undefined>({
    queryKey: ["guests", filter],
    queryFn: async () => {
      if (!event) return;
      const res = await getGuests({ ...filter, eventId: event.toString() });
      if (!res.success || !res.data) {
        throw new Error(res.message);
      }
      return res;
    },
    enabled: !!event,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <GuestsStoreContext.Provider
      value={{ isLoading, isError, isFetching, guests, error }}
    >
      {children}
    </GuestsStoreContext.Provider>
  );
};

export const useGuestsStore = () => {
  const ctx = useContext(GuestsStoreContext);
  if (!ctx) throw new Error("useGuestsStore must be used inside <GuestsStore>");
  return ctx;
};
