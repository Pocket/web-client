import { ErrorNotFound } from '@ui/components/error-not-found'

export default async function NotFound({ params }: { params: { locale: string } }) {
  const { locale } = await params

  return (
    <>
      <div className="page-container">
        <ErrorNotFound locale={locale} />
      </div>
    </>
  )
}
