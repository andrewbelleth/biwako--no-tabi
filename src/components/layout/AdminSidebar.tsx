'use client'

import React from "react"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth'
import { adminNavItems, siteConfig } from '@/config/navigation'
import { Home, FileText, Newspaper, Bell, LogOut } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  '/admin': <Home className="h-4 w-4" />,
  '/admin/log': <FileText className="h-4 w-4" />,
  '/admin/blog/new': <Newspaper className="h-4 w-4" />,
  '/admin/information/new': <Bell className="h-4 w-4" />,
}

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  const handleLogout = async () => {
    await logout()
    window.location.href = '/admin/login'
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/admin" className="font-bold">
          {siteConfig.name} 管理画面
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href.replace('/new', '')))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {iconMap[item.href]}
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        {user && (
          <p className="mb-2 text-sm text-muted-foreground truncate">
            {user.email}
          </p>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          ログアウト
        </Button>
      </div>
    </aside>
  )
}
