-- ユーザープロファイル拡張テーブル
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS (Row Level Security) を有効化
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- プロファイルのポリシー
CREATE POLICY "プロファイルは本人と管理者が閲覧可能"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "プロファイルは本人と管理者が更新可能"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- ブログ投稿テーブル
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  slider_images JSONB DEFAULT '[]'::jsonb,
  categories JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLSを有効化
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- ブログ投稿のポリシー
CREATE POLICY "公開されたブログ投稿は全員が閲覧可能"
  ON public.blog_posts FOR SELECT
  USING (status = 'published' OR author_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "管理者と投稿者がブログ投稿を作成可能"
  ON public.blog_posts FOR INSERT
  WITH CHECK (
    author_id = auth.uid() AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'user')
    )
  );

CREATE POLICY "管理者と投稿者がブログ投稿を更新可能"
  ON public.blog_posts FOR UPDATE
  USING (
    author_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "管理者と投稿者がブログ投稿を削除可能"
  ON public.blog_posts FOR DELETE
  USING (
    author_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 情報テーブル
CREATE TABLE IF NOT EXISTS public.information (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLSを有効化
ALTER TABLE public.information ENABLE ROW LEVEL SECURITY;

-- 情報のポリシー
CREATE POLICY "公開された情報は全員が閲覧可能"
  ON public.information FOR SELECT
  USING (status = 'published' OR author_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "管理者と投稿者が情報を作成可能"
  ON public.information FOR INSERT
  WITH CHECK (
    author_id = auth.uid() AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'user')
    )
  );

CREATE POLICY "管理者と投稿者が情報を更新可能"
  ON public.information FOR UPDATE
  USING (
    author_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "管理者と投稿者が情報を削除可能"
  ON public.information FOR DELETE
  USING (
    author_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ログエントリテーブル
CREATE TABLE IF NOT EXISTS public.log_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLSを有効化
ALTER TABLE public.log_entries ENABLE ROW LEVEL SECURITY;

-- ログエントリのポリシー
CREATE POLICY "ログエントリは投稿者と管理者が閲覧可能"
  ON public.log_entries FOR SELECT
  USING (
    author_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "管理者と投稿者がログエントリを作成可能"
  ON public.log_entries FOR INSERT
  WITH CHECK (
    author_id = auth.uid() AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'user')
    )
  );

CREATE POLICY "管理者と投稿者がログエントリを更新可能"
  ON public.log_entries FOR UPDATE
  USING (
    author_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "管理者と投稿者がログエントリを削除可能"
  ON public.log_entries FOR DELETE
  USING (
    author_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- updated_atを自動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_atトリガーを各テーブルに追加
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_information_updated_at BEFORE UPDATE ON public.information
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_log_entries_updated_at BEFORE UPDATE ON public.log_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 新規ユーザー作成時にプロファイルを作成する関数
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 新規ユーザー作成時にトリガーを発火
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
