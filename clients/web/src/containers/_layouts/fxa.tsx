import { type ReactNode } from 'react'
import GlobalNav from 'connectors/global-nav/global-nav'
import { css, cx } from '@emotion/css'
import { PocketHead } from 'containers/_layouts/_head'

const fixedNavContainer = css`
  padding-top: 65px;
`

interface MetaData {
  url?: string
  description?: string
  title?: string
  type?: string
  image?: string
}

function mainLayout({
  metaData,
  children,
  title = 'Pocket',
  canonical,
  syndicatedFrom
}: {
  metaData?: MetaData
  children: ReactNode
  title?: string
  canonical?: string
  syndicatedFrom?: string
}) {
  return (
    <>
      <PocketHead
        title={title}
        canonical={canonical}
        syndicatedFrom={syndicatedFrom}
        metaData={metaData}
        forceWebView={true}
        noIndex={false}
      />
      <GlobalNav onlyLogout={true} />
      <div className={cx(fixedNavContainer)}>{children}</div>
    </>
  )
}

export default mainLayout
