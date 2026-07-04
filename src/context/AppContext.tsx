"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Rental } from "@/types";

const STORAGE_KEY = "ai-rental-state";
const LOGIN_KEY = "ai-rental-logged-in";
const EMAIL_KEY = "ai-rental-email";
const USERS_KEY = "ai-rental-users";
const DEFAULT_PLAN_ID = "standard";

interface StoredUser {
  email: string;
  password: string;
  name: string;
}

interface AppState {
  favorites: string[];
  rentals: Rental[];
  rentalSlots: number;
  planId: string;
  emailNotifications: boolean;
}

interface AppContextValue extends AppState {
  toggleFavorite: (materialId: string) => void;
  isFavorite: (materialId: string) => boolean;
  rentMaterial: (materialId: string) => boolean;
  returnMaterial: (materialId: string) => void;
  isRented: (materialId: string) => boolean;
  availableSlots: number;
  isLoggedIn: boolean;
  userEmail: string | null;
  userName: string | null;
  isDemoAccount: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  updateName: (name: string) => { ok: boolean; error?: string };
  updatePassword: (current: string, next: string) => { ok: boolean; error?: string };
  changePlan: (planId: string) => { ok: boolean; error?: string };
  setEmailNotifications: (enabled: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as StoredUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function isDemoEmail(email: string | null) {
  return email?.toLowerCase() === "demo@airental.jp";
}

function getUserName(email: string | null): string | null {
  if (!email) return null;
  if (isDemoEmail(email)) return "デモユーザー";
  return getUsers().find((u) => u.email === email)?.name ?? null;
}

function defaultState(): AppState {
  return {
    favorites: [],
    rentals: [],
    rentalSlots: 20,
    planId: DEFAULT_PLAN_ID,
    emailNotifications: true,
  };
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState(), ...JSON.parse(raw) as AppState };
  } catch { /* ignore */ }
  return defaultState();
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem(EMAIL_KEY);
    setState(loadState());
    setIsLoggedIn(localStorage.getItem(LOGIN_KEY) === "true");
    setUserEmail(email);
    setUserName(getUserName(email));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const toggleFavorite = useCallback((materialId: string) => {
    setState((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(materialId)
        ? prev.favorites.filter((id) => id !== materialId)
        : [...prev.favorites, materialId],
    }));
  }, []);

  const isFavorite = useCallback((id: string) => state.favorites.includes(id), [state.favorites]);
  const isRented = useCallback((id: string) => state.rentals.some((r) => r.materialId === id), [state.rentals]);
  const availableSlots = useMemo(() => state.rentalSlots - state.rentals.length, [state.rentalSlots, state.rentals.length]);

  const rentMaterial = useCallback((materialId: string) => {
    if (!isLoggedIn || isRented(materialId) || availableSlots <= 0) return false;
    setState((prev) => ({
      ...prev,
      rentals: [...prev.rentals, { materialId, rentedAt: new Date().toISOString() }],
    }));
    return true;
  }, [isLoggedIn, isRented, availableSlots]);

  const returnMaterial = useCallback((materialId: string) => {
    setState((prev) => ({ ...prev, rentals: prev.rentals.filter((r) => r.materialId !== materialId) }));
  }, []);

  const login = useCallback((email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    const user = getUsers().find((u) => u.email === normalized);
    const valid = user ? user.password === password : normalized === "demo@airental.jp" && password === "demo1234";
    if (!valid) return { ok: false, error: "メールアドレスまたはパスワードが正しくありません" };
    setIsLoggedIn(true);
    setUserEmail(normalized);
    setUserName(getUserName(normalized));
    localStorage.setItem(LOGIN_KEY, "true");
    localStorage.setItem(EMAIL_KEY, normalized);
    return { ok: true };
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    if (password.length < 8) return { ok: false, error: "パスワードは8文字以上で設定してください" };
    const normalized = email.trim().toLowerCase();
    const users = getUsers();
    if (users.some((u) => u.email === normalized)) return { ok: false, error: "このメールアドレスは既に登録されています" };
    users.push({ email: normalized, password, name: name.trim() });
    saveUsers(users);
    setIsLoggedIn(true);
    setUserEmail(normalized);
    setUserName(name.trim());
    localStorage.setItem(LOGIN_KEY, "true");
    localStorage.setItem(EMAIL_KEY, normalized);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserEmail(null);
    setUserName(null);
    localStorage.removeItem(LOGIN_KEY);
    localStorage.removeItem(EMAIL_KEY);
  }, []);

  const updateName = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return { ok: false, error: "お名前を入力してください" };
    if (!userEmail || isDemoEmail(userEmail)) return { ok: false, error: "デモアカウントは名前を変更できません" };
    const users = getUsers();
    const index = users.findIndex((u) => u.email === userEmail);
    if (index < 0) return { ok: false, error: "ユーザー情報が見つかりません" };
    users[index] = { ...users[index], name: trimmed };
    saveUsers(users);
    setUserName(trimmed);
    return { ok: true };
  }, [userEmail]);

  const updatePassword = useCallback((current: string, next: string) => {
    if (next.length < 8) return { ok: false, error: "新しいパスワードは8文字以上で設定してください" };
    if (!userEmail || isDemoEmail(userEmail)) return { ok: false, error: "デモアカウントはパスワードを変更できません" };
    const users = getUsers();
    const index = users.findIndex((u) => u.email === userEmail);
    if (index < 0) return { ok: false, error: "ユーザー情報が見つかりません" };
    if (users[index].password !== current) return { ok: false, error: "現在のパスワードが正しくありません" };
    users[index] = { ...users[index], password: next };
    saveUsers(users);
    return { ok: true };
  }, [userEmail]);

  const changePlan = useCallback((planId: string) => {
    const plans: { id: string; slots: number }[] = [
      { id: "starter", slots: 5 },
      { id: "standard", slots: 20 },
      { id: "enterprise", slots: 50 },
    ];
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return { ok: false, error: "プランが見つかりません" };
    if (state.rentals.length > plan.slots) {
      return { ok: false, error: `レンタル中が${state.rentals.length}件あるため、このプラン（${plan.slots}枠）には変更できません` };
    }
    setState((prev) => ({ ...prev, planId, rentalSlots: plan.slots }));
    return { ok: true };
  }, [state.rentals.length]);

  const setEmailNotifications = useCallback((enabled: boolean) => {
    setState((prev) => ({ ...prev, emailNotifications: enabled }));
  }, []);

  const isDemoAccount = isDemoEmail(userEmail);

  const value = useMemo(() => ({
    ...state, toggleFavorite, isFavorite, rentMaterial, returnMaterial,
    isRented, availableSlots, isLoggedIn, userEmail, userName, isDemoAccount,
    login, register, logout, updateName, updatePassword, changePlan, setEmailNotifications,
  }), [
    state, toggleFavorite, isFavorite, rentMaterial, returnMaterial, isRented, availableSlots,
    isLoggedIn, userEmail, userName, isDemoAccount, login, register, logout,
    updateName, updatePassword, changePlan, setEmailNotifications,
  ]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
