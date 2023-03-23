import { cx } from 'linaria'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { css } from 'linaria'
import copy from 'clipboard-copy'
import { COPY_ITEM_URL } from 'actions'
import { LinkCopyIcon } from 'components/icons/LinkCopyIcon'
import { bottomTooltip } from 'components/tooltip/tooltip'

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

export const PublicListUrl = ({ publicListInfo, handleCopyPublicUrl }) => {
  const dispatch = useDispatch()
  const { externalId, slug, callout, status } = publicListInfo

  if (status === 'PRIVATE') return null

  const url = `/sharedlists/${externalId}/${slug}`
  const copyUrl = `https://getpocket.com${url}`
  const linkDisplay = `https://getpocket.com/sharedlists/.../${slug}`

  const handleCopy = async () => {
    await copy(copyUrl)
    handleCopyPublicUrl() // sends snowplow engagement event
    dispatch({ type: COPY_ITEM_URL }) // sends Toast
  }

  return (
    <div className={cx(callout && 'callout', statusStyles)}>
      <Link href={url}>{linkDisplay}</Link>
      <button
        aria-label="Copy Link"
        data-tooltip="Copy Link"
        className={cx('copy', 'tiny', bottomTooltip)}
        data-cy="copy-link"
        onClick={handleCopy}>
        <LinkCopyIcon />
      </button>
    </div>
  )
}
