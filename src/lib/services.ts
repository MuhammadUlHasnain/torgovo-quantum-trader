// Endpoint wrappers that follow the backend brief. Paths are relative to API_BASE_URL (/api).
import { api } from "./api";
import { clearAuthToken, getRefreshToken, setTokens } from "./authToken";
import type {
  AdminDashboardStats, AdminSendEmailRequest, AdminUser, InvestorDeposit, LoginRequest, LoginResponse,
  PaginatedResponse, RegisterResponse, RegistrationRequest, User,
} from "@/types/api";

/** Lists may come paginated or as a plain array — normalize. */
export function asList<T>(data: PaginatedResponse<T> | T[] | { results?: T[] } | undefined | null): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return (data as any).results ?? [];
}

export const authApi = {
  async login(body: LoginRequest) {
    const r = await api.post<LoginResponse>("/auth/login/", body);
    setTokens(r.tokens.access_token, r.tokens.refresh_token);
    return r;
  },
  async register(body: RegistrationRequest) {
    const r = await api.post<RegisterResponse>("/auth/register/", body);
    if (r.tokens) setTokens(r.tokens.access_token, r.tokens.refresh_token);
    return r;
  },
  async logout() {
    const refresh_token = getRefreshToken();
    try {
      await api.post("/auth/logout/", refresh_token ? { refresh_token } : {});
    } catch {
      /* session is cleared locally regardless */
    }
    clearAuthToken();
  },
  me: () => api.get<User>("/auth/user/"),
  passwordReset: (email: string) => api.post<{ message: string }>("/auth/password-reset/", { email }),
  passwordResetConfirm: (token: string, new_password: string, new_password_confirm: string) =>
    api.post<{ message: string }>("/auth/password-reset/confirm/", { token, new_password, new_password_confirm }),
};

export const adminApi = {
  stats: () => api.get<AdminDashboardStats>("/users/admin/dashboard/stats/"),
  users: (page = 1) => api.get<PaginatedResponse<AdminUser> | AdminUser[]>(`/users/admin/?page=${page}`),
  restrictUser: (id: string, body: Record<string, any> = {}) => api.post(`/users/admin/users/${id}/restrict/`, body),
  botsOverview: () => api.get<any>("/users/admin/bots/overview/"),
  tradeLogs: (page = 1) => api.get<any>(`/users/admin/trade-logs/?page=${page}`),
  sendEmail: (body: AdminSendEmailRequest) => api.post("/users/admin/emails/send/", body),
  deposits: () => api.get<PaginatedResponse<InvestorDeposit> | InvestorDeposit[]>("/payments/quantum-deposits/"),
  approveDeposit: (id: string) => api.post(`/payments/admin/deposits/${id}/approve/`),
  rejectDeposit: (id: string, reason?: string) => api.post(`/payments/admin/deposits/${id}/reject/`, reason ? { reason } : {}),
};
