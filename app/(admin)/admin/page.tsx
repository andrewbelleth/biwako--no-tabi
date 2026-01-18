import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getBlogPosts } from '@/features/blog'
import { getLogs } from '@/features/log'
import { getInformationList } from '@/features/information'
import { FileText, Newspaper, Bell, Plus } from 'lucide-react'

export default async function AdminDashboardPage() {
  const [posts, logs, information] = await Promise.all([
    getBlogPosts(),
    getLogs(),
    getInformationList(),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <p className="text-muted-foreground mt-2">
          サイトの管理画面へようこそ
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ブログ記事</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
            <p className="text-xs text-muted-foreground">
              公開中: {posts.filter(p => p.status === 'published').length}件
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">活動ログ</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-xs text-muted-foreground">
              登録済みログ数
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">お知らせ</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{information.length}</div>
            <p className="text-xs text-muted-foreground">
              公開中: {information.filter(i => i.status === 'published').length}件
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>クイックアクション</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/admin/blog/new">
                <Plus className="mr-2 h-4 w-4" />
                新規ブログ記事
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/log">
                <Plus className="mr-2 h-4 w-4" />
                新規ログ
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/information/new">
                <Plus className="mr-2 h-4 w-4" />
                新規お知らせ
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Items */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">最近のブログ記事</CardTitle>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">記事がありません</p>
            ) : (
              <ul className="space-y-2">
                {posts.slice(0, 5).map((post) => (
                  <li key={post.id} className="flex items-center justify-between">
                    <span className="text-sm truncate">{post.title}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/blog/${post.id}/edit`}>編集</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">最近のお知らせ</CardTitle>
          </CardHeader>
          <CardContent>
            {information.length === 0 ? (
              <p className="text-sm text-muted-foreground">お知らせがありません</p>
            ) : (
              <ul className="space-y-2">
                {information.slice(0, 5).map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <span className="text-sm truncate">{item.title}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/information/${item.id}/edit`}>編集</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
