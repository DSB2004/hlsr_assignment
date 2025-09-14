export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  prev: number | null;
  next: number | null;
}
