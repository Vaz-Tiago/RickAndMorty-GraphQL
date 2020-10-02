export interface ApiPagination {
  count: number;
  pages: number;
  current: number;
  next: number | null;
  prev: number | null;
  loading: boolean;
}
