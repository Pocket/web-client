import Layout from '../_layouts/main'
import * as Sentry from '@sentry/node'
import { Trans } from 'common/setup/i18n'

export default function Main({ metaData = {} }) {
  return (
    <Layout title={metaData.title} metaData={metaData}>
      <main>
        <h2>Web Client</h2>
        <h5>
          <Trans i18nKey="save-to-pocket:a-home-for-everything">
            Build a home for everything that interests you with Pocket.
          </Trans>
        </h5>
        <button onClick={breakTheWorld}>Throw a scoped error</button>
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
