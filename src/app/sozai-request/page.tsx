"use client";

import { useState } from "react";

export default function SozaiRequestPage() {
  const [done, setDone] = useState(false);
  if (done) return <div className="mx-auto max-w-2xl px-4 py-20 text-center text-gold">送信しました（ローカルデモのため実際には送信されません）</div>;
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="page-title mb-6">素材リクエスト</h1>
      <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="glass-card space-y-4 p-8">
        <textarea rows={5} className="input-field resize-none" placeholder="欲しい素材のイメージ..." required />
        <input type="email" className="input-field" placeholder="email@example.com" required />
        <button type="submit" className="btn-primary w-full">送信する</button>
      </form>
    </div>
  );
}
