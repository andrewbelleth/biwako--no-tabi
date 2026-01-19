import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout'

export const metadata = {
  title: '明治モダン | びわ湖の旅',
  description: '明治時代のモダンな文化と建築についてのページです。',
}

export default function MeijiModanPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">明治モダン</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
            画像プレースホルダー
          </div>

          <Card>
            <CardHeader>
              <CardTitle>明治モダンについて</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                明治モダンについての詳細な説明がここに入ります。時代背景や文化的な特徴などを記載してください。
              </p>
              <p className="text-muted-foreground">
                プレースホルダーテキスト：このコンテンツは将来的にCMSから動的に取得することができます。
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">歴史と特徴</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-muted-foreground">
                明治時代の文化や建築様式についての詳細な説明がここに入ります。
                和洋折衷のデザインや、当時の社会的背景などを解説するコンテンツを追加してください。
              </p>
              <p className="text-muted-foreground">
                このセクションでは、写真ギャラリーや年表などを追加することも可能です。
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">ギャラリー</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm"
              >
                画像 {i}
              </div>
            ))}
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}
