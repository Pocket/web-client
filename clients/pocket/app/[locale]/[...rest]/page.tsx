import { SUPPORTED_LOCALES } from '@common/constants'
import { ErrorNotFound } from '@ui/components/error-not-found'

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export default async function NotFound({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <>
      <div className="page-container">
        <ErrorNotFound locale={locale} />
      </div>
    </>
  )
}
