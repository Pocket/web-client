import style from './style.module.css'
import Layout from 'layouts/main'

export function LegalComponent({ children }: React.PropsWithChildren): JSX.Element {
  return (
    <Layout>
      <main className={style.base}>{children}</main>
    </Layout>
  )
}
