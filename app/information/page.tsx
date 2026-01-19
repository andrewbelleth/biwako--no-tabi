import { InformationList, getInformationList } from '@/features/information'
import { PublicLayout } from '@/components/layout'

export const metadata = {
  title: 'お知らせ | びわ湖の旅',
  description: 'びわ湖の旅からのお知らせ一覧です。',
}

export default async function InformationPage() {
  const items = await getInformationList()
  const publishedItems = items.filter((item) => item.status === 'published')

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">お知らせ</h1>
        <InformationList items={publishedItems} />
      </div>
    </PublicLayout>
  )
}
