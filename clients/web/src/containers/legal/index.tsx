import style from './style.module.css'
import Layout from 'layouts/main'

export function LegalComponent({ children }: React.PropsWithChildren) {
  return (
    <Layout>
      <main className={style.base}>{children}</main>
    </Layout>
  )
}
