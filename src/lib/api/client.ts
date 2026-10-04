//client API handler 

import type { ApiError } from "@/types/api";


export class ApiRequestError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ApiRequestError";
    this.statusCode = statusCode;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.API_URL
      : process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error(
      "API base URL is not configured. Set API_URL or NEXT_PUBLIC_API_URL in your environment.",
    );
  }

  const isFormDataBody =
    typeof options.body !== "undefined" && options.body instanceof FormData;

  const headers = new Headers(options.headers ?? {});

  if (!isFormDataBody) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });


  if (!response.ok) {
    let message = response.statusText || "Request failed";

    try {
      const errorBody = (await response.json()) as Partial<ApiError>;

      if (typeof errorBody?.message === "string") {
        message = errorBody.message;
      }
    } catch {
      // Ignore JSON parsing failures and fall back to statusText.
    }
    //for the 404 shit 
    throw new ApiRequestError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
