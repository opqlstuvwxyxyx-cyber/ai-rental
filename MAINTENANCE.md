# AI RENTAL メンテナンスガイド

運営・開発担当者向けの保守手順書です（決済連携前の現行版）。

---

## 1. 公開URL・リポジトリ

| 項目 | 場所 |
|------|------|
| 本番サイト | https://ai-rental-kappa.vercel.app |
| GitHub | https://github.com/opqlstuvwxyxyx-cyber/ai-rental |
| Vercel ダッシュボード | https://vercel.com （プロジェクト: ai-rental） |

---

## 2. メンテナンスの入口（どこから操作するか）

### A. 素材・動画の更新（最も頻繁）

| 操作 | 場所 | 方法 |
|------|------|------|
| 素材データ編集 | `src/data/materials.json` | JSONを編集して Git push |
| 動画ファイル | `public/videos/` | `.mp4` を追加 |
| サムネイル | `public/videos/thumbs/` | `.jpg` を追加 |
| 管理画面（確認用） | `/admin` | パスワード: `airental2026` |

### B. サイト設定・文言

| 内容 | ファイル |
|------|----------|
| 料金プラン | `src/lib/mock-data.ts` → `RENTAL_PLANS` |
| カテゴリ一覧 | `src/lib/mock-data.ts` → `CATEGORIES` |
| デザイン・色 | `src/app/globals.css` |
| ヘッダー・フッター | `src/components/Header.tsx`, `Footer.tsx` |
| 利用規約等 | `src/app/legal/` 配下 |

### C. 認証・デモアカウント

| 内容 | 場所 |
|------|------|
| デモログイン | `demo@airental.jp` / `demo1234`（`src/context/AppContext.tsx`） |
| 管理画面パスワード | `airental2026`（`src/lib/auth.ts` → `SITE_PASSWORD`） |

### D. デプロイ（更新の反映）

```bash
cd "/Users/satoutomohiko/Downloads/AI rental"
git add .
git commit -m "更新内容の説明"
git push
```

→ Vercel が自動で再ビルド・公開（1〜3分）

---

## 3. 素材の追加手順（詳細）

### Step 1: 動画・サムネを配置

```
public/
  videos/
    my-video-01.mp4          ← 動画
    thumbs/
      my-video-01.jpg        ← サムネイル（9:16推奨）
```

### Step 2: materials.json に追記

`src/data/materials.json` にオブジェクトを追加:

```json
{
  "id": "unique-id-001",
  "title": "素材タイトル",
  "description": "説明文",
  "category": "美容・コスメ",
  "tags": ["美容・コスメ", "縦型", "UGC"],
  "duration": 30,
  "videoUrl": "/videos/my-video-01.mp4",
  "thumbnailUrl": "/videos/thumbs/my-video-01.jpg",
  "aspectRatio": "9:16",
  "createdAt": "2026-07-04"
}
```

**カテゴリは次のいずれかのみ:**
`美容・コスメ` / `食品・飲料` / `ファッション` / `ライフスタイル` / `キッズ・ベビー` / `Vlog` / `特殊施設`

### Step 3: push して反映

```bash
git add .
git commit -m "素材を追加: unique-id-001"
git push
```

### 管理画面での確認

1. https://ai-rental-kappa.vercel.app/admin を開く
2. パスワード `airental2026` でログイン
3. 素材一覧の確認・JSONエクスポート

---

## 4. メンテナンス時の懸念点・注意事項

### データ・ユーザー情報

| 懸念 | 詳細 | 対応 |
|------|------|------|
| **ユーザー情報が消える** | ログイン・レンタル状態は各ユーザーのブラウザ（localStorage）に保存。端末・ブラウザを変えると消える | 本番では DB（Supabase等）への移行が必要 |
| **パスワード平文保存** | 登録ユーザーのパスワードが localStorage に平文で保存されている | 本番前にサーバー認証へ移行必須 |
| **デモアカウント** | 誰でも `demo@airental.jp` でログイン可能 | 本番前に無効化または制限を検討 |

### プラン・課金

| 懸念 | 詳細 | 対応 |
|------|------|------|
| **プランが自由に変更できる** | 設定画面からワンクリックでエンタープライズに変更可能 | 決済連携後は Stripe 等で制御 |
| **請求が発生しない** | 料金表示のみ。実際の課金なし | Stripe 連携が必要 |

### 素材・動画

| 懸念 | 詳細 | 対応 |
|------|------|------|
| **動画サイズ** | `public/` の動画はデプロイに含まれる。大量追加でビルド・配信が重くなる | 50本超えたら Cloudflare R2 / S3 へ移行 |
| **著作権** | 掲載動画の利用許諾を運営側で管理する必要あり | 素材ごとに権利情報を内部管理 |
| **JSON編集ミス** | カテゴリ typo や必須項目欠落で素材が非表示になる | push 前に `npm run build` で確認 |

### セキュリティ

| 懸念 | 詳細 | 対応 |
|------|------|------|
| **管理画面パスワード** | `/admin` のパスワードがコード内に記載 | 環境変数 `ADMIN_PASSWORD` への移行を推奨 |
| **管理画面URL** | `/admin` が公開されている | パスワード変更・IP制限の検討 |

### 法的・コンプライアンス

| 懸念 | 詳細 | 対応 |
|------|------|------|
| **利用規約・特商法** | プレースホルダー状態 | 事業者情報・弁護士レビューを実施 |
| **素材リクエスト** | 送信しても実際には届かない（フロントのみ） | フォーム連携（Formspree, Google Forms等）を検討 |

---

## 5. ローカル開発

```bash
cd "/Users/satoutomohiko/Downloads/AI rental"
export PATH="$PWD/.tools/node/bin:$PATH"   # Node未インストール時
npm install
npm run dev:local
```

→ http://localhost:3000

ビルド確認:

```bash
npm run build
```

---

## 6. 決済連携後に必要になるもの（参考）

- [ ] Stripe サブスクリプション連携
- [ ] Supabase / PostgreSQL でユーザー・契約管理
- [ ] プラン変更を決済イベントと同期
- [ ] 動画配信を CDN / オブジェクトストレージへ移行
- [ ] 管理画面の本格 CMS 化

---

## 7. 困ったとき

| 症状 | 確認すること |
|------|-------------|
| サイトが表示されない | Vercel ダッシュボード → Deployments → エラーログ |
| 動画が再生されない | `public/videos/` にファイルがあるか、URLが正しいか |
| 素材が一覧に出ない | `materials.json` の `category` と必須項目を確認 |
| push できない | GitHub トークンの有効期限 |

---

最終更新: 2026-07-04
