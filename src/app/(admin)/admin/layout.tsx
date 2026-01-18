'use client'

import React from "react"

import { AuthGuard } from '@/features/auth'
import { AdminSidebar, AdminHeader } from '@/components/layout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
