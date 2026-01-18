import { notFound } from 'next/navigation'
import { InformationForm, getInformation, getInformationList } from '@/features/information'

interface EditInformationPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const items = await getInformationList()
  return items.map((item) => ({ id: item.id }))
}

export default async function EditInformationPage({ params }: EditInformationPageProps) {
  const { id } = await params
  const info = await getInformation(id)

  if (!info) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">お知らせを編集</h1>
      <InformationForm info={info} isEditing />
    </div>
  )
}
