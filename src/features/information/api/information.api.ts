import type { Information } from '@/types'
import type { InformationFormData } from '../types'

// プレースホルダー: 将来Supabaseに置き換え予定
const MOCK_INFORMATION: Information[] = [
  {
    id: '1',
    title: '年末年始の営業について',
    content: '年末年始の営業日程をお知らせいたします。12月29日から1月3日まで休業とさせていただきます。',
    status: 'published',
    authorId: '1',
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: '2',
    title: '新サービス開始のお知らせ',
    content: '2024年より新しいサービスを開始いたします。詳細は追ってご案内いたします。',
    status: 'published',
    authorId: '1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
]

export async function getInformationList(): Promise<Information[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return MOCK_INFORMATION
}

export async function getInformation(id: string): Promise<Information | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return MOCK_INFORMATION.find((item) => item.id === id) || null
}

export async function createInformation(data: InformationFormData): Promise<Information> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const newInfo: Information = {
    id: Date.now().toString(),
    ...data,
    authorId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  console.log('[v0] Created information:', newInfo)
  return newInfo
}

export async function updateInformation(id: string, data: Partial<InformationFormData>): Promise<Information> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const existing = MOCK_INFORMATION.find((item) => item.id === id)
  if (!existing) {
    throw new Error('お知らせが見つかりません')
  }
  const updated: Information = {
    ...existing,
    ...data,
    updatedAt: new Date(),
  }
  console.log('[v0] Updated information:', updated)
  return updated
}

export async function deleteInformation(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  console.log('[v0] Deleted information:', id)
}
