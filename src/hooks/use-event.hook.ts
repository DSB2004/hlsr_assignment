"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEvent } from "@/actions/event/create.action";
import { updateEvent } from "@/actions/event/update.action";
import { deleteEvent } from "@/actions/event/delete.action";

import { CreateEventDTO, UpdateEventDTO, DeleteEventDTO } from "@/types/event";

import { toast } from "sonner";

export function useCreateEvent() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateEventDTO) => {
      return await createEvent(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create event");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success(res.message ?? "Event created successfully");
    },
  });

  return { ...mutation };
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateEventDTO) => {
      return await updateEvent(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to update event");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["events"] });

      queryClient.invalidateQueries({ queryKey: ["event", res.id] });
      toast.success(res.message ?? "Updated event successfully");
    },
  });

  return { ...mutation };
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: DeleteEventDTO) => {
      return await deleteEvent(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to delete event");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success(res.message ?? "Updated event successfully");
    },
  });

  return { ...mutation };
}
