# Roadmap — backend brief alignment

## Phase 1 (done)
- [x] Token refresh/rotation, typed errors, /auth/login redirect fix
- [x] Types replaced from brief §14.4
- [x] Login/Signup/Logout wired; forgot password page
- [x] Admin area: overview, users, bots, trade logs, deposits, emails; admin stats on dashboard

## Phase 2 (done)
- [x] Services layer: auth (2FA/phone/password), users, bots, trading, exchanges, subscriptions, investments, payments, referrals
- [x] Types: 2FA, payment codes/coins/quotes, plan lists, my-subscription shapes

## Phase 3 (in progress)
- [ ] Exchange Connections wired: trading/exchanges/list/, masked credentials, connect/disconnect, KuCoin/Bitget coming soon
- [ ] Pricing loads plans from subscriptions/bot-plans/ (fallback to static tiers offline)
- [ ] CreateBot wizard: type → exchange (trading/exchanges/list/) → pair (symbols) → params → create grid/martingale
- [ ] BotManagement wired to bots endpoints with start/stop
- [ ] BotDetail page + polling orders/positions
- [ ] Orders page with brief §14.8 filters
- [ ] Withdrawals wired (two_factor_code required, 2FA gate)
- [ ] Settings: 2FA setup/confirm/disable, change password wired, Telegram handle
- [ ] Deposits page: payment-code flow (coins → code → live quote → proof)
- [ ] Transactions page
- [ ] Referrals page (hybrid reward model, payout requests)
- [ ] Subscriptions page (my-subscription null state, bot-subscribe 409 handling)
- [ ] Subscription expiry banner (D-7/D-5/D-3/D-1 + grace)
- [ ] Sidebar + routes for new pages
- [ ] Final checks: build, checklist §15
