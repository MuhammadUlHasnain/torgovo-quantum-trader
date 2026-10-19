/**
 * Auth token storage helper (access + refresh).
 * In-memory first, mirrored to tab-scoped sessionStorage so a reload keeps
 * the session. Legacy localStorage tokens are migrated off on first read.
 */

const ACCESS_KEY = "authToken";
const REFRESH_KEY = "refreshToken";

const mem: Record<string, string | null> = { [ACCESS_KEY]: null, [REFRESH_KEY]: null };

function read(key: string): string | null {
  if (mem[key]) return mem[key];
  try {
    const s = sessionStorage.getItem(key);
    if (s) return (mem[key] = s);
    const legacy = localStorage.getItem(key);
    if (legacy) {
      localStorage.removeItem(key);
      sessionStorage.setItem(key, legacy);
      return (mem[key] = legacy);
    }
  } catch {
    /* ignore */
  }
  return null;
}

function write(key: string, value: string | null) {
  mem[key] = value;
  try {
    if (value) sessionStorage.setItem(key, value);
    else sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export const getAuthToken = () => read(ACCESS_KEY);
export const setAuthToken = (t: string) => write(ACCESS_KEY, t);
export const getRefreshToken = () => read(REFRESH_KEY);
export const setRefreshToken = (t: string) => write(REFRESH_KEY, t);

export function setTokens(access: string, refresh: string) {
  setAuthToken(access);
  setRefreshToken(refresh);
}

export function clearAuthToken(): void {
  write(ACCESS_KEY, null);
  write(REFRESH_KEY, null);
}
