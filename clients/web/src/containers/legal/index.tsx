import { type PropsWithChildren } from 'react'
import style from './style.module.css'
import Layout from 'layouts/main'
import { type JSX } from 'react'

export function LegalComponent({
  children,
  country
}: PropsWithChildren<{ country?: string }>): JSX.Element {
  return (
    <Layout>
      <main className={style.base} data-region={country}>
        {children}
      </main>
    </Layout>
  )
}
