import { OverflowMenuIcon } from 'components/icons/OverflowMenuIcon'
import { Trans } from 'next-i18next'

export default function ReleaseNotes() {
  return (
    <section>
      <Trans i18nKey="release:january-19-2021">
        <h5>January 19, 2021</h5>

        <p>
          This update includes a number of notable improvements inspired by feedback from our users.
        </p>

        <h6>🎉 What’s New</h6>
        <ul>
          <li>
            Visualize your tags in a new way with the searchable all tags view, and pin your most
            important tags to the sidebar for quick access.
          </li>
          <li>
            Favorite, Archive, Tag, Delete, and Share buttons have been brought out from the{' '}
            <OverflowMenuIcon /> menu, making them much easier to access in both tile and list
            layouts.
          </li>
          <li>
            The list layout is compact so you can see more items at once, optimal for smaller
            screens.
          </li>
          <li>
            Sharing from Pocket has been overhauled to make it easier to share to your favorite
            services.
          </li>
          <li>Easily select batches of items (Shift + click) when bulk editing.</li>
        </ul>

        <p>
          We’ve also made significant changes to our underlying codebase so we can make more rapid
          improvements in the future.
        </p>
      </Trans>
    </section>
  )
}
