import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: '概要 | サイト名',
  description: 'サイトについての概要説明ページです。',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">概要</h1>
      
      <div className="prose prose-neutral max-w-none">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>このサイトについて</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              このサイトの詳細な説明がここに入ります。サイトの目的、運営者情報、歴史などを記載してください。
            </p>
            <p className="text-muted-foreground">
              プレースホルダーテキスト：将来的にはCMSやデータベースから動的にコンテンツを取得することができます。
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>運営情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <dl className="grid gap-4">
              <div>
                <dt className="font-medium">運営者</dt>
                <dd className="text-muted-foreground">運営者名</dd>
              </div>
              <div>
                <dt className="font-medium">所在地</dt>
                <dd className="text-muted-foreground">〒000-0000 東京都...</dd>
              </div>
              <div>
                <dt className="font-medium">連絡先</dt>
                <dd className="text-muted-foreground">contact@example.com</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
