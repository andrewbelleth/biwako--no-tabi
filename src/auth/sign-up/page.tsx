import { notFound } from "next/navigation";
import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  // ローカル環境（development）の場合のみ新規登録画面を表示
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
