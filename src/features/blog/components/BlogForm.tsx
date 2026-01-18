'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { BlogPost } from '@/types'
import type { BlogFormData } from '../types'
import { createBlogPost, updateBlogPost } from '../api/blog.api'

interface BlogFormProps {
  post?: BlogPost
  isEditing?: boolean
}

const CATEGORIES = ['お知らせ', 'イベント', 'コラム', 'その他']

export function BlogForm({ post, isEditing = false }: BlogFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BlogFormData>({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    featuredImage: post?.featuredImage || '',
    sliderImages: post?.sliderImages || [],
    categories: post?.categories || [],
    status: post?.status || 'draft',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (isEditing && post) {
        await updateBlogPost(post.id, formData)
      } else {
        await createBlogPost(formData)
      }
      router.push('/admin')
      router.refresh()
    } catch (error) {
      console.error('[v0] Error saving blog post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? '記事を編集' : '新規記事作成'}</CardTitle>
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
            <Label htmlFor="excerpt">抜粋</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">本文</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              rows={10}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>カテゴリ</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  type="button"
                  variant={formData.categories.includes(category) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featuredImage">アイキャッチ画像URL</Label>
            <Input
              id="featuredImage"
              type="url"
              value={formData.featuredImage}
              onChange={(e) => setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-muted-foreground">
              プレースホルダー: 将来は画像アップロード機能に置き換え予定
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sliderImages">スライダー画像URL（カンマ区切り）</Label>
            <Textarea
              id="sliderImages"
              value={formData.sliderImages.join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sliderImages: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                }))
              }
              rows={2}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
            <p className="text-xs text-muted-foreground">
              プレースホルダー: 将来は複数画像アップロード機能に置き換え予定
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">ステータス</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'draft' | 'published') =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">下書き</SelectItem>
                <SelectItem value="published">公開</SelectItem>
              </SelectContent>
            </Select>
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
