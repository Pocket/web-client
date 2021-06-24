import { Trans } from 'next-i18next'

export default function ReleaseNotes() {
  return (
    <section>
      <Trans i18nKey="release:june-24-2021">
        <h5>June 24, 2021</h5>

        <h6>🏠 New feature: Home (beta)!</h6>

        <p>
          Exclusive to our web app, we’re sharing an early version of a new discovery
          experience called Home. Click the available topics to build a Home of stories
          you care about, curated by our editors.
        </p>

        <p>
          We’d love to hear from you about this feature! <a href="https://getpocket.com/contact_support?subject=Feedback%20about%20Pocket%20Home%20Beta">
          Click here to drop us a line</a> and let us know what you think.
        </p>

        <h6>📰 New editorial collections tab</h6>

        <p>
          Fill your Pocket with our curated guides to the best of the web. Our editorial
          team is constantly creating unique collections of fascinating reads, helpful
          guides, and more. <a href="https://getpocket.com/collections">Click here to visit
          our collections and see what’s new</a>.
        </p>
      </Trans>
    </section>
  )
}
