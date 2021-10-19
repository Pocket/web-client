import { css } from 'linaria'
import { Button } from '@pocket/web-ui'
import { useTranslation } from 'next-i18next'

const pocketAppsStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
  .button {
    text-align: center;
  }
`

export const RSSFeeds = ({ userName }) => {
  const { t } = useTranslation()

  const unreadLink = `https://getpocket.com/users/${userName}/feed/unread`
  const readLink = `https://getpocket.com/users/${userName}/feed/read`
  const allLink = `https://getpocket.com/users/${userName}/feed/all`

  return (
    <section className={pocketAppsStyle}>
      <h2>{t('account:rss', 'RSS Feeds')}</h2>
      <div className="sectionBody">
        <label htmlFor="something" className="connectionLabel">
          {t('account:rss-view-unread', 'View my Unread RSS feed')}
        </label>
        <Button
          href={unreadLink}
          variant="secondary"
          className="button actionInline"
          target="_blank"
          rel="noopener noreferrer">
          {t('account:rss-open-feed', 'Open Feed')}
        </Button>

        <label htmlFor="something" className="connectionLabel">
          {t('account:rss-view-archived', 'View my Archive RSS feed')}
        </label>
        <Button
          href={readLink}
          variant="secondary"
          className="button actionInline"
          target="_blank"
          rel="noopener noreferrer">
          {t('account:rss-open-feed', 'Open Feed')}
        </Button>

        <label htmlFor="something" className="connectionLabel">
          {t('account:rss-view-all', 'View my All Items RSS feed')}
        </label>
        <Button
          href={allLink}
          variant="secondary"
          className="button actionInline"
          target="_blank"
          rel="noopener noreferrer">
          {t('account:rss-open-feed', 'Open Feed')}
        </Button>
        <div className="helperText full">
          {t(
            'account:rss-feed-helper',
            'Your RSS feeds are private and password protected by default. If your feed reader does not support password protected feeds, you can <a href="#">disable password protection</a>.'
          )}
        </div>
      </div>
    </section>
  )
}
