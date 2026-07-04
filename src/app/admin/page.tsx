"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, Download, Lock, RefreshCw } from "lucide-react";
import { MATERIALS } from "@/lib/mock-data";
import { SITE_PASSWORD } from "@/lib/auth";
import { useToast } from "@/components/Toast";

const ADMIN_KEY = "ai-rental-admin-unlocked";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(ADMIN_KEY) === "true");
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== SITE_PASSWORD) {
      setError("パスワードが正しくありません");
      return;
    }
    sessionStorage.setItem(ADMIN_KEY, "true");
    setUnlocked(true);
    setError("");
  };

  const exportJson = () => {
    const json = JSON.stringify(MATERIALS, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "materials.json";
    a.click();
    URL.revokeObjectURL(url);
    toast("materials.json をダウンロードしました");
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(MATERIALS, null, 2));
    toast("JSONをクリップボードにコピーしました");
  };

  if (!unlocked) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <form onSubmit={handleUnlock} className="glass-card w-full max-w-sm p-8">
          <div className="mb-6 flex items-center gap-3">
            <Lock size={20} className="text-gold" />
            <h1 className="font-display text-xl text-cream">管理画面</h1>
          </div>
          <p className="mb-4 text-sm text-muted">運営者のみアクセスできます</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mb-4"
            placeholder="管理パスワード"
            required
          />
          {error && <p className="mb-4 text-xs text-red-400">{error}</p>}
          <button type="submit" className="btn-primary w-full">ログイン</button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="page-header">
        <p className="label-caps mb-1">Admin</p>
        <h1 className="page-title">運営管理画面</h1>
        <p className="page-subtitle">素材データの確認・エクスポート</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="surface-card p-5 text-center">
          <p className="text-2xl font-semibold text-gold">{MATERIALS.length}</p>
          <p className="text-xs text-muted">登録素材数</p>
        </div>
        <div className="surface-card p-5 text-center">
          <p className="text-2xl font-semibold text-cream">JSON</p>
          <p className="text-xs text-muted">データ形式</p>
        </div>
        <div className="surface-card p-5 text-center">
          <p className="text-2xl font-semibold text-cream">Git Push</p>
          <p className="text-xs text-muted">反映方法</p>
        </div>
      </div>

      <section className="surface-card mb-6 p-6">
        <h2 className="mb-4 font-medium text-cream">素材一覧</h2>
        <div className="max-h-64 space-y-2 overflow-y-auto">
          {MATERIALS.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm">
              <div>
                <span className="text-gold">{m.id}</span>
                <span className="mx-2 text-muted">·</span>
                <span className="text-cream">{m.title}</span>
              </div>
              <span className="text-xs text-muted">{m.category}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-card mb-6 p-6">
        <h2 className="mb-4 font-medium text-cream">データのエクスポート</h2>
        <p className="mb-4 text-sm text-muted">
          編集後は <code className="text-gold">src/data/materials.json</code> に貼り付けて GitHub に push してください。
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={exportJson} className="btn-primary"><Download size={14} />JSONをダウンロード</button>
          <button type="button" onClick={copyJson} className="btn-ghost"><Copy size={14} />クリップボードにコピー</button>
        </div>
      </section>

      <section className="surface-card p-6">
        <h2 className="mb-4 font-medium text-cream">素材の追加手順</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
          <li>動画を <code className="text-gold">public/videos/</code> に配置</li>
          <li>サムネイルを <code className="text-gold">public/videos/thumbs/</code> に配置</li>
          <li><code className="text-gold">src/data/materials.json</code> にエントリを追加</li>
          <li>GitHub に push → Vercel が自動デプロイ</li>
        </ol>
        <Link href="/" className="btn-ghost mt-6 inline-flex"><RefreshCw size={14} />サイトを確認</Link>
      </section>

      <p className="mt-8 text-center text-xs text-muted">
        詳細はリポジトリ内 <code>MAINTENANCE.md</code> を参照
      </p>
    </div>
  );
}
