import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { getBlogPost, getBlogPosts } from '@/features/blog'

interface BlogDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ id: post.id }))
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { id } = await params
  const post = await getBlogPost(id)
  if (!post) {
    return { title: '記事が見つかりません' }
  }
  return {
    title: `${post.title} | サイト名`,
    description: post.excerpt || post.content.slice(0, 160),
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params
  const post = await getBlogPost(id)

  if (!post) {
    notFound()
  }

  const formattedDate = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.createdAt))

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ブログ一覧へ戻る
          </Link>
        </Button>
      </div>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{post.title}</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </header>

        {post.featuredImage && (
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted mb-8">
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              アイキャッチ画像プレースホルダー
            </div>
          </div>
        )}

        <div className="prose prose-neutral max-w-none">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>

        {post.sliderImages.length > 0 && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">ギャラリー</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {post.sliderImages.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm"
                  >
                    スライダー画像 {index + 1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </article>
    </div>
  )
}
