"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      console.log('ログイン成功:', data.user?.id, data.user?.email);

      // ログイン後にユーザーロールを確認・作成
      if (data.user) {
        try {
          // APIエンドポイント経由でユーザーロールを確認
          const response = await fetch(`/api/get-user-role?userId=${data.user.id}`);
          const roleResult = await response.json();

          if (roleResult.success && !roleResult.role) {
            // ユーザーロールが存在しない場合は作成
            console.log('ユーザーロールを作成中...');

            const createResponse = await fetch('/api/setup-user-role', {
              method: 'POST',
              credentials: 'include'
            });

            const createResult = await createResponse.json();

            if (createResult.success) {
              console.log('ユーザーロール作成成功:', createResult.data);
            } else {
              console.error('ユーザーロール作成エラー:', createResult.error);
            }
          } else if (roleResult.success && roleResult.role) {
            console.log('既存のユーザーロール:', roleResult.role);
          } else {
            console.error('ユーザーロール確認エラー:', roleResult.error);
          }
        } catch (roleSetupError) {
          console.error('ユーザーロールセットアップエラー:', roleSetupError);
        }
      }

      // ログイン後は公開サイトにリダイレクト
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">ログイン</CardTitle>
          <CardDescription>
            メールアドレスを入力してログインしてください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">パスワード</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    パスワードをお忘れですか？
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "ログイン中..." : "ログイン"}
              </Button>
            </div>
            {/* <div className="mt-4 text-center text-sm">
              アカウントをお持ちでない方は{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                新規登録
              </Link>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
