// Endpoint wrappers per the Torgovo Frontend Integration Brief.
// Paths are relative to API_BASE_URL (/api). All HTTP goes through src/lib/api.ts.
import { api } from "./api";
import { clearAuthToken, getRefreshToken, setTokens } from "./authToken";
import type {
  AdminDashboardStats, AdminSendEmailRequest, AdminUser, BillingCycle, BotSubscription,
  BotUsage, CreateCredentialsRequest, CreatePaymentCodeRequest, DeactivateResponse, Exchange,
  ExchangeCredentials, ExchangeListResponse, ExchangeSymbolsResponse, InvestorDeposit,
  LoginRequest, LoginResponse, MySubscriptionResponse, Order, PaginatedResponse, PaymentCode,
  PaymentCoin, PlanListResponse, PayoutRequestRow, RegisterResponse, ReferralStats,
  RegistrationRequest, SubscriptionPlan, TelegramSubscribeRequest, TwoFactorSetupResponse, User,
  WithdrawalRequest,
} from "@/types/api";

/** Lists may come paginated or as a plain array — normalize. */
export function asList<T>(data: PaginatedResponse<T> | T[] | { results?: T[] } | { plans?: T[] } | undefined | null): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  const d = data as any;
  return d.results ?? d.plans ?? [];
}

function qs(params: Record<string, string | number | undefined | null>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

// ---------- Auth (§2) ----------
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
  updateMe: (body: Partial<User>) => api.patch<User>("/auth/user/", body),
  verifyEmail: () => api.post<{ message: string }>("/auth/verify-email/", {}),
  verifyPhone: (phone_number: string) => api.post<{ message: string }>("/auth/verify-phone/", { phone_number }),
  verifyPhoneConfirm: (code: string, phone_number: string) =>
    api.post<{ message: string }>("/auth/verify-phone/confirm/", { code, phone_number }),
  twoFactorSetup: (password: string) => api.post<TwoFactorSetupResponse>("/auth/2fa/setup/", { password }),
  twoFactorConfirm: (code: string) => api.post<{ message: string }>("/auth/2fa/confirm/", { code }),
  twoFactorDisable: (password: string, code: string) =>
    api.post<{ message: string }>("/auth/2fa/disable/", { password, code }),
  changePassword: (old_password: string, new_password: string, new_password_confirm: string) =>
    api.post<{ message: string }>("/auth/change-password/", { old_password, new_password, new_password_confirm }),
  passwordReset: (email: string) => api.post<{ message: string }>("/auth/password-reset/", { email }),
  passwordResetConfirm: (token: string, new_password: string, new_password_confirm: string) =>
    api.post<{ message: string }>("/auth/password-reset/confirm/", { token, new_password, new_password_confirm }),
};

// ---------- Users (§3) ----------
export const usersApi = {
  deactivate: (password: string) => api.post<DeactivateResponse>("/users/deactivate/", { password }),
  exportData: () => api.get<Record<string, any>>("/users/export-data/"),
};

// ---------- Admin (§3) ----------
export const adminApi = {
  stats: () => api.get<AdminDashboardStats>("/users/admin/dashboard/stats/"),
  users: (page = 1) => api.get<PaginatedResponse<AdminUser> | AdminUser[]>(`/users/admin/${qs({ page })}`),
  restrictUser: (id: string, body: Record<string, any> = {}) => api.post(`/users/admin/users/${id}/restrict/`, body),
  botsOverview: () => api.get<any>("/users/admin/bots/overview/"),
  tradeLogs: (page = 1) => api.get<any>(`/users/admin/trade-logs/${qs({ page })}`),
  sendEmail: (body: AdminSendEmailRequest) => api.post("/users/admin/emails/send/", body),
  deposits: () => api.get<PaginatedResponse<InvestorDeposit> | InvestorDeposit[]>("/payments/quantum-deposits/"),
  approveDeposit: (id: string) => api.post(`/payments/admin/deposits/${id}/approve/`),
  rejectDeposit: (id: string, reason?: string) => api.post(`/payments/admin/deposits/${id}/reject/`, reason ? { reason } : {}),
  processWithdrawal: (body: Record<string, any>) => api.post("/users/admin/withdrawals/process/", body),
};

