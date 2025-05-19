import style from './style.module.css'

import Layout from 'layouts/main'

export function Goodbye({ metaData }) {
  return (
    <Layout
      metaData={metaData}
      isFullWidthLayout={true}
      noContainer={true}
      className={style.spacer}>
      <div className="page-container">
        <h1>Hi</h1>
      </div>
    </Layout>
  )
}
