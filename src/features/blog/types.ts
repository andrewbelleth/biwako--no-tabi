import type { BlogPost } from '@/types'

export interface BlogFormData {
  title: string
  content: string
  excerpt?: string
  featuredImage?: string
  sliderImages: string[]
  categories: string[]
  status: 'draft' | 'published'
}

export interface BlogListProps {
  posts: BlogPost[]
}

export interface BlogCardProps {
  post: BlogPost
}
