"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createGuest } from "@/actions/guest/create.action";
import { updateGuest } from "@/actions/guest/update.action";
import { deleteGuest } from "@/actions/guest/delete.action";
import { createRandomGuest } from "@/actions/guest/random.action";
import {
  DeleteGuestDTO,
  UpdateGuestDTO,
  CreateGuestDTO,
  CreateRandomGuestDTO,
} from "@/types/guest";

import { toast } from "sonner";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateGuestDTO) => {
      return await createGuest(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create guest");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      toast.success(res.message ?? "Guest created successfully");
    },
  });

  return { ...mutation };
}
export function useRandomCreateGuest() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateRandomGuestDTO) => {
      return await createRandomGuest(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create random guest");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      toast.success(res.message ?? "Random Guest created successfully");
    },
  });

  return { ...mutation };
}

export function useUpdateGuest() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateGuestDTO) => {
      return await updateGuest(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to update guest");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      queryClient.invalidateQueries({ queryKey: ["guest", res.id] });
      toast.success(res.message ?? "Updated event successfully");
    },
  });

  return { ...mutation };
}

export function useDeleteGuest() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: DeleteGuestDTO) => {
      return await deleteGuest(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to delete guests");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      for (let id in res.guestIds) {
        queryClient.invalidateQueries({ queryKey: ["guest", id] });
      }
      toast.success(res.message ?? "Deleted guests successfully");
    },
  });

  return { ...mutation };
}
