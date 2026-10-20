# AGENTS.md
- The uploaded backend brief (Torgovo Frontend Integration Brief) is the source of truth for API contracts; `src/types/api.ts` mirrors it.
- All HTTP goes through `src/lib/api.ts` (fetch ApiClient with single-flight refresh); no Axios. Endpoint wrappers live in `src/lib/services.ts`.
- Tokens only via `src/lib/authToken.ts` (memory + sessionStorage) — never localStorage.
- Server state uses React Query; auth identity uses `AuthContext` — no Zustand.
- Admin UI is gated by `user.is_staff` (UX only; backend enforces 403).
