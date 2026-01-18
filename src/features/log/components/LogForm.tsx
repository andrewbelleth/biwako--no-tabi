'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { LogEntry } from '@/types'
import type { LogFormData } from '../types'
import { createLog, updateLog } from '../api/log.api'

interface LogFormProps {
  log?: LogEntry
  isEditing?: boolean
}

export function LogForm({ log, isEditing = false }: LogFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<LogFormData>({
    title: log?.title || '',
    content: log?.content || '',
    date: log?.date || new Date(),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (isEditing && log) {
        await updateLog(log.id, formData)
      } else {
        await createLog(formData)
      }
      router.push('/admin/log')
      router.refresh()
    } catch (error) {
      console.error('[v0] Error saving log:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'ログを編集' : '新規ログ作成'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">日付</Label>
            <Input
              id="date"
              type="date"
              value={formData.date instanceof Date ? formData.date.toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: new Date(e.target.value) }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">内容</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              rows={8}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : isEditing ? '更新する' : '作成する'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              キャンセル
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
