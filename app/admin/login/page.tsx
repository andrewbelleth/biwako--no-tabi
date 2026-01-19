import { login } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const params = await searchParams
  const error = params.error
  const message = params.message

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">管理者ログイン</CardTitle>
          <CardDescription>
            メールアドレスとパスワードを入力してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error === 'invalid' && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
              メールアドレスまたはパスワードが正しくありません
            </div>
          )}
          {error === 'auth' && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
              認証に失敗しました。もう一度お試しください
            </div>
          )}
          {message === 'check-email' && (
            <div className="mb-4 p-3 rounded-md bg-green-100 text-green-800 text-sm">
              確認メールを送信しました。メールをご確認ください
            </div>
          )}
          <form action={login} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              ログイン
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
