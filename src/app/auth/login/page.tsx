"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useApp();
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="glass-card w-full max-w-md p-10">
        <h1 className="font-display mb-2 text-center text-2xl text-cream">ログイン</h1>
        <p className="mb-6 text-center text-xs text-muted">デモ: demo@airental.jp / demo1234</p>
        <form onSubmit={(e) => { e.preventDefault(); const r = login(email, password); if (r.ok) router.push("/materials"); else setError(r.error ?? "エラー"); }} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="email@example.com" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="パスワード" required />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button type="submit" className="btn-primary w-full">ログイン</button>
        </form>
        <p className="mt-6 text-center text-sm text-muted"><Link href="/auth/register" className="text-gold">新規登録</Link></p>
      </div>
    </div>
  );
}
