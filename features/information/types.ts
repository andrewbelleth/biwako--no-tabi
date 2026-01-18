import type { Information } from '@/types'

export interface InformationFormData {
  title: string
  content: string
  status: 'draft' | 'published'
}

export interface InformationListProps {
  items: Information[]
}
