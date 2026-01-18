import { createClient } from '@/lib/supabase/server'
import type { LogEntry } from '@/types'
import type { LogFormData } from '../types'

function mapToLogEntry(row: any): LogEntry {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    date: new Date(row.date),
    authorId: row.author_id,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}

export async function getLogs(): Promise<LogEntry[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('log_entries')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    console.error('ログ取得エラー:', error)
    throw new Error('ログの取得に失敗しました')
  }

  return (data || []).map(mapToLogEntry)
}

export async function getLog(id: string): Promise<LogEntry | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('log_entries')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error('ログ取得エラー:', error)
    throw new Error('ログの取得に失敗しました')
  }

  return data ? mapToLogEntry(data) : null
}

export async function createLog(data: LogFormData): Promise<LogEntry> {
  const supabase = await createClient()
  
  // 現在のユーザーを取得
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('認証が必要です')
  }

  const { data: newLog, error } = await supabase
    .from('log_entries')
    .insert({
      title: data.title,
      content: data.content,
      date: data.date.toISOString().split('T')[0], // YYYY-MM-DD形式
      author_id: user.id,
    })
    .select()
    .single()

  if (error) {
    console.error('ログ作成エラー:', error)
    throw new Error('ログの作成に失敗しました')
  }

  return mapToLogEntry(newLog)
}

export async function updateLog(id: string, data: Partial<LogFormData>): Promise<LogEntry> {
  const supabase = await createClient()
  
  const updateData: any = {}
  if (data.title !== undefined) updateData.title = data.title
  if (data.content !== undefined) updateData.content = data.content
  if (data.date !== undefined) updateData.date = data.date.toISOString().split('T')[0]

  const { data: updatedLog, error } = await supabase
    .from('log_entries')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      throw new Error('ログが見つかりません')
    }
    console.error('ログ更新エラー:', error)
    throw new Error('ログの更新に失敗しました')
  }

  return mapToLogEntry(updatedLog)
}

export async function deleteLog(id: string): Promise<void> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('log_entries')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('ログ削除エラー:', error)
    throw new Error('ログの削除に失敗しました')
  }
}
