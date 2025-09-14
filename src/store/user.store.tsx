"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";

import { getAccount } from "@/actions/user/get.action";
import { User } from "@/types/user";

interface UserStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  user: User | undefined;
  error: Error | null;
}

const UserStoreContext = createContext<UserStoreInterface | null>(null);

export const UserStore = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const {
    isFetching,
    isError,
    isLoading,
    data: user,
    error,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await getAccount({
        path: pathname + "?" + searchParams.toString(),
      });
      if (!res.success || !res.user) {
        throw new Error(res.message);
      }
      return res.user;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <UserStoreContext.Provider
      value={{ isLoading, isError, isFetching, user, error }}
    >
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = () => {
  const ctx = useContext(UserStoreContext);
  if (!ctx) throw new Error("useUserStore must be used inside <UserProvider>");
  return ctx;
};
