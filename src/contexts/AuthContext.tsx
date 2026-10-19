import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getAuthToken } from "@/lib/authToken";
import { authApi } from "@/lib/services";
import type { User } from "@/types/api";

interface AuthState {
  user: User | null;
  loading: boolean;
  isStaff: boolean;
  setUser: (u: User | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(!!getAuthToken());

  const refreshUser = useCallback(async () => {
    if (!getAuthToken()) { setUser(null); setLoading(false); return; }
    setLoading(true);
    try { setUser(await authApi.me()); } catch { setUser(null); } finally { setLoading(false); }
  }, []);

  useEffect(() => { refreshUser(); }, [refreshUser]);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
    window.location.href = "/auth/login";
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isStaff: user?.is_staff === true, setUser, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
