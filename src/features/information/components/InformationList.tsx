import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { InformationListProps } from '../types'

export function InformationList({ items }: InformationListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">お知らせがありません</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const formattedDate = new Intl.DateTimeFormat('ja-JP', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(item.createdAt))

        return (
          <Link key={item.id} href={`/information/${item.id}`}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                    {item.status === 'published' ? '公開中' : '下書き'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{formattedDate}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-2">{item.content}</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
