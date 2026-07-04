import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="label-caps mb-3">404</p>
      <h1 className="font-display mb-4 text-4xl text-cream">ページが見つかりません</h1>
      <p className="mb-8 max-w-md text-sm text-muted">
        お探しのページは移動または削除された可能性があります。
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">トップへ戻る</Link>
        <Link href="/materials" className="btn-ghost">素材一覧</Link>
      </div>
    </div>
  );
}
