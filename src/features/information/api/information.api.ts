import { createClient } from '@/lib/supabase/server'
import type { Information } from '@/types'
import type { InformationFormData } from '../types'

function mapToInformation(row: any): Information {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    status: row.status,
    authorId: row.author_id,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}

export async function getInformationList(): Promise<Information[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('information')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('情報取得エラー:', error)
    throw new Error('情報の取得に失敗しました')
  }

  return (data || []).map(mapToInformation)
}

export async function getInformation(id: string): Promise<Information | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('information')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error('情報取得エラー:', error)
    throw new Error('情報の取得に失敗しました')
  }

  return data ? mapToInformation(data) : null
}

export async function createInformation(data: InformationFormData): Promise<Information> {
  const supabase = await createClient()
  
  // 現在のユーザーを取得
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('認証が必要です')
  }

  const { data: newInfo, error } = await supabase
    .from('information')
    .insert({
      title: data.title,
      content: data.content,
      status: data.status,
      author_id: user.id,
    })
    .select()
    .single()

  if (error) {
    console.error('情報作成エラー:', error)
    throw new Error('情報の作成に失敗しました')
  }

  return mapToInformation(newInfo)
}

export async function updateInformation(id: string, data: Partial<InformationFormData>): Promise<Information> {
  const supabase = await createClient()
  
  const updateData: any = {}
  if (data.title !== undefined) updateData.title = data.title
  if (data.content !== undefined) updateData.content = data.content
  if (data.status !== undefined) updateData.status = data.status

  const { data: updatedInfo, error } = await supabase
    .from('information')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      throw new Error('お知らせが見つかりません')
    }
    console.error('情報更新エラー:', error)
    throw new Error('情報の更新に失敗しました')
  }

  return mapToInformation(updatedInfo)
}

export async function deleteInformation(id: string): Promise<void> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('information')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('情報削除エラー:', error)
    throw new Error('情報の削除に失敗しました')
  }
}
