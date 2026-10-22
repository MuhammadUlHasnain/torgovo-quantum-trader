import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, ArrowRight, Bot, Grid3X3, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { botsApi, tradingApi } from "@/lib/services";
import { errorMessage, API_BASE_URL } from "@/lib/api";
import { SUPPORTED_EXCHANGES, COMING_SOON_EXCHANGES } from "@/types/api";
import { cn } from "@/lib/utils";

const TYPES = [
  { id: "grid", label: "Grid Bot", icon: Grid3X3, desc: "Buy low, sell high inside a price range with layered orders." },
  { id: "martingale", label: "Martingale Bot", icon: TrendingUp, desc: "Cost-averaging entries with multiplier sizing on dips." },
  { id: "webhook", label: "Signal Bot", icon: Bot, desc: "Execute trades from TradingView alerts via webhook." },
  { id: "quantum_ai", label: "QuantumAI Bot", icon: Sparkles, desc: "Invest in our AI-managed QuantumAI fund." },
];

const DEFAULT_PAIRS = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT", "ADA/USDT"];

const STEPS = ["Type", "Exchange", "Pair", "Parameters", "Review"];

const CreateBot = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [type, setType] = useState<string | null>(null);
  const [exchange, setExchange] = useState<string | null>(null);
  const [pair, setPair] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [params, setParams] = useState({
    bot_name: "",
    base_amount: "",
    favor_levels: 5,
    against_levels: 5,
    level_spacing_percent: "0.5",
    multiplier_factor: "1.5",
    take_profit_percent: "1.5",
    stop_loss_percent: "5",
    max_position_size: "",
  });

  // Exchange list — public per §6.2. Falls back to the doc list if backend is down.
  const { data: exData, isLoading: exLoading } = useQuery({
    queryKey: ["trading-exchanges"],
    queryFn: tradingApi.exchangesList,
    staleTime: 10 * 60 * 1000,
  });
  const exchanges: { name: string; display_name: string; is_active: boolean }[] = useMemo(() => {
    const rows = exData?.success ? exData.data : [];
    if (rows?.length) return rows.filter((r) => r.is_active);
    return SUPPORTED_EXCHANGES.map((n) => ({ name: n, display_name: n.charAt(0).toUpperCase() + n.slice(1), is_active: true }));
  }, [exData]);

  const { data: symData, isLoading: symLoading } = useQuery({
    queryKey: ["exchange-symbols", exchange],
    queryFn: () => tradingApi.exchangeSymbols(exchange!),
    enabled: step >= 2 && !!exchange,
    staleTime: 10 * 60 * 1000,
  });
  const symbols: string[] = useMemo(() => {
    if (symData?.success && symData.symbols?.length) return symData.symbols;
    return DEFAULT_PAIRS;
  }, [symData]);

  const setParam = (k: keyof typeof params, v: string | number) => setParams((p) => ({ ...p, [k]: v }));

  const canNext = () => {
    if (step === 0) return !!type;
    if (step === 1) return !!exchange;
    if (step === 2) return !!pair;
    if (step === 3) {
      return (
        params.bot_name.trim().length > 0 &&
        parseFloat(params.base_amount) > 0 &&
        parseFloat(params.take_profit_percent) > 0
      );
    }
    return true;
  };

  const submit = async () => {
    if (!type || !exchange || !pair) return;
    const isGrid = type === "grid";
    const body: Record<string, any> = {
      bot_name: params.bot_name.trim(),
      exchange,
      trading_pair: pair,
      take_profit_percent: params.take_profit_percent,
      stop_loss_percent: params.stop_loss_percent,
      base_amount: params.base_amount,
      favor_levels: Number(params.favor_levels),
      against_levels: Number(params.against_levels),
      level_spacing_percent: params.level_spacing_percent,
    };
    if (!isGrid) body.multiplier_factor = params.multiplier_factor;
    if (params.max_position_size) body.max_position_size = params.max_position_size;

    setSubmitting(true);
    try {
      await (isGrid ? botsApi.createGridBot(body) : botsApi.createMartingaleBot(body));
      toast.success("Bot created successfully!");
      navigate("/dashboard/bots");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create New Bot</h2>
          <p className="text-muted-foreground">Select a bot type to begin setting up your automated trading strategy.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {TYPES.map((t) => {
            const Icon = t.icon;
            return (
              <Card
                key={t.id}
                className={cn("card-3d cursor-pointer transition-colors", type === t.id && "border-torgovo-purple")}
                onClick={() => {
                  if (t.id === "webhook") { navigate("/dashboard/create-signal-bot"); return; }
                  if (t.id === "quantum_ai") { navigate("/dashboard/invest-in-bot"); return; }
                  setType(t.id); setStep(1);
                }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="icon-3d rounded-lg bg-torgovo-purple/10 p-2"><Icon className="h-5 w-5 text-torgovo-purple" /></div>
                    <CardTitle>{t.label}</CardTitle>
                  </div>
                  <CardDescription className="mt-2">{t.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    {t.id === "grid" && (
                      <>
                        <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-torgovo-blue" /><span>Best for sideways/ranging markets</span></li>
                        <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-torgovo-blue" /><span>Low-risk with defined parameters</span></li>
                        <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-torgovo-blue" /><span>Customizable grid size and price range</span></li>
                      </>
                    )}
                    {t.id === "martingale" && (
                      <>
                        <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-torgovo-blue" /><span>Customizable order sizing</span></li>
                        <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-torgovo-blue" /><span>Maximum drawdown protection</span></li>
                        <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-torgovo-blue" /><span>Take profit automation</span></li>
                      </>
                    )}
                    {(t.id === "webhook" || t.id === "quantum_ai") && (
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <span className="size-2 rounded-full bg-torgovo-purple" />
                        <span>Opens the dedicated setup flow</span>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => (step === 1 ? setStep(0) : setStep(step - 1))}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create {type === "grid" ? "Grid" : "Martingale"} Bot</h2>
          <p className="text-muted-foreground">Step {step + 1} of 5 — {STEPS[step]}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-torgovo-purple" : "bg-muted")} />
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Exchange</CardTitle>
            <CardDescription>Pick where this bot will trade.</CardDescription>
          </CardHeader>
          <CardContent>
            {exLoading ? (
              <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {exchanges.map((e) => (
                  <button
                    key={e.name}
                    type="button"
                    onClick={() => { setExchange(e.name); setPair(null); setStep(2); }}
                    className={cn(
                      "card-3d rounded-md border p-4 text-left font-medium",
                      exchange === e.name && "border-torgovo-purple"
                    )}
                  >
                    {e.display_name}
                    {exchange === e.name && <CheckCircle2 className="inline ml-2 h-4 w-4 text-torgovo-purple" />}
                  </button>
                ))}
                {COMING_SOON_EXCHANGES.map((n) => (
                  <div key={n} className="rounded-md border p-4 text-muted-foreground opacity-50 cursor-not-allowed">
                    {n.charAt(0).toUpperCase() + n.slice(1)} <span className="text-xs">(Coming soon)</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Trading Pair</CardTitle>
            <CardDescription>Live symbol list from {exchange}.</CardDescription>
          </CardHeader>
          <CardContent>
            {symLoading ? (
              <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
            ) : (
              <>
                <Input
                  placeholder="Search pairs…"
                  className="mb-3"
                  value={pair ?? ""}
                  onChange={(e) => setPair(e.target.value.toUpperCase())}
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                  {symbols
                    .filter((s) => !pair || s.toUpperCase().includes(pair.toUpperCase()))
                    .slice(0, 100)
                    .map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => { setPair(s); setStep(3); }}
                        className={cn("card-3d rounded-md border p-2 text-sm text-left", pair === s && "border-torgovo-purple")}
                      >
                        {s}
                      </button>
                    ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Bot Parameters</CardTitle>
            <CardDescription>Configure how your {type === "grid" ? "grid" : "martingale"} bot trades.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="bot-name">Bot name</Label>
              <Input id="bot-name" value={params.bot_name} onChange={(e) => setParam("bot_name", e.target.value)} placeholder="My Grid Bot" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="base-amount">Order amount (USDT)</Label>
              <Input id="base-amount" type="number" min="0" value={params.base_amount} onChange={(e) => setParam("base_amount", e.target.value)} placeholder="100" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="max-position">Max position size (USDT, optional)</Label>
              <Input id="max-position" type="number" min="0" value={params.max_position_size} onChange={(e) => setParam("max_position_size", e.target.value)} placeholder="1000" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="favor">Profit levels (sell orders)</Label>
              <Input id="favor" type="number" min="1" max="50" value={params.favor_levels} onChange={(e) => setParam("favor_levels", Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="against">Buy levels</Label>
              <Input id="against" type="number" min="1" max="50" value={params.against_levels} onChange={(e) => setParam("against_levels", Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="spacing">Level spacing (%)</Label>
              <Input id="spacing" type="number" step="0.1" min="0.1" value={params.level_spacing_percent} onChange={(e) => setParam("level_spacing_percent", e.target.value)} />
            </div>
            {type === "martingale" && (
              <div className="space-y-1">
                <Label htmlFor="multiplier">Multiplier factor</Label>
                <Input id="multiplier" type="number" step="0.1" min="1" value={params.multiplier_factor} onChange={(e) => setParam("multiplier_factor", e.target.value)} />
              </div>
            )}
            <div className="space-y-1">
              <Label htmlFor="tp">Take profit (%)</Label>
              <Input id="tp" type="number" step="0.1" min="0.1" value={params.take_profit_percent} onChange={(e) => setParam("take_profit_percent", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="sl">Stop loss (%)</Label>
              <Input id="sl" type="number" step="0.1" min="0" value={params.stop_loss_percent} onChange={(e) => setParam("stop_loss_percent", e.target.value)} />
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Deploy</CardTitle>
            <CardDescription>Double-check before the bot goes live.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              ["Type", type === "grid" ? "Grid Bot" : "Martingale Bot"],
              ["Exchange", exchange ?? ""],
              ["Trading pair", pair ?? ""],
              ["Name", params.bot_name],
              ["Order amount", `${params.base_amount} USDT`],
              ["Levels", `${params.against_levels} buy / ${params.favor_levels} sell`],
              ["Spacing", `${params.level_spacing_percent}%`],
              ...(type === "martingale" ? [["Multiplier", params.multiplier_factor]] : []),
              ["Take profit", `${params.take_profit_percent}%`],
              ["Stop loss", `${params.stop_loss_percent}%`],
              ...(params.max_position_size ? [["Max position", `${params.max_position_size} USDT`]] : []),
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border/50 py-1.5">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        {step < 4 ? (
          <Button className="bg-torgovo-purple hover:bg-torgovo-purple/90" disabled={!canNext()} onClick={() => setStep(step + 1)}>
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-torgovo-purple hover:bg-torgovo-purple/90" disabled={submitting} onClick={submit}>
            {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Deploy Bot
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateBot;
