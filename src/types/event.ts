import { Pagination } from "./common";

export interface Event {
  name: string;
  venue: string;
  timing: Date;
  description: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  organiserId: string;
}

export interface CreateEventDTO {
  name: string;
  venue: string;
  timing: Date;
  path: string;
  description: string;
}

export interface UpdateEventDTO {
  id: string;
  name: string;
  venue: string;
  timing: Date;
  path: string;
  description: string;
}
export interface DeleteEventDTO {
  path: string;
  id: string;
}

export interface GetAllEventDTO {
  search?: string;
  page?: number;
  limit?: number;
  path: string;
}
export interface GetEventDTO {
  id: string;
  path: string;
}

export interface EventsPaginated extends Pagination {
  data: Event[];
  success: boolean;
  message: string;
}
