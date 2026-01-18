import type { NavItem } from '@/types'

export const mainNavItems: NavItem[] = [
  { label: 'ホーム', href: '/' },
  { label: '乙子', href: '/otsu-ko' },
  { label: '明治モダン', href: '/meiji-modan' },
  { label: 'ブログ', href: '/blog' },
  { label: 'お知らせ', href: '/information' },
  { label: '概要', href: '/about' },
]

export const adminNavItems: NavItem[] = [
  { label: 'ダッシュボード', href: '/admin' },
  { label: 'ログ管理', href: '/admin/log' },
  { label: 'ブログ管理', href: '/admin/blog/new' },
  { label: 'お知らせ管理', href: '/admin/information/new' },
]

export const siteConfig = {
  name: 'サイト名',
  description: 'サイトの説明文がここに入ります',
}
