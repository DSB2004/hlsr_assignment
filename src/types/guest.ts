import { GuestRSVP } from "@/generated/prisma";
import { Pagination } from "./common";
export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventId: string;
  rsvp: GuestRSVP;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateGuestDTO {
  name: string;
  email: string;
  phone: string;
  eventId: string;
  path: string;
}

export interface CreateRandomGuestDTO {
  path: string;
  eventId: string;
}

export interface UpdateGuestDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventId: string;
  path: string;
  rsvp: GuestRSVP;
}

export interface DeleteGuestDTO {
  guestIds: string[];
  path: string;
}

export interface GetGuestDTO {
  id: string;
  path: string;
}

export interface GetAllGuestDTO {
  search?: string;
  page?: number;
  limit?: number;
  path: string;
  eventId: string;
}

export interface GuestsPaginated extends Pagination {
  data: Guest[];
  success: boolean;
  message: string;
}

export interface RandomGuestResponseType {
  results: [
    {
      name: {
        title: string;
        first: string;
        last: string;
      };
      email: string;
      phone: string;
    }
  ];
}
