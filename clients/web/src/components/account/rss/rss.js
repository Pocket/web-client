import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'

const pocketAppsStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
  .button {
    text-align: center;
  }
`

const RssLinks = ({ userName }) => {
  const { t } = useTranslation()

  const unreadLink = `https://getpocket.com/users/${userName}/feed/unread`
  const readLink = `https://getpocket.com/users/${userName}/feed/read`
  const allLink = `https://getpocket.com/users/${userName}/feed/all`

  return (
    <div className="sectionBody">
      <label htmlFor="something" className="connectionLabel">
        {t('account:rss-view-unread', 'View RSS feed of unread items')}
      </label>
      <a
        href={unreadLink}
        className="button secondary actionInline"
        target="_blank"
        rel="noopener noreferrer">
        {t('account:rss-open-feed', 'Open Feed')}
      </a>

      <label htmlFor="something" className="connectionLabel">
        {t('account:rss-view-archived', 'View RSS feed of archived items')}
      </label>
      <a
        href={readLink}
        className="button secondary actionInline"
        target="_blank"
        rel="noopener noreferrer">
        {t('account:rss-open-feed', 'Open Feed')}
      </a>

      <label htmlFor="something" className="connectionLabel">
        {t('account:rss-view-all', 'View RSS feed of all items')}
      </label>
      <a
        href={allLink}
        className="button secondary actionInline"
        target="_blank"
        rel="noopener noreferrer">
        {t('account:rss-open-feed', 'Open Feed')}
      </a>
      <div className="helperText full">
        {t('account:rss-feed-helper', 'Your RSS feeds are private and password protected.')}
      </div>
    </div>
  )
}

const ChangeUsername = ({ onChangeUsername }) => {
  const { t } = useTranslation()

  return (
    <div className="sectionBody">
      <label htmlFor="rss-change-username" className="connectionLabel labelWithContext">
        {t('account:profile-change-username', 'Change Username')}
        <div className="helperText full">
          {t('account:rss-feed-username', 'You need to create a username to access your RSS feed.')}
        </div>
      </label>
      <div className="actionInline">
        <button id="rss-change-username" className="primary" onClick={onChangeUsername}>
          {t('account:profile-change-username', 'Change Username')}
        </button>
      </div>
    </div>
  )
}

export const RSSFeeds = ({ userName, onChangeUsername }) => {
  const { t } = useTranslation()

  return (
    <section className={pocketAppsStyle}>
      <h2 id="rss">{t('account:rss', 'RSS Feeds')}</h2>
      {userName ? (
        <RssLinks userName={userName} />
      ) : (
        <ChangeUsername onChangeUsername={onChangeUsername} />
      )}
    </section>
  )
}
