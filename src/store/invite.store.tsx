"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Event } from "@/types/event";
import { getGuestEvent } from "@/actions/invite/event.action";

interface InviteStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  event: Event | undefined;
  error: Error | null;
}

const InviteStoreContext = createContext<InviteStoreInterface | null>(null);

export const InviteStore = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite_token");
  const {
    isFetching,
    isError,
    isLoading,
    data: event,
    error,
  } = useQuery<Event | undefined>({
    queryKey: ["invite", inviteToken],
    queryFn: async () => {
      if (!inviteToken) return;
      const res = await getGuestEvent({
        token: inviteToken.toString(),
      });

      if (!res.success || !res.event) {
        toast.error(res.message);
        throw new Error(res.message);
      }
      return res.event;
    },
    enabled: !!inviteToken,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <InviteStoreContext.Provider
      value={{ isLoading, isError, isFetching, event, error }}
    >
      {children}
    </InviteStoreContext.Provider>
  );
};

export const useInviteStore = () => {
  const ctx = useContext(InviteStoreContext);
  if (!ctx)
    throw new Error("useInviteStore must be used inside <InviteProvider>");
  return ctx;
};
