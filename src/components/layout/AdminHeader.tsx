'use client'

import Link from 'next/link'
import { useAuth } from '@/features/auth'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export function AdminHeader() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b border-border bg-background px-6">
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            ようこそ、<span className="font-medium text-foreground">{user?.name || user?.email}</span> さん
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              サイトを表示
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
