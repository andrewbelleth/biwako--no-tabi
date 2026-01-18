import { LogForm } from '@/features/log'

export default function NewLogPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">新規ログ作成</h1>
      <LogForm />
    </div>
  )
}
