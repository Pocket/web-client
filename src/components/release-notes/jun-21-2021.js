import { Trans } from 'next-i18next'

export default function ReleaseNotes() {
  return (
    <section>
      <Trans i18nKey="release:june-21-2021">
        <h5>June 21, 2021</h5>

        <p>
          🇩🇪 The Discover feature is now available in German! If you’re located in
          Germany, you’ll see German-language stories. If you’re outside of
          Germany, <a href="/de/explore">click here to see recommendations in German.</a>
        </p>

        <p>
          🌐 Pocket for Web has been localized to 15 languages! We’ll be adding a way
          to easily switch languages if you prefer. For now, <a href="https://help.getpocket.com/article/1180-pocket-for-web-language-directory">
          you can access Pocket in the language of your choice here.</a>
        </p>

        <p>
          🖨️ Printing from your browser has a cleaned up format! Click the print option
          in your web browser to print from article view. Tip: you can adjust the font
          size in the display settings menu to suit your preference.
        </p>

        <p>
          📌 Pinned tags will persist across browsers, so you’ll see the same pinned tags
          in Pocket for Web on any computer you use.
        </p>

        <h6>🛠️ Other fixes and improvements</h6>
        <ul>
          <li>Search results can be filtered by All, My list, and Archive</li>
          <li>
            <a href="/explore">Pocket Explore</a> theme will now match your
            Pocket for Web theme (light, dark and sepia)
          </li>
          <li>Videos are now full width in syndicated pocket stories on Explore</li>
        </ul>
      </Trans>
    </section>
  )
}
