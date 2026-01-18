import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { BlogCardProps } from '../types'

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.createdAt))

  return (
    <Link href={`/blog/${post.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        {post.featuredImage && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
              画像プレースホルダー
            </div>
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex flex-wrap gap-1 mb-2">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {post.excerpt}
            </p>
          )}
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
