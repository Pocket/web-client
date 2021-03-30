import { Trans } from 'next-i18next'

export default function ReleaseNotes() {
  return (
    <section>
      <Trans i18nKey="release:march-23-2021">
        <h5>March 23, 2021</h5>

        <p>Here’s our latest batch of updates!</p>

        <h6>⌨️ Accessibility</h6>
        <p>
          Tab navigation is here! Use the Tab key to highlight menu items and
          features. You can use these alongside our other keyboard shortcuts
          (click the ? to view the shortcuts list) to get things done.
        </p>

        <h6>📖 Recommendations</h6>
        <p>
          We love uninterrupted reading time 📚 At the end of an article,
          you’ll see a separate section with some additional stories we think
          you’ll like.
        </p>
      </Trans>
    </section>
  )
}
