import type { LogEntry } from '@/types'

export interface LogFormData {
  title: string
  content: string
  date: Date
}

export interface LogListProps {
  logs: LogEntry[]
}
