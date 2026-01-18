// アプリケーション全体で使用される共有型定義

export interface User {
  id: string
  email: string
  name?: string
  role: 'admin' | 'user'
  createdAt: Date
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt?: string
  featuredImage?: string
  sliderImages: string[]
  categories: string[]
  status: 'draft' | 'published'
  authorId: string
  createdAt: Date
  updatedAt: Date
}

export interface LogEntry {
  id: string
  title: string
  content: string
  date: Date
  authorId: string
  createdAt: Date
  updatedAt: Date
}

export interface Information {
  id: string
  title: string
  content: string
  status: 'draft' | 'published'
  authorId: string
  createdAt: Date
  updatedAt: Date
}

export interface NavItem {
  label: string
  href: string
}
