import { css } from 'linaria'
import { Button } from '@pocket/web-ui'

const pocketAppsStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);

  .pocketAppsBody {
  }
`

export const RSSFeeds = () => {
  return (
    <section className={pocketAppsStyle}>
      <h2>RSS Feeds</h2>
      <div className="sectionBody">
        <label htmlFor="something" className="connectionLabel">
          View my Unread RSS feed
        </label>
        <Button variant="secondary" className="actionInline">
          Open Feed
        </Button>

        <label htmlFor="something" className="connectionLabel">
          View my Archive RSS feed
        </label>
        <Button variant="secondary" className="actionInline">
          Open Feed
        </Button>

        <label htmlFor="something" className="connectionLabel">
          View my All Items RSS feed
        </label>
        <Button variant="secondary" className="actionInline">
          Open Feed
        </Button>
        <div className="helperText full">
          Your RSS feeds are private and password protected by default. If your feed reader does not
          support password protected feeds, you can <a href="#">disable password protection</a>.
        </div>
      </div>
    </section>
  )
}
