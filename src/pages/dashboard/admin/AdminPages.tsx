import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Check, X, Ban, Send } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminApi, asList } from "@/lib/services";
import { errorMessage } from "@/lib/api";
import type { AdminUser, InvestorDeposit } from "@/types/api";

const Shell = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">{title}</h1>
    {children}
  </div>
);

const State = ({ loading, error, empty }: { loading: boolean; error: unknown; empty: boolean }) => {
  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (error) return <p className="text-destructive py-8 text-center">{errorMessage(error)}</p>;
  if (empty) return <p className="text-muted-foreground py-8 text-center">Nothing to show yet.</p>;
  return null;
};

const fmt = (v: any) => (v === null || v === undefined || v === "" ? "—" : typeof v === "object" ? JSON.stringify(v) : String(v));
const fmtDate = (v?: string) => (v ? new Date(v).toLocaleString() : "—");

/** Renders an unknown list of rows as a table using their own keys. */
const GenericTable = ({ rows }: { rows: Record<string, any>[] }) => {
  const cols = Array.from(new Set(rows.flatMap((r) => Object.keys(r)))).slice(0, 8);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader><TableRow>{cols.map((c) => <TableHead key={c} className="capitalize">{c.replace(/_/g, " ")}</TableHead>)}</TableRow></TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={r.id ?? i}>{cols.map((c) => <TableCell key={c} className="max-w-[220px] truncate">{fmt(r[c])}</TableCell>)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

/** Admin KPI cards — shown on the dashboard home for staff. */
export const AdminStatsCards = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ["admin", "stats"], queryFn: adminApi.stats });
  if (isLoading || error || !data) return <State loading={isLoading} error={error} empty={!data} />;
  const entries = Object.entries(data).filter(([, v]) => typeof v !== "object" || v === null);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {entries.map(([k, v]) => (
        <Card key={k} className="glass card-3d">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground capitalize">{k.replace(/_/g, " ")}</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{fmt(v)}</div></CardContent>
        </Card>
      ))}
    </div>
  );
};

export const AdminDashboard = () => <Shell title="Admin Overview"><AdminStatsCards /></Shell>;

export const AdminUsers = () => {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: ["admin", "users"], queryFn: () => adminApi.users() });
  const restrict = useMutation({
    mutationFn: (id: string) => adminApi.restrictUser(id),
    onSuccess: () => { toast.success("User restricted"); qc.invalidateQueries({ queryKey: ["admin", "users"] }); },
    onError: (e) => toast.error(errorMessage(e)),
  });
  const users = asList<AdminUser>(data as any);
  return (
    <Shell title="Users">
      <Card><CardContent className="pt-6">
        <State loading={isLoading} error={error} empty={!users.length} />
        {!!users.length && (
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Joined</TableHead><TableHead>Role</TableHead><TableHead /></TableRow></TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.full_name || u.username || "—"}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{fmtDate(u.date_joined)}</TableCell>
                  <TableCell>{u.is_staff ? <Badge>Admin</Badge> : <Badge variant="secondary">User</Badge>}</TableCell>
                  <TableCell className="text-right">
                    {!u.is_staff && (
                      <Button size="sm" variant="outline" disabled={restrict.isPending}
                        onClick={() => confirm(`Restrict ${u.email}?`) && restrict.mutate(u.id)}>
                        <Ban className="h-4 w-4 mr-1" /> Restrict
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent></Card>
    </Shell>
  );
};

const ListPage = ({ title, queryKey, fn }: { title: string; queryKey: string; fn: () => Promise<any> }) => {
  const { data, isLoading, error } = useQuery({ queryKey: ["admin", queryKey], queryFn: fn });
  const rows = Array.isArray(data) ? data : asList<any>(data) .length ? asList<any>(data) : (data?.bots ?? data?.logs ?? data?.data ?? []);
  return (
    <Shell title={title}>
      <Card><CardContent className="pt-6">
        <State loading={isLoading} error={error} empty={!rows.length} />
        {!!rows.length && <GenericTable rows={rows} />}
      </CardContent></Card>
    </Shell>
  );
};

export const AdminBots = () => <ListPage title="All Bots" queryKey="bots" fn={adminApi.botsOverview} />;
export const AdminTradeLogs = () => <ListPage title="Trade Logs" queryKey="trade-logs" fn={() => adminApi.tradeLogs()} />;

export const AdminDeposits = () => {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: ["admin", "deposits"], queryFn: adminApi.deposits, refetchInterval: 30000 });
  const act = useMutation({
    mutationFn: ({ id, approve }: { id: string; approve: boolean }) =>
      approve ? adminApi.approveDeposit(id) : adminApi.rejectDeposit(id, prompt("Reason for rejection (optional)") || undefined),
    onSuccess: (_d, v) => { toast.success(v.approve ? "Deposit approved" : "Deposit rejected"); qc.invalidateQueries({ queryKey: ["admin", "deposits"] }); },
    onError: (e) => toast.error(errorMessage(e)),
  });
  const deps = asList<InvestorDeposit>(data as any);
  const variant = (s: string) => (s === "approved" ? "default" : s === "rejected" ? "destructive" : "secondary") as any;
  return (
    <Shell title="Deposit Approvals">
      <Card><CardContent className="pt-6">
        <State loading={isLoading} error={error} empty={!deps.length} />
        {!!deps.length && (
          <Table>
            <TableHeader><TableRow><TableHead>Bot</TableHead><TableHead>Amount</TableHead><TableHead>Network</TableHead><TableHead>TX hash</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead /></TableRow></TableHeader>
            <TableBody>
              {deps.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{d.bot_name}</TableCell>
                  <TableCell>{d.amount} {d.currency}</TableCell>
                  <TableCell>{d.blockchain}</TableCell>
                  <TableCell className="max-w-[160px] truncate font-mono text-xs">{d.transaction_hash}</TableCell>
                  <TableCell>{fmtDate(d.created_at)}</TableCell>
                  <TableCell><Badge variant={variant(d.status)} className="capitalize">{d.status}</Badge></TableCell>
                  <TableCell className="text-right space-x-2 whitespace-nowrap">
                    {d.status === "pending" && (<>
                      <Button size="sm" disabled={act.isPending} onClick={() => act.mutate({ id: d.id, approve: true })}><Check className="h-4 w-4" /></Button>
                      <Button size="sm" variant="destructive" disabled={act.isPending} onClick={() => act.mutate({ id: d.id, approve: false })}><X className="h-4 w-4" /></Button>
                    </>)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent></Card>
    </Shell>
  );
};

export const AdminEmails = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const send = useMutation({
    mutationFn: () => {
      const list = recipients.split(",").map((s) => s.trim()).filter(Boolean);
      return adminApi.sendEmail({ subject, message, ...(list.length ? { recipients: list } : { send_to_all: true }) });
    },
    onSuccess: () => { toast.success("Email sent"); setSubject(""); setMessage(""); setRecipients(""); },
    onError: (e) => toast.error(errorMessage(e)),
  });
  return (
    <Shell title="Send Email">
      <Card className="max-w-2xl"><CardContent className="pt-6 space-y-4">
        <Input placeholder="Recipients (comma-separated). Leave empty to send to all users" value={recipients} onChange={(e) => setRecipients(e.target.value)} />
        <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Textarea placeholder="Message" rows={8} value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button disabled={!subject || !message || send.isPending}
          onClick={() => (recipients.trim() || confirm("Send this email to ALL users?")) && send.mutate()}>
          <Send className="h-4 w-4 mr-2" /> {send.isPending ? "Sending…" : "Send"}
        </Button>
      </CardContent></Card>
    </Shell>
  );
};
