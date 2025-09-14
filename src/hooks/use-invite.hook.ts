"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendAllInvite } from "@/actions/invite/sendAll.action";
import { sendInvite } from "@/actions/invite/send.action";
import { replyInvite } from "@/actions/invite/reply.action";

import {
  SendAllInviteDTO,
  SendInviteDTO,
  InviteReplyDTO,
} from "@/types/invite";

export function useSendInvite() {
  const mutation = useMutation({
    mutationFn: async (data: SendInviteDTO) => sendInvite(data),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to send invite");
        return;
      }
      toast.success(res.message ?? "Invite sent successfully");
    },
  });

  return { ...mutation };
}

export function useSendAllInvites() {
  const mutation = useMutation({
    mutationFn: async (data: SendAllInviteDTO) => sendAllInvite(data),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to send invites");
        return;
      }
      toast.success(res.message ?? "All invites sent successfully");
    },
  });

  return { ...mutation };
}

export function useReplyInvite() {
  const mutation = useMutation({
    mutationFn: async (data: InviteReplyDTO) => replyInvite(data),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to reply to invite");
        return;
      }
      toast.success(res.message ?? "Invite reply recorded");
    },
  });

  return { ...mutation };
}
