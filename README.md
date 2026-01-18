# びわ湖の旅 (Biwako no Tabi)

Next.js + Supabaseを使用した旅行情報サイト

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成し、以下の内容を追加してください：

```env
# Supabase設定
# ローカル開発環境の場合
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# 本番環境の場合、以下のコメントを外して値を設定してください
# NEXT_PUBLIC_SUPABASE_URL=your-project-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Supabaseの起動

ローカル開発環境でSupabaseを起動します：

```bash
supabase start
```

初回起動時は時間がかかることがあります。起動が完了すると、以下の情報が表示されます：
- API URL: `http://127.0.0.1:54321`
- Studio URL: `http://127.0.0.1:54323`

### 4. データベースマイグレーションの実行

マイグレーションファイルを適用して、データベーススキーマを作成します：

```bash
supabase db reset
```

または、マイグレーションのみを実行する場合：

```bash
supabase migration up
```

### 5. 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

## Supabaseの使用方法

### Supabase Studio

ローカル開発環境では、Supabase Studioにアクセスしてデータベースを管理できます：

```bash
# Studio URL（Supabase起動時に表示されます）
http://127.0.0.1:54323
```

### 初回ユーザーの作成

1. Supabase Studioで「Authentication」→「Users」を開く
2. 「Add user」をクリック
3. メールアドレスとパスワードを設定
4. 必要に応じて「Metadata」で `role: admin` を設定

または、Supabase CLIを使用：

```bash
supabase auth users create --email admin@example.com --password your-password
```

## プロジェクト構成

- `src/lib/supabase/` - Supabaseクライアント設定
- `src/features/auth/` - 認証機能
- `src/features/blog/` - ブログ機能
- `src/features/information/` - お知らせ機能
- `src/features/log/` - ログ機能
- `supabase/migrations/` - データベースマイグレーションファイル

## 技術スタック

- Next.js 16
- React 19
- TypeScript
- Supabase (認証・データベース)
- Tailwind CSS