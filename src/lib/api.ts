import { clearAuthToken, getAuthToken, getRefreshToken, setTokens } from "./authToken";

export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:8600/api";
export const WS_BASE_URL = (import.meta as any).env?.VITE_WS_URL || "ws://localhost:8600/ws";

export const LOGIN_PATH = "/auth/login";

/** Typed API error parsed from the backend error envelope (§11). */
export class ApiError extends Error {
  status: number;
  code?: string;
  fieldErrors?: Record<string, string[]>;
  details?: any;
  constructor(status: number, message: string, code?: string, fieldErrors?: Record<string, string[]>, details?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
    this.details = details;
  }
}

/** Parses all three error shapes: envelope, auth-shaped object, legacy flat string. */
export function parseApiError(status: number, body: any): ApiError {
  const e = body?.error;
  if (typeof e === "string") return new ApiError(status, e);
  if (e && typeof e === "object") {
    return new ApiError(status, e.message || `Request failed (${status})`, e.code, e.field_errors, e.details);
  }
  if (typeof body?.message === "string") return new ApiError(status, body.message);
  return new ApiError(status, `Request failed (${status})`);
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

let refreshPromise: Promise<boolean> | null = null;

/** Single-flight refresh: concurrent 401s share one rotation. */
async function refreshTokens(baseURL: string): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refresh = getRefreshToken();
      if (!refresh) return false;
      try {
        const res = await fetch(`${baseURL}/auth/refresh-token/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refresh }),
        });
        if (!res.ok) return false;
        const data = await res.json();
        if (!data?.access_token || !data?.refresh_token) return false;
        setTokens(data.access_token, data.refresh_token);
        return true;
      } catch {
        return false;
      }
    })().finally(() => {
      setTimeout(() => (refreshPromise = null), 0);
    });
  }
  return refreshPromise;
}

function forceLogin() {
  clearAuthToken();
  if (typeof window !== "undefined" && !window.location.pathname.startsWith(LOGIN_PATH)) {
    window.location.href = LOGIN_PATH;
  }
}

class ApiClient {
  constructor(private baseURL: string) {}

  private async request<T>(method: Method, endpoint: string, data?: any, retried = false): Promise<T> {
    const isForm = typeof FormData !== "undefined" && data instanceof FormData;
    const token = getAuthToken();
    const headers: Record<string, string> = {};
    if (!isForm) headers["Content-Type"] = "application/json"; // let FormData set its boundary
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers,
      body: data === undefined ? undefined : isForm ? data : JSON.stringify(data),
    });

    if (res.status === 401 && token && !retried && !endpoint.startsWith("/auth/refresh-token")) {
      const ok = await refreshTokens(this.baseURL);
      if (ok) return this.request<T>(method, endpoint, data, true);
      forceLogin();
    }

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw parseApiError(res.status, body);
    }
    if (res.status === 204) return undefined as T;
    const text = await res.text();
    return (text ? JSON.parse(text) : undefined) as T;
  }

  get<T>(endpoint: string) { return this.request<T>("GET", endpoint); }
  post<T>(endpoint: string, data?: any) { return this.request<T>("POST", endpoint, data); }
  put<T>(endpoint: string, data?: any) { return this.request<T>("PUT", endpoint, data); }
  patch<T>(endpoint: string, data?: any) { return this.request<T>("PATCH", endpoint, data); }
  delete<T>(endpoint: string) { return this.request<T>("DELETE", endpoint); }
}

export const api = new ApiClient(API_BASE_URL);

/** Human message for any thrown error. */
export function errorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 429) return err.message || "Too many attempts. Please wait and try again.";
    return err.message;
  }
  if (err instanceof TypeError) return "Can't reach the server. Check your connection.";
  return (err as Error)?.message || "Something went wrong";
}
