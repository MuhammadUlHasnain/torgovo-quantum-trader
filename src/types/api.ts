// Backend contract types — mirrors the Torgovo Frontend Integration Brief §14.4.
// IDs are opaque strings. Decimals are strings.

export interface PaginatedResponse<T> { count: number; next: string | null; previous: string | null; results: T[]; }

export interface ApiErrorEnvelope {
  error: { code: string; message: string; details?: any; field_errors?: Record<string, string[]> } | string;
  timestamp?: string;
}

// ---------- Users / auth ----------
export interface UserProfile {
  subscription_plan: string; subscription_plan_display: string;
  max_bots_allowed: number; timezone: string;
  trading_preferences: Record<string, any>;
  demo_trading_enabled: boolean;
  email_notifications: boolean; sms_notifications: boolean; push_notifications: boolean;
  is_subscription_active: boolean;
  referral_code: string;
  total_trades_executed: number; total_volume_traded: number;
}

export interface User {
  id: string; email: string; username?: string;
  first_name: string; last_name: string; full_name: string;
  phone_number: string;
  is_email_verified: boolean; is_phone_verified: boolean;
  two_factor_enabled: boolean; is_staff?: boolean;
  date_joined: string; last_login: string; timezone: string;
  profile?: UserProfile;
}

export interface AuthTokens { access_token: string; refresh_token: string; }

export interface LoginRequest { email: string; password: string; }
export interface LoginResponse { user: User; tokens: AuthTokens; message: string; }

export interface RegistrationRequest {
  first_name: string; last_name: string; email: string; username: string;
  password: string; password_confirm: string; phone_number: string;
  referral_code?: string; terms_accepted: boolean; privacy_policy_accepted: boolean;
}
export interface RegisterResponse extends LoginResponse { verification_sent: boolean; }
export interface RefreshResponse extends AuthTokens { message: string; }

// ---------- Bots ----------
export type BotCategory = "webhook" | "grid" | "martingale" | "quantum_ai";
export type BotStatus = "idle" | "running" | "paused" | "stopped" | "error";

export interface BotBase {
  id: string; user: string; bot_name: string;
  category: BotCategory;
  exchange: string; trading_pair: string;
  status: BotStatus; is_active: boolean;
  total_trades: number; successful_trades: number;
  total_profit_loss: string;
  take_profit_percent: string; stop_loss_percent: string;
  max_position_size: string;
  started_at: string | null; stopped_at: string | null;
  created_at: string; updated_at: string;
}
export interface SignalBot extends BotBase {
  webhook_id: string; webhook_url: string; secret_key: string;
  default_amount: string; last_triggered: string | null;
}
export interface GridBot extends Omit<BotBase, "take_profit_percent" | "stop_loss_percent"> {
  base_amount: string;
  favor_levels: number; against_levels: number;
  level_spacing_percent: string;
  current_grid_level: number; total_invested: string;
  is_running: boolean; subscription: string | null;
  exchange_name: string;
  favor_level_qty: number; against_level_qty: number;
  favor_level_difference: number; against_level_difference: number;
  take_profit_percent: number; stop_loss_percent: number; amount_type: string;
}
export interface MartingaleBot extends BotBase {
  base_amount: string;
  favor_levels: number; against_levels: number;
  level_spacing_percent: string; multiplier_factor: string;
  current_level: number; consecutive_losses: number;
  is_running: boolean; subscription: string | null;
  exchange_name: string;
}

export interface Order {
  id: string; user: string; pair: string;
  side: "BUY" | "SELL";
  category: string; order_type: string;
  quantity: number; price: number; exchange: string;
  status: "pending" | "executed" | "cancelled" | "failed";
  signal_bot: string | null; grid_bot: string | null;
  martingale_bot: string | null; investor_portfolio: string | null;
  description: string; details: Record<string, any>; created_at: string;
}