// ---------- Bots (§5) ----------
export const botsApi = {
  signalBots: (page = 1) => api.get<PaginatedResponse<any> | any[]>(`/bots/signal-bots/${qs({ page })}`),
  gridBots: (page = 1) => api.get<PaginatedResponse<any> | any[]>(`/bots/grid-bots/${qs({ page })}`),
  martingaleBots: (page = 1) => api.get<PaginatedResponse<any> | any[]>(`/bots/martingale-bots/${qs({ page })}`),
  signalBot: (id: string) => api.get<any>(`/bots/signal-bots/${id}/`),
  gridBot: (id: string) => api.get<any>(`/bots/grid-bots/${id}/`),
  martingaleBot: (id: string) => api.get<any>(`/bots/martingale-bots/${id}/`),
  createSignalBot: (body: Record<string, any>) => api.post<any>("/bots/signal-bots/", body),
  createGridBot: (body: Record<string, any>) => api.post<any>("/bots/grid-bots/", body),
  createMartingaleBot: (body: Record<string, any>) => api.post<any>("/bots/martingale-bots/", body),
  deleteSignalBot: (id: string) => api.delete(`/bots/signal-bots/${id}/`),
  deleteGridBot: (id: string) => api.delete(`/bots/grid-bots/${id}/`),
  deleteMartingaleBot: (id: string) => api.delete(`/bots/martingale-bots/${id}/`),
  gridStart: (botId: string) => api.post(`/bots/grid/${botId}/start/`),
  gridStop: (botId: string) => api.post(`/bots/grid/${botId}/stop/`),
  martingaleStart: (botId: string) => api.post(`/bots/martingale/${botId}/start/`),
  martingaleStop: (botId: string) => api.post(`/bots/martingale/${botId}/stop/`),
  /** Bot-order history — filter params passed defensively (model FK names). */
  orders: (params: Record<string, string | number | undefined> = {}) => api.get<PaginatedResponse<Order> | Order[]>(`/bots/orders/${qs(params)}`),
  pairConfigs: (page = 1) => api.get<PaginatedResponse<any> | any[]>(`/bots/pair-configs/${qs({ page })}`),
};

// ---------- Trading app (§6.2 — main unified API) ----------
export const tradingApi = {
  exchangesList: () => api.get<ExchangeListResponse>("/trading/exchanges/list/"),
  exchangeSymbols: (name: string) => api.get<ExchangeSymbolsResponse>(`/trading/exchanges/${name}/symbols/`),
  credentials: () => api.get<PaginatedResponse<ExchangeCredentials> | ExchangeCredentials[]>("/trading/credentials/"),
  createCredentials: (body: CreateCredentialsRequest) => api.post<ExchangeCredentials>("/trading/credentials/", body),
  deleteCredentials: (id: string) => api.delete(`/trading/credentials/${id}/`),
  pairs: (page = 1) => api.get<PaginatedResponse<any> | any[]>(`/trading/pairs/${qs({ page })}`),
  status: () => api.get<any>("/trading/status/"),
  rates: () => api.get<Record<string, any>>("/trading/rates/"),
};

// ---------- Exchanges app (§6.1 — legacy, connect flow) ----------
export const exchangesApi = {
  list: () => api.get<PaginatedResponse<Exchange> | Exchange[]>("/exchanges/list/"),
  credentials: () => api.get<PaginatedResponse<ExchangeCredentials> | ExchangeCredentials[]>("/exchanges/credentials/"),
  createCredentials: (body: CreateCredentialsRequest) => api.post<ExchangeCredentials>("/exchanges/credentials/", body),
  deleteCredentials: (id: string) => api.delete(`/exchanges/credentials/${id}/`),
  supportedPairs: () => api.get<any>("/exchanges/supported-pairs/"),
  status: () => api.get<any>("/exchanges/status/"),
  symbols: (name: string) => api.get<ExchangeSymbolsResponse>(`/exchanges/${name}/symbols/`),
  rates: () => api.get<Record<string, any>>("/exchanges/rates/"),
  blockchainAddresses: () => api.get<PaginatedResponse<any> | any[]>("/exchanges/blockchain-addresses/"),
};

// ---------- Subscriptions & signaling (§4) ----------
export const subscriptionsApi = {
  publicPlans: () => api.get<PlanListResponse>("/subscriptions/public/plans/"),
  telegramPlans: () => api.get<PlanListResponse>("/subscriptions/telegram/plans/"),
  botPlans: () => api.get<PlanListResponse>("/subscriptions/bot-plans/"),
  mySubscription: () => api.get<MySubscriptionResponse>("/subscriptions/my-subscription/"),
  botSubscribe: (plan_id: string) => api.post("/subscriptions/bot-subscribe/", { plan_id }),
  telegramSubscribe: (body: TelegramSubscribeRequest, screenshot?: File | null) => {
    if (screenshot) {
      const form = new FormData();
      Object.entries(body).forEach(([k, v]) => v !== undefined && v !== null && form.append(k, String(v)));
      form.append("payment_screenshot", screenshot);
      return api.post("/subscriptions/telegram/subscribe/", form);
    }
    return api.post("/subscriptions/telegram/subscribe/", body);
  },
  telegramMyUsage: () => api.get<BotUsage>("/subscriptions/telegram/my-usage/"),
  botMyUsage: () => api.get<BotUsage>("/subscriptions/bot-my-usage/"),
  signals: (page = 1) => api.get<PaginatedResponse<any> | any[]>(`/subscriptions/signals/${qs({ page })}`),
  signalResults: (page = 1) => api.get<PaginatedResponse<any> | any[]>(`/subscriptions/signal-results/${qs({ page })}`),
  channels: () => api.get<PaginatedResponse<any> | any[]>("/subscriptions/channels/"),
};

