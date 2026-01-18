import type { LogEntry } from '@/types'
import type { LogFormData } from '../types'

// プレースホルダー: 将来Supabaseに置き換え予定
const MOCK_LOGS: LogEntry[] = [
  {
    id: '1',
    title: '活動ログ1',
    content: '本日の活動内容です。',
    date: new Date('2024-01-15'),
    authorId: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: '活動ログ2',
    content: '2回目の活動内容です。',
    date: new Date('2024-01-20'),
    authorId: '1',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
]

export async function getLogs(): Promise<LogEntry[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return MOCK_LOGS
}

export async function getLog(id: string): Promise<LogEntry | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return MOCK_LOGS.find((log) => log.id === id) || null
}

export async function createLog(data: LogFormData): Promise<LogEntry> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const newLog: LogEntry = {
    id: Date.now().toString(),
    ...data,
    authorId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  console.log('[v0] Created log:', newLog)
  return newLog
}

export async function updateLog(id: string, data: Partial<LogFormData>): Promise<LogEntry> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const existing = MOCK_LOGS.find((log) => log.id === id)
  if (!existing) {
    throw new Error('ログが見つかりません')
  }
  const updated: LogEntry = {
    ...existing,
    ...data,
    updatedAt: new Date(),
  }
  console.log('[v0] Updated log:', updated)
  return updated
}

export async function deleteLog(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  console.log('[v0] Deleted log:', id)
}
