export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

export type ApiError = {
  statusCode: number;
  message: string;
};