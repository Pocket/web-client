import { ErrorNotFound } from '@ui/components/error-not-found'

export default function NotFound({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <div className="page-container">
        <ErrorNotFound locale={locale} />
      </div>
    </>
  )
}