// ---------- Exchanges ----------
/** Exchanges the backend supports today. */
export const SUPPORTED_EXCHANGES = ["binance", "bybit", "okx", "mexc", "alpaca", "coinbase"] as const;
/** Shown in the UI as "Coming soon". */
export const COMING_SOON_EXCHANGES = ["kucoin", "bitget"] as const;
export type ExchangeName = (typeof SUPPORTED_EXCHANGES)[number];

export interface ExchangeCredentials {
  id: string; user: string; exchange_name: string;
  api_key: string; // masked
  is_testnet: boolean; is_active: boolean;
  permissions: string[]; notes: string; created_at: string;
}
export interface CreateCredentialsRequest {
  exchange_name: string; api_key: string; secret_key: string; passphrase?: string; is_testnet?: boolean;
}
export interface Exchange {
  id?: string; name: string; display_name: string;
  is_active: boolean; supports_testnet: boolean;
  supported_features: string[]; rate_limit_per_minute?: number;
  fee_rates: Record<string, any>;
}
export interface TradingPair {
  id: string; exchange: string; symbol: string;
  base_currency: string; quote_currency: string;
  price_precision: number; quantity_precision: number;
  min_quantity: string; is_active: boolean;
}

// ---------- Plans / subscriptions ----------
export interface SubscriptionPlan {
  id: string; name: string; slug: string; description: string;
  price_monthly: string; price_yearly: string;
  annual_discount_pct: number; sort_order: number;
  max_bots_allowed: number; max_webhooks_allowed: number;
  bot_types: string[]; market: "spot" | "spot_futures";
  max_signals_per_month: number; max_exchanges: number;
  features: Record<string, any>; is_active: boolean; trial_days: number;
}
export interface BotSubscription {
  id: string; user: string; plan: SubscriptionPlan;
  status: "pending_payment" | "pending_approval" | "active" | "expired" | "rejected";
  payment_screenshot: string | null;
  payment_transaction_hash: string; payment_blockchain: string;
  exchange_name: string;
  started_at: string | null; expires_at: string | null; is_expired: boolean;
}

// ---------- Payments ----------
export interface UserBalance { id: string; user: string; currency: string; available: string; hold: string; }
export interface BalanceSummary { total_usdt_value: string; balances: UserBalance[]; }
export interface InvestorDeposit {
  id: string; user: string; bot_name: string;
  amount: string; currency: string;
  status: "pending" | "approved" | "rejected";
  blockchain: string; transaction_hash: string; from_address: string; created_at: string;
}
export interface WithdrawalRequest {
  id: string; user: string; amount: string; currency: string;
  blockchain: string; to_address: string;
  status: "pending" | "processing" | "completed" | "rejected" | "cancelled";
  network_fee: string; processing_fee: string; total_amount: string;
  is_flagged: boolean; created_at: string;
}
export interface PaymentTransaction {
  id: string; user: string;
  transaction_type: "deposit" | "withdrawal" | "quantum_ai_payout" | "referral_bonus" | "subscription";
  amount: string; currency: string;
  status: "pending" | "completed" | "failed";
  description: string; created_at: string;
}

// ---------- Referrals ----------
export interface ReferralStats {
  referral_code: string; total_referrals: number;
  total_bonus_usdt: string; referral_link: string;
  reward_model: "commission" | "referee_discount";
  commission_pct: string | null;
  commission_pending_usd: string; commission_paid_usd: string;
  payout_minimum_usd: string;
  referee_discount_pct: string | null;
  has_pending_payout_request: boolean;
}
export interface PayoutRequestRow {
  id: string; amount_requested: string;
  status: "pending" | "approved" | "rejected";
  admin_entered_payout: string | null; admin_notes: string | null;
  decided_at: string | null; requested_at: string;
}

// ---------- Admin ----------
/** Admin KPI payload — field set is backend-defined; render known keys defensively. */
export type AdminDashboardStats = Record<string, any>;
export type AdminUser = User & { is_active?: boolean; is_restricted?: boolean };
export interface AdminSendEmailRequest { subject: string; message: string; recipients?: string[]; send_to_all?: boolean; }
