/**
 * Auth token storage helper.
 *
 * Tokens are kept in module memory first (most XSS-resistant option available
 * on the client) and mirrored to sessionStorage so the session survives a
 * page reload within the same tab. sessionStorage is preferred over
 * localStorage because it is scoped to the tab and cleared on close, which
 * shrinks the window for token theft compared to persistent localStorage.
 *
 * For best-in-class security, the backend should issue tokens as
 * `httpOnly; Secure; SameSite=Strict` cookies so JavaScript cannot read them
 * at all. This helper is a defense-in-depth improvement until that is in place.
 */

const STORAGE_KEY = "authToken";

let inMemoryToken: string | null = null;

function readFromSession(): string | null {
  try {
    return typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem(STORAGE_KEY)
      : null;
  } catch {
    return null;
  }
}

function migrateLegacyLocalStorage(): string | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const legacy = localStorage.getItem(STORAGE_KEY);
    if (legacy) {
      // Move the token off localStorage to reduce XSS exfiltration surface.
      localStorage.removeItem(STORAGE_KEY);
      try {
        sessionStorage.setItem(STORAGE_KEY, legacy);
      } catch {
        /* ignore */
      }
      return legacy;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function getAuthToken(): string | null {
  if (inMemoryToken) return inMemoryToken;
  const fromSession = readFromSession();
  if (fromSession) {
    inMemoryToken = fromSession;
    return inMemoryToken;
  }
  const migrated = migrateLegacyLocalStorage();
  if (migrated) {
    inMemoryToken = migrated;
  }
  return inMemoryToken;
}

export function setAuthToken(token: string): void {
  inMemoryToken = token;
  try {
    sessionStorage.setItem(STORAGE_KEY, token);
  } catch {
    /* ignore */
  }
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function clearAuthToken(): void {
  inMemoryToken = null;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}