import { notFound } from 'next/navigation'
import { LogForm, getLog, getLogs } from '@/features/log'

interface EditLogPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const logs = await getLogs()
  return logs.map((log) => ({ id: log.id }))
}

export default async function EditLogPage({ params }: EditLogPageProps) {
  const { id } = await params
  const log = await getLog(id)

  if (!log) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">ログを編集</h1>
      <LogForm log={log} isEditing />
    </div>
  )
}
