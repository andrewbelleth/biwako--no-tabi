import { BlogForm } from '@/features/blog'

export default function NewBlogPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">新規ブログ記事作成</h1>
      <BlogForm />
    </div>
  )
}
