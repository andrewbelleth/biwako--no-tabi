import { InformationList, getInformationList } from '@/features/information'

export const metadata = {
  title: 'お知らせ | サイト名',
  description: 'お知らせ一覧ページです。',
}

export default async function InformationPage() {
  const items = await getInformationList()
  const publishedItems = items.filter((item) => item.status === 'published')

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">お知らせ</h1>
      <InformationList items={publishedItems} />
    </div>
  )
}
