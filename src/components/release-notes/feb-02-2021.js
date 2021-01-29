import { Trans } from 'common/setup/i18n'

export default function ReleaseNotes() {
  return (
    <section>
      <Trans i18nKey="release:february-02-2021">
        <h5>February 2, 2021</h5>

        <p>
          For improved performance and stability, we’ve removed Send to Friend
          from the Share menu. To share outside of Pocket, click on the share
          button and select the social media app of your choice, or select copy
          link and paste it in an email.
        </p>
      </Trans>
    </section>
  )
}