/** my-subscription/ is always 200 — parse the two shapes defensively (§4). */
export function parseMySubscription(data: MySubscriptionResponse | undefined | null): BotSubscription | null {
  if (!data) return null;
  if ("subscription" in (data as any)) return (data as any).subscription ?? null;
  return data as BotSubscription;
}

// ---------- Investments & positions (§7) ----------
export const investmentsApi = {
  orders: (params: Record<string, string | number | undefined> = {}) =>
    api.get<PaginatedResponse<Order> | Order[]>(`/investments/orders/${qs(params)}`),
  positions: (page = 1) => api.get<PaginatedResponse<any> | any[]>(`/investments/positions/${qs({ page })}`),
  balances: () => api.get<PaginatedResponse<any> | any[]>("/investments/balances/"),
  myOrders: () => api.get<PaginatedResponse<Order> | Order[]>("/investments/users/my-orders/"),
  profile: () => api.get<any>("/investments/users/profile/"),
  quantumAiDeposit: (botId: string, body: Record<string, any>) =>
    api.post<any>(`/investments/bots/quantum-ai/${botId}/deposit/`, body),
};

// ---------- Payments (§8) ----------
export const paymentsApi = {
  subscriptionPlans: () => api.get<PaginatedResponse<SubscriptionPlan> | SubscriptionPlan[]>("/payments/subscription-plans/"),
  quantumDeposits: () => api.get<PaginatedResponse<InvestorDeposit> | InvestorDeposit[]>("/payments/quantum-deposits/"),
  withdrawals: (page = 1) => api.get<PaginatedResponse<WithdrawalRequest> | WithdrawalRequest[]>(`/payments/withdrawals/${qs({ page })}`),
  createWithdrawal: (body: Record<string, any>) => api.post<WithdrawalRequest>("/payments/withdrawals/", body),
  transactions: (page = 1) => api.get<PaginatedResponse<any> | any[]>(`/payments/transactions/${qs({ page })}`),
  blockchainAddresses: () => api.get<PaginatedResponse<any> | any[]>("/payments/blockchain-addresses/"),
  paymentCoins: () => api.get<{ coins?: PaymentCoin[] } | PaymentCoin[]>("/payments/payment-coins/"),
  createPaymentCode: (body: CreatePaymentCodeRequest) => api.post<PaymentCode>("/payments/payment-codes/", body),
  paymentCode: (code: string, coinId?: string) =>
    api.get<PaymentCode>(`/payments/payment-codes/${code}/${qs({ coin_id: coinId })}`),
  requotePaymentCode: (code: string, coinId?: string) =>
    api.post<PaymentCode>(`/payments/payment-codes/${code}/quote/`, coinId ? { coin_id: coinId } : {}),
  submitProof: (code: string, body: Record<string, any>, screenshot?: File | null) => {
    if (screenshot) {
      const form = new FormData();
      Object.entries(body).forEach(([k, v]) => v !== undefined && v !== null && form.append(k, String(v)));
      form.append("payment_screenshot", screenshot);
      return api.post(`/payments/payment-codes/${code}/proof/`, form);
    }
    return api.post(`/payments/payment-codes/${code}/proof/`, body);
  },
  myBotSubscription: () => api.get<BotSubscription>("/payments/subscriptions/bot/"),
  createBotSubscription: (body: Record<string, any>) => api.post<BotSubscription>("/payments/subscriptions/bot/create/", body),
};

/** payment-coins/ returns either a bare array or {"coins": [...]} — normalize. */
export function asCoins(data: { coins?: PaymentCoin[] } | PaymentCoin[] | undefined | null): PaymentCoin[] {
  if (!data) return [];
  return Array.isArray(data) ? data : (data.coins ?? []);
}

// ---------- Referrals (§9) ----------
export const referralsApi = {
  myStats: () => api.get<ReferralStats>("/referrals/my-stats/"),
  apply: (code: string) => api.post<{ message: string; referrer: string }>("/referrals/apply/", { code }),
  payoutRequests: () => api.get<{ payout_requests: PayoutRequestRow[] } | PayoutRequestRow[]>("/referrals/payout-requests/"),
  requestPayout: (amount: string) => api.post<PayoutRequestRow>("/referrals/payout-requests/", { amount }),
};

/** payout-requests/ returns either a bare array or {"payout_requests": [...]} — normalize. */
export function asPayoutRequests(data: { payout_requests: PayoutRequestRow[] } | PayoutRequestRow[] | undefined | null): PayoutRequestRow[] {
  if (!data) return [];
  return Array.isArray(data) ? data : (data.payout_requests ?? []);
}

export type { BillingCycle, BotSubscription, SubscriptionPlan };
