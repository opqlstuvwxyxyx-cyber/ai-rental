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
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="glass-card w-full max-w-md p-8 sm:p-10">
        <div className="mb-8 text-center">
          <p className="label-caps mb-2">Welcome back</p>
          <h1 className="font-display text-2xl text-cream">ログイン</h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const r = login(email, password);
            if (r.ok) router.push("/materials");
            else setError(r.error ?? "ログインに失敗しました");
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs text-muted">メールアドレス</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" autoComplete="email" required />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs text-muted">パスワード</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" autoComplete="current-password" required />
          </div>
          {error && <p className="text-xs text-red-400" role="alert">{error}</p>}
          <button type="submit" className="btn-primary w-full">ログイン</button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          アカウントをお持ちでない方は <Link href="/auth/register" className="text-gold hover:underline">新規登録</Link>
        </p>
      </div>
    </div>
  );
}
