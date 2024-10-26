import { SUPPORTED_LOCALES } from '@common/localization'
import { Suspense } from 'react'

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export default async function Saves({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <div className="page-container">
      <Suspense>{locale}</Suspense>
    </div>
  )
}
