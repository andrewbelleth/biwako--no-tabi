import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogList, getLogs } from '@/features/log'
import { Plus } from 'lucide-react'

export default async function AdminLogPage() {
  const logs = await getLogs()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ログ管理</h1>
          <p className="text-muted-foreground mt-2">活動ログの作成・編集</p>
        </div>
        <Button asChild>
          <Link href="/admin/log/new">
            <Plus className="mr-2 h-4 w-4" />
            新規作成
          </Link>
        </Button>
      </div>

      <LogList logs={logs} />
    </div>
  )
}
