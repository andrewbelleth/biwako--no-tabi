import { notFound } from 'next/navigation'
import { BlogForm, getBlogPost, getBlogPosts } from '@/features/blog'

interface EditBlogPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ id: post.id }))
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params
  const post = await getBlogPost(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">ブログ記事を編集</h1>
      <BlogForm post={post} isEditing />
    </div>
  )
}
