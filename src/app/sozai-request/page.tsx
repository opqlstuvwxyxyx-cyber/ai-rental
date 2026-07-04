"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Link from "next/link";

export default function SozaiRequestPage() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="surface-card-gold mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <Send size={24} className="text-gold" />
        </div>
        <h1 className="font-display mb-3 text-2xl text-cream">リクエストを受け付けました</h1>
        <p className="mb-8 text-sm text-muted">
          ご要望を確認次第、素材ライブラリへの追加を検討します。通常3営業日以内にご連絡します。
        </p>
        <Link href="/materials" className="btn-primary">素材一覧へ</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="page-header">
        <p className="label-caps mb-1">Request</p>
        <h1 className="page-title">素材リクエスト</h1>
        <p className="page-subtitle">欲しい素材のイメージをお聞かせください</p>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); setDone(true); }}
        className="glass-card space-y-5 p-8"
      >
        <div>
          <label htmlFor="request" className="mb-1.5 block text-xs text-muted">リクエスト内容</label>
          <textarea id="request" rows={5} className="input-field resize-none" placeholder="例: 20代女性がスキンケアをしている縦型動画。自然光、清潔感のあるトーン" required />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs text-muted">返信先メールアドレス</label>
          <input id="email" type="email" className="input-field" placeholder="email@example.com" autoComplete="email" required />
        </div>
        <button type="submit" className="btn-primary w-full"><Send size={15} />送信する</button>
      </form>
    </div>
  );
}
