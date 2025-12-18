import { API_BASE_URL, REQUEST_TIMEOUT, ERROR_MESSAGES } from "./constants";
import { ICard, IApiResult } from "../types";

interface IRequestOptions {
  method?: "GET" | "PUT";
  body?: object;
  timeout?: number;
}

async function apiRequest<T>(url: string, options: IRequestOptions = {}): Promise<IApiResult<T>> {
  const { method = "GET", body, timeout = REQUEST_TIMEOUT } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method,
      signal: controller.signal,
      ...(body && {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return { success: false, error: `HTTP error: ${response.status}` };
    }

    const data: T = await response.json();
    return { success: true, data };
  } catch (e) {
    clearTimeout(timeoutId);

    if (e instanceof Error) {
      const message = e.name === "AbortError" ? ERROR_MESSAGES.REQUEST_TIMEOUT : e.message;
      return { success: false, error: message };
    }

    return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
}

export function getCards(): Promise<IApiResult<ICard[]>> {
  return apiRequest<ICard[]>(API_BASE_URL);
}

export function getCardById(id: string): Promise<IApiResult<ICard>> {
  return apiRequest<ICard>(`${API_BASE_URL}/${id}`);
}

export function toggleFavorite(id: string, isFavorite: boolean): Promise<IApiResult<void>> {
  return apiRequest(`${API_BASE_URL}/${id}`, { method: "PUT", body: { isFavorite } });
}

export function updateComments(id: string, comments: string[]): Promise<IApiResult<void>> {
  return apiRequest(`${API_BASE_URL}/${id}`, { method: "PUT", body: { comments } });
}
