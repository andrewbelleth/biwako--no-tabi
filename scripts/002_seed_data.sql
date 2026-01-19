-- =============================================
-- 初期データ投入
-- =============================================

-- カテゴリーの初期データ
INSERT INTO categories (name, slug) VALUES
  ('観光スポット', 'sightseeing'),
  ('グルメ', 'gourmet'),
  ('宿泊', 'accommodation'),
  ('イベント', 'event'),
  ('歴史・文化', 'history-culture'),
  ('アクティビティ', 'activity')
ON CONFLICT (slug) DO NOTHING;

-- サンプルブログ記事
INSERT INTO blog_posts (title, slug, content, excerpt, status, published_at) VALUES
  (
    'びわ湖の絶景スポット10選',
    'biwako-scenic-spots-10',
    'びわ湖周辺には数多くの絶景スポットがあります。今回は特におすすめの10箇所をご紹介します。

## 1. びわ湖バレイ
標高1,100mからの眺望は圧巻です。

## 2. 白髭神社
湖中に立つ大鳥居が神秘的です。

## 3. メタセコイア並木
四季折々の美しさを見せる並木道です。',
    'びわ湖周辺には数多くの絶景スポットがあります。今回は特におすすめの10箇所をご紹介します。',
    'published',
    NOW()
  ),
  (
    '近江牛を堪能できる名店ガイド',
    'omi-beef-restaurant-guide',
    '日本三大和牛のひとつ、近江牛。びわ湖周辺で近江牛を楽しめるおすすめのお店をご紹介します。

## 老舗の味を楽しむ
歴史ある名店で伝統の味を。

## カジュアルに楽しむ
気軽に近江牛を楽しめるお店も。',
    '日本三大和牛のひとつ、近江牛を楽しめるおすすめのお店をご紹介します。',
    'published',
    NOW() - INTERVAL '1 day'
  )
ON CONFLICT (slug) DO NOTHING;

-- サンプルお知らせ
INSERT INTO information (title, content, status, published_at) VALUES
  (
    'ウェブサイトをリニューアルしました',
    'この度、びわ湖の旅ウェブサイトをリニューアルいたしました。より使いやすく、より多くの情報をお届けできるよう努めてまいります。',
    'published',
    NOW()
  ),
  (
    '年末年始の営業について',
    '年末年始期間中の観光施設の営業時間につきましては、各施設にお問い合わせください。',
    'published',
    NOW() - INTERVAL '2 days'
  )
ON CONFLICT DO NOTHING;

-- サンプルログ
INSERT INTO logs (title, content, log_date) VALUES
  (
    'びわ湖一周サイクリング',
    '天気も良く、絶好のサイクリング日和でした。湖岸の風景を楽しみながら、約200kmを走破しました。',
    CURRENT_DATE - INTERVAL '3 days'
  ),
  (
    '竹生島観光',
    'フェリーで竹生島へ。宝厳寺と都久夫須麻神社を参拝しました。',
    CURRENT_DATE - INTERVAL '7 days'
  )
ON CONFLICT DO NOTHING;
