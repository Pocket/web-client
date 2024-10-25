import { Suspense } from 'react'

export default async function About({ params }: { params: { locale: string } }) {
  const { locale } = await params

  return (
    <div className="page-container">
      <Suspense>{locale}</Suspense>
    </div>
  )
}
