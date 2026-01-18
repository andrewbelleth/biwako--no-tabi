import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getBlogPosts } from '@/features/blog'
import { getInformationList } from '@/features/information'

export default async function HomePage() {
  const posts = await getBlogPosts()
  const information = await getInformationList()
  
  const recentPosts = posts.slice(0, 3)
  const recentInfo = information.filter(i => i.status === 'published').slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center py-16 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-balance">
          ようこそ
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          このサイトの説明文がここに入ります。サイトの目的や特徴を簡潔に説明してください。
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/about">詳しく見る</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">ブログを読む</Link>
          </Button>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">お知らせ</h2>
          <Link href="/information" className="text-sm text-muted-foreground hover:text-foreground">
            すべて見る
          </Link>
        </div>
        <div className="space-y-4">
          {recentInfo.map((item) => {
            const formattedDate = new Intl.DateTimeFormat('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(item.createdAt))

            return (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{formattedDate}</span>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">最新のブログ</h2>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            すべて見る
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recentPosts.map((post) => {
            const formattedDate = new Intl.DateTimeFormat('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(post.createdAt))

            return (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
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
          })}
        </div>
      </section>

      {/* Links Section */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">コンテンツ</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/otsu-ko">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle>乙子</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  乙子についての説明文がここに入ります。
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/meiji-modan">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle>明治モダン</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  明治モダンについての説明文がここに入ります。
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  )
}
