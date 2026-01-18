import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { LogListProps } from '../types'

export function LogList({ logs }: LogListProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">ログがありません</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => {
        const formattedDate = new Intl.DateTimeFormat('ja-JP', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(log.date))

        return (
          <Card key={log.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{log.title}</CardTitle>
                <Link href={`/admin/log/${log.id}/edit`}>
                  <Button variant="outline" size="sm">
                    編集
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-2">{log.content}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
