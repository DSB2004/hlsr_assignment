"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAccount } from "@/actions/user/create.action";
import { updateAccount } from "@/actions/user/update.action";

import { CreateAccountDTO, UpdateAccountDTO } from "@/types/user";

import { toast } from "sonner";

export function useCreateAccount() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateAccountDTO) => {
      return await createAccount(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create account");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(res.message ?? "Account created successfully");
    },
  });

  return { ...mutation };
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateAccountDTO) => {
      return await updateAccount(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to update account");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(res.message ?? "Updated account successfully");
    },
  });

  return { ...mutation };
}
