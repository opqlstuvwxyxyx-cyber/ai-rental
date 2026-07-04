"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useApp();
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="glass-card w-full max-w-md p-10">
        <h1 className="font-display mb-6 text-center text-2xl text-cream">新規登録</h1>
        <form onSubmit={(e) => { e.preventDefault(); const r = register(name, email, password); if (r.ok) router.push("/materials"); else setError(r.error ?? "エラー"); }} className="space-y-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="お名前" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="email@example.com" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="8文字以上" minLength={8} required />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button type="submit" className="btn-primary w-full">登録する</button>
        </form>
        <p className="mt-6 text-center text-sm text-muted"><Link href="/auth/login" className="text-gold">ログイン</Link></p>
      </div>
    </div>
  );
}
