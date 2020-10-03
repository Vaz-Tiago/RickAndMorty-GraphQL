export interface ApiPagination {
  count: number;
  pages: number;
  current: number;
  next: number;
  prev: number;
  loaded: boolean;
}
