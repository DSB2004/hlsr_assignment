import { GuestRSVP } from "@/generated/prisma";

export interface GuestRSVPToken {
  guest: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  event: {
    id: string;
  };
}

export interface SendInviteDTO {
  eventId: string;
  guestIds: string[];
  path: string;
  redirectURL: string;
}

export interface SendAllInviteDTO {
  eventId: string;
  path: string;
  redirectURL: string;
}

export interface GetGuestEventDTO {
  token: string;
}

export interface InviteReplyDTO {
  token: string;
  reply: GuestRSVP;
}
