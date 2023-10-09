import { ReactNode } from 'react'
import GlobalNav from 'connectors/global-nav/global-nav'
import { css, cx } from '@emotion/css'
import { PocketHead } from 'containers/_layouts/_head'

const fixedNavContainer = css`
  padding-top: 65px;
`

type metaData = {
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
  canonical
}: {
  metaData?: metaData
  children: ReactNode
  title?: string
  canonical?: string
}) {
  return (
    <>
      <PocketHead title={title} canonical={canonical} metaData={metaData} forceWebView={true} noIndex={false}/>
      <GlobalNav onlyLogout={true} />
      <div className={cx(fixedNavContainer)}>{children}</div>
    </>
  )
}

export default mainLayout
