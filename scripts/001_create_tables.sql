-- =============================================
-- びわ湖の旅 データベーススキーマ
-- =============================================

-- カテゴリーテーブル
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ブログ記事テーブル
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  featured_image VARCHAR(500),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ブログ記事のスライダー画像テーブル
CREATE TABLE IF NOT EXISTS blog_post_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- お知らせテーブル
CREATE TABLE IF NOT EXISTS information (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ログ（活動記録）テーブル
CREATE TABLE IF NOT EXISTS logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  log_date DATE NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- インデックス
-- =============================================

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

CREATE INDEX IF NOT EXISTS idx_information_status ON information(status);
CREATE INDEX IF NOT EXISTS idx_information_published_at ON information(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_logs_log_date ON logs(log_date DESC);

CREATE INDEX IF NOT EXISTS idx_blog_post_images_blog_post_id ON blog_post_images(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_images_sort_order ON blog_post_images(blog_post_id, sort_order);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Blog Posts RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 公開記事は誰でも閲覧可能
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT
  USING (status = 'published');

-- 認証済みユーザーはすべての記事を閲覧可能
CREATE POLICY "Authenticated users can view all blog posts" ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- 認証済みユーザーは記事を作成可能
CREATE POLICY "Authenticated users can insert blog posts" ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 認証済みユーザーは記事を更新可能
CREATE POLICY "Authenticated users can update blog posts" ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true);

-- 認証済みユーザーは記事を削除可能
CREATE POLICY "Authenticated users can delete blog posts" ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Blog Post Images RLS
ALTER TABLE blog_post_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog post images are viewable by everyone" ON blog_post_images
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage blog post images" ON blog_post_images
  FOR ALL
  TO authenticated
  USING (true);

-- Information RLS
ALTER TABLE information ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published information is viewable by everyone" ON information
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can view all information" ON information
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage information" ON information
  FOR ALL
  TO authenticated
  USING (true);

-- Logs RLS
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Logs are viewable by everyone" ON logs
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage logs" ON logs
  FOR ALL
  TO authenticated
  USING (true);

-- Categories RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage categories" ON categories
  FOR ALL
  TO authenticated
  USING (true);

-- =============================================
-- 更新日時自動更新トリガー
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_information_updated_at
  BEFORE UPDATE ON information
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_logs_updated_at
  BEFORE UPDATE ON logs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
