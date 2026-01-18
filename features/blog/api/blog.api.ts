import type { BlogPost } from '@/types'
import type { BlogFormData } from '../types'

// プレースホルダー: 将来Supabaseに置き換え予定
const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'サンプル記事1',
    content: 'これはサンプルの記事内容です。将来的にはSupabaseから取得されます。',
    excerpt: 'これはサンプルの記事です。',
    featuredImage: '/placeholder.jpg',
    sliderImages: [],
    categories: ['お知らせ'],
    status: 'published',
    authorId: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'サンプル記事2',
    content: '2つ目のサンプル記事です。複数のカテゴリを持つことができます。',
    excerpt: '2つ目のサンプル記事です。',
    featuredImage: '/placeholder.jpg',
    sliderImages: [],
    categories: ['イベント', 'お知らせ'],
    status: 'published',
    authorId: '1',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
]

export async function getBlogPosts(): Promise<BlogPost[]> {
  // プレースホルダー: Supabase連携時に置き換え
  await new Promise((resolve) => setTimeout(resolve, 100))
  return MOCK_POSTS
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  // プレースホルダー: Supabase連携時に置き換え
  await new Promise((resolve) => setTimeout(resolve, 100))
  return MOCK_POSTS.find((post) => post.id === id) || null
}

export async function createBlogPost(data: BlogFormData): Promise<BlogPost> {
  // プレースホルダー: Supabase連携時に置き換え
  await new Promise((resolve) => setTimeout(resolve, 300))
  const newPost: BlogPost = {
    id: Date.now().toString(),
    ...data,
    authorId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  console.log('[v0] Created blog post:', newPost)
  return newPost
}

export async function updateBlogPost(id: string, data: Partial<BlogFormData>): Promise<BlogPost> {
  // プレースホルダー: Supabase連携時に置き換え
  await new Promise((resolve) => setTimeout(resolve, 300))
  const existing = MOCK_POSTS.find((post) => post.id === id)
  if (!existing) {
    throw new Error('記事が見つかりません')
  }
  const updated: BlogPost = {
    ...existing,
    ...data,
    updatedAt: new Date(),
  }
  console.log('[v0] Updated blog post:', updated)
  return updated
}

export async function deleteBlogPost(id: string): Promise<void> {
  // プレースホルダー: Supabase連携時に置き換え
  await new Promise((resolve) => setTimeout(resolve, 300))
  console.log('[v0] Deleted blog post:', id)
}
