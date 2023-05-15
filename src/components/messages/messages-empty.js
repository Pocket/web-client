import { css, cx } from '@emotion/css'
import { MessagesHeader } from 'components/headers/messages-header'
import { useTranslation } from 'next-i18next'

const emptyWrapper = css`
  font-family: var(--fontSansSerif);
`

export const MessageEmpty = () => {
  const { t } = useTranslation()

  return (
    <main className={cx('main', emptyWrapper)}>
      <MessagesHeader title={t('messages:inbox-is-empty', 'Your Inbox is Empty')} />
      <p>
        {t(
          'messages:when-someone-shares',
          'When someone shares items with you using Send to Friend, they will appear here.'
        )}
      </p>
    </main>
  )
}
