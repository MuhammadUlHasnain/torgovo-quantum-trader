// Type definitions for the API

export type Exchange = 'binance' | 'bybit' | 'kraken' | 'mexc' | 'okx';
export type BotType = 'grid' | 'martingale' | 'ai_grid' | 'spot' | 'futures';
export type PlanType = 'custom_bot' | 'managed_bot';
export type SubscriptionStatus = 'trial' | 'active' | 'cancelled' | 'expired' | 'suspended';
export type OrderAction = 'buy' | 'sell';
export type OrderType = 'market' | 'limit' | 'stop_loss' | 'take_profit';
export type TradingMode = 'demo' | 'real';
export type WithdrawalStatus = 'pending' | 'approved' | 'rejected' | 'completed';

// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  date_joined: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegistrationRequest {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  password_confirm: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

// Subscription Types
export interface SubscriptionPlan {
  id: number;
  plan_type: PlanType;
  plan_type_display: string;
  name: string;
  description: string;
  features: Record<string, any>;
  monthly_price: string;
  six_month_price?: string;
  yearly_price?: string;
  setup_fee: string;
  max_trading_pairs?: number;
  max_bots?: number;
  guaranteed_monthly_return?: string;
  profit_share_percentage?: string;
  min_investment?: string;
  api_calls_per_day: number;
  webhook_requests_per_hour: number;
  concurrent_bots: number;
  is_active: boolean;
  is_public: boolean;
  is_featured: boolean;
  subscriber_count: number;
  created_at: string;
}

export interface Subscription {
  id: number;
  user: {
    id: number;
    username: string;
  };
  plan: {
    id: number;
    name: string;
    plan_type: PlanType;
  };
  status: SubscriptionStatus;
  status_display: string;
  billing_cycle: 'monthly' | 'six_month' | 'yearly';
  start_date: string;
  end_date: string;
  trial_end_date?: string;
  auto_renew: boolean;
  is_active_trial: boolean;
  is_currently_active: boolean;
  days_remaining: number;
  usage_stats: {
    api_calls_used: number;
    api_calls_limit: number;
    api_calls_remaining: number;
    webhook_requests_used: number;
    webhook_requests_limit: number;
    webhook_requests_remaining: number;
  };
  created_at: string;
}

// Custom Bot Types
export interface CustomBot {
  id: string;
  name: string;
  bot_type: 'spot' | 'futures';
  trading_mode: TradingMode;
  exchange: Exchange;
  webhook_url: string;
  webhook_secret: string;
  system_generated_id: string;
  trade_amount_type: 'percentage' | 'fixed';
  trade_amount_value: number;
  api_key: string;
  api_secret: string;
  is_active: boolean;
  created_at: string;
  total_trades: number;
  profit_loss: number;
  profit_loss_percentage: number;
}

export interface CreateCustomBotRequest {
  name: string;
  bot_type: 'spot' | 'futures';
  trading_mode: TradingMode;
  exchange: Exchange;
  trade_amount_type: 'percentage' | 'fixed';
  trade_amount_value: number;
  api_key: string;
  api_secret: string;
}

// Managed Bot Types
export interface ManagedBot {
  id: number;
  name: string;
  bot_type: 'grid' | 'martingale' | 'ai_grid';
  exchange: Exchange;
  pair_symbol: string;
  description: string;
  min_investment: string;
  guaranteed_monthly_return?: string;
  profit_share_percentage?: string;
  performance_30d: string;
  performance_90d: string;
  total_subscribers: number;
  wallet_addresses: WalletAddress[];
  is_active: boolean;
}

export interface WalletAddress {
  coin: string;
  address: string;
  network: string;
}

export interface Investment {
  id: number;
  user: User;
  managed_bot: ManagedBot;
  amount: string;
  coin: string;
  transaction_hash: string;
  status: 'pending' | 'confirmed' | 'rejected';
  current_value: string;
  profit_loss: string;
  profit_loss_percentage: string;
  created_at: string;
  confirmed_at?: string;
}

export interface CreateInvestmentRequest {
  managed_bot_id: number;
  amount: string;
  coin: string;
  transaction_hash: string;
}

// Withdrawal Types
export interface WithdrawalRequest {
  id: number;
  user: User;
  investment: Investment;
  amount: string;
  status: WithdrawalStatus;
  requested_at: string;
  processed_at?: string;
  processed_by?: User;
  rejection_reason?: string;
}

export interface CreateWithdrawalRequest {
  investment_id: number;
  amount: string;
}

// Performance Types
export interface BotPerformance {
  id: number;
  bot_id: string;
  date: string;
  total_trades: number;
  winning_trades: number;
  losing_trades: number;
  profit_loss: string;
  profit_loss_percentage: string;
  balance: string;
}

export interface DashboardStats {
  total_profit: string;
  total_trades: number;
  active_bots: number;
  win_rate: string;
  custom_bots_count: number;
  managed_investments_count: number;
  total_invested: string;
  current_portfolio_value: string;
}
