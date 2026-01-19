import { BlogList, getBlogPosts } from '@/features/blog'
import { PublicLayout } from '@/components/layout'

export const metadata = {
  title: 'ブログ | びわ湖の旅',
  description: 'びわ湖周辺の観光情報やおすすめスポットを紹介するブログです。',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const publishedPosts = posts.filter((post) => post.status === 'published')

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">ブログ</h1>
        <BlogList posts={publishedPosts} />
      </div>
    </PublicLayout>
  )
}
