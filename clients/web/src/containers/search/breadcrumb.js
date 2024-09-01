import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const breadcrumb = css`
  font-size: 1.1875rem;
  padding: 1.25rem 0 1rem 0;
`
export function Breadcrumb({ withSaves }) {
  const { t } = useTranslation()
  return (
    <div className={breadcrumb}>
      <RootLink withSaves={withSaves} /> / {t('search:search', 'Search')}
    </div>
  )
}

function RootLink({ withSaves }) {
  const { t } = useTranslation()
  return (
    <>
      {withSaves ? (
        <Link href="/saves">{t('search:saves', 'Saves')}</Link>
      ) : (
        <Link href="/home">{t('search:home', 'Home')}</Link>
      )}
    </>
  )
}
