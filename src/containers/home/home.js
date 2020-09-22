import Layout from '../_layouts/main'
import * as Sentry from '@sentry/node'

export default function Main({ metaData = {} }) {
  return (
    <Layout title={metaData.title} metaData={metaData}>
      <main>
        <h1>Web Client</h1>
        <button onClick={breakTheWorld}>Break the world</button>
      </main>
    </Layout>
  )
}

const breakTheWorld = function () {
  try {
    errorGenerator()
  } catch (err) {
    Sentry.withScope((scope) => {
      Sentry.setTag('PocketAdFailure', 'Break The World')
      Sentry.captureException(err)
    })
  }
}

const errorGenerator = function () {
  throw new Error('Uh oh')
}
