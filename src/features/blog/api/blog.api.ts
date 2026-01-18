import { createClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/types'
import type { BlogFormData } from '../types'

function mapToBlogPost(row: any): BlogPost {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    excerpt: row.excerpt || undefined,
    featuredImage: row.featured_image || undefined,
    sliderImages: Array.isArray(row.slider_images) ? row.slider_images : [],
    categories: Array.isArray(row.categories) ? row.categories : [],
    status: row.status,
    authorId: row.author_id,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('ブログ投稿取得エラー:', error)
    throw new Error('ブログ投稿の取得に失敗しました')
  }

  return (data || []).map(mapToBlogPost)
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error('ブログ投稿取得エラー:', error)
    throw new Error('ブログ投稿の取得に失敗しました')
  }

  return data ? mapToBlogPost(data) : null
}

export async function createBlogPost(data: BlogFormData): Promise<BlogPost> {
  const supabase = await createClient()
  
  // 現在のユーザーを取得
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('認証が必要です')
  }

  const { data: newPost, error } = await supabase
    .from('blog_posts')
    .insert({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || null,
      featured_image: data.featuredImage || null,
      slider_images: data.sliderImages || [],
      categories: data.categories || [],
      status: data.status,
      author_id: user.id,
    })
    .select()
    .single()

  if (error) {
    console.error('ブログ投稿作成エラー:', error)
    throw new Error('ブログ投稿の作成に失敗しました')
  }

  return mapToBlogPost(newPost)
}

export async function updateBlogPost(id: string, data: Partial<BlogFormData>): Promise<BlogPost> {
  const supabase = await createClient()
  
  const updateData: any = {}
  if (data.title !== undefined) updateData.title = data.title
  if (data.content !== undefined) updateData.content = data.content
  if (data.excerpt !== undefined) updateData.excerpt = data.excerpt || null
  if (data.featuredImage !== undefined) updateData.featured_image = data.featuredImage || null
  if (data.sliderImages !== undefined) updateData.slider_images = data.sliderImages
  if (data.categories !== undefined) updateData.categories = data.categories
  if (data.status !== undefined) updateData.status = data.status

  const { data: updatedPost, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      throw new Error('記事が見つかりません')
    }
    console.error('ブログ投稿更新エラー:', error)
    throw new Error('ブログ投稿の更新に失敗しました')
  }

  return mapToBlogPost(updatedPost)
}

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('ブログ投稿削除エラー:', error)
    throw new Error('ブログ投稿の削除に失敗しました')
  }
}
