import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/services";
import { errorMessage } from "@/lib/api";

/** /auth/forgot-password — request link; with ?token= it completes the reset. */
const ForgotPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (token) {
        if (pw.length < 8) throw new Error("Password must be at least 8 characters");
        if (pw !== pw2) throw new Error("Passwords do not match");
        const r = await authApi.passwordResetConfirm(token, pw, pw2);
        toast.success(r.message || "Password updated. Please sign in.");
        navigate("/auth/login");
      } else {
        const r = await authApi.passwordReset(email);
        setSent(true);
        toast.success(r.message);
      }
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 p-4">
      <form onSubmit={submit} className="w-full max-w-md p-6 md:p-8 space-y-5 bg-card/30 backdrop-blur-xl rounded-xl border border-border/50 shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{token ? "Set a new password" : "Forgot password"}</h1>
          <p className="text-muted-foreground text-sm">
            {token ? "Choose a new password for your account." : "Enter your email and we'll send you a reset link."}
          </p>
        </div>
        {token ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="pw">New password</Label>
              <div className="relative"><Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="pw" type="password" className="pl-10" value={pw} onChange={(e) => setPw(e.target.value)} required /></div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pw2">Confirm password</Label>
              <Input id="pw2" type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} required />
            </div>
          </>
        ) : sent ? (
          <p className="text-sm text-center">If an account exists for <b>{email}</b>, a reset link is on its way.</p>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" className="pl-10" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          </div>
        )}
        {!sent && <Button type="submit" className="w-full" disabled={busy}>{busy ? "Please wait…" : token ? "Update password" : "Send reset link"}</Button>}
        <p className="text-center text-sm"><Link to="/auth/login" className="text-torgovo-purple hover:underline">Back to sign in</Link></p>
      </form>
    </div>
  );
};

export default ForgotPassword;
