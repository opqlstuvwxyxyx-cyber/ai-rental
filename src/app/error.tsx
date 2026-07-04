"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="label-caps mb-3">Error</p>
      <h1 className="font-display mb-4 text-3xl text-cream">問題が発生しました</h1>
      <p className="mb-8 max-w-md text-sm text-muted">
        一時的なエラーの可能性があります。もう一度お試しください。
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">再試行</button>
        <Link href="/" className="btn-ghost">トップへ戻る</Link>
      </div>
    </div>
  );
}
