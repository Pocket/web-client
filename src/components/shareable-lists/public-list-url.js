import { cx } from '@emotion/css'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/css'
import copy from 'clipboard-copy'
import { COPY_ITEM_URL } from 'actions'
import { BASE_URL } from 'common/constants'
import { CopyIcon } from '@ui/icons/CopyIcon'
import { bottomTooltip } from 'components/tooltip/tooltip'
import { useTranslation } from 'next-i18next'

const statusStyles = css`
  a {
    font-size: 14px;
    color: var(--color-actionPrimary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .copy {
    background: transparent;
    color: var(--color-actionPrimary);
    border: 0;
  }

  &.callout {
    padding: 14px 16px;
    line-height: 1.25;
    background-color: var(--color-calloutBackgroundPrimary);
    border-radius: 8px;
    margin-top: 24px;
  }
`

export const PublicListUrl = ({ publicListInfo, handleCopyUrl, handleOpenUrl }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { externalId, slug, callout, status } = publicListInfo

  if (status !== 'PUBLIC') return null

  const url = `/sharedlists/${externalId}/${slug}`
  const copyUrl = `${BASE_URL}${url}`
  const linkDisplay = `${BASE_URL}/sharedlists/.../${slug}`

  const handleCopy = async () => {
    await copy(copyUrl)
    handleCopyUrl() // sends snowplow engagement event
    dispatch({ type: COPY_ITEM_URL }) // sends Toast
  }

  return (
    <div className={cx(callout && 'callout', statusStyles)}>
      <Link href={url} onClick={handleOpenUrl}>
        {linkDisplay}
      </Link>
      <button
        aria-label={t('list:copy-link', 'Copy Link')}
        data-tooltip={t('list:copy-link', 'Copy Link')}
        className={cx('copy', 'tiny', bottomTooltip)}
        data-testid="copy-link"
        onClick={handleCopy}>
        <CopyIcon className="small" />
      </button>
    </div>
  )
}
