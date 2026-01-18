import { BlogList, getBlogPosts } from '@/features/blog'

export const metadata = {
  title: 'ブログ | サイト名',
  description: 'ブログ記事一覧ページです。',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const publishedPosts = posts.filter((post) => post.status === 'published')

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">ブログ</h1>
      <BlogList posts={publishedPosts} />
    </div>
  )
}
