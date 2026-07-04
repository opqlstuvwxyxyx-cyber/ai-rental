const USERS_KEY = "ai-rental-users";
const SITE_UNLOCK_KEY = "ai-rental-site-unlocked";

/** サイト閲覧用パスワード（ローカルデモ） */
export const SITE_PASSWORD = "airental2026";

/** デモ用ログインアカウント */
export const DEMO_EMAIL = "demo@airental.jp";
export const DEMO_PASSWORD = "demo1234";

interface StoredUser {
  email: string;
  password: string;
  name: string;
}

function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function isSiteUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SITE_UNLOCK_KEY) === "true";
}

export function unlockSite(password: string): boolean {
  if (password !== SITE_PASSWORD) return false;
  sessionStorage.setItem(SITE_UNLOCK_KEY, "true");
  return true;
}

export function validateLogin(email: string, password: string): boolean {
  const normalized = email.trim().toLowerCase();
  const user = getUsers().find((u) => u.email === normalized);
  if (user) return user.password === password;
  return normalized === DEMO_EMAIL && password === DEMO_PASSWORD;
}

export function registerUser(
  name: string,
  email: string,
  password: string
): { ok: boolean; error?: string } {
  if (password.length < 8) {
    return { ok: false, error: "パスワードは8文字以上で設定してください" };
  }
  const normalized = email.trim().toLowerCase();
  const users = getUsers();
  if (users.some((u) => u.email === normalized)) {
    return { ok: false, error: "このメールアドレスは既に登録されています" };
  }
  users.push({ email: normalized, password, name: name.trim() });
  saveUsers(users);
  return { ok: true };
}
