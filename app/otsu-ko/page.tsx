import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout'

export const metadata = {
  title: '乙子 | びわ湖の旅',
  description: '乙子についてのページです。',
}

export default function OtsuKoPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">乙子</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>乙子について</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                乙子についての詳細な説明がここに入ります。歴史的な背景や特徴などを記載してください。
              </p>
              <p className="text-muted-foreground">
                プレースホルダーテキスト：このコンテンツは将来的にCMSから動的に取得することができます。
              </p>
            </CardContent>
          </Card>

          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
            画像プレースホルダー
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">詳細情報</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">特徴1</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  特徴についての説明テキストが入ります。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">特徴2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  特徴についての説明テキストが入ります。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">特徴3</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  特徴についての説明テキストが入ります。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}
