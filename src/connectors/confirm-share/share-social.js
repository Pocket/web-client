import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { FacebookShareButton } from 'react-share'
import { TwitterShareButton } from 'react-share'
import { LinkedinShareButton } from 'react-share'
import { RedditShareButton } from 'react-share'

import copy from 'clipboard-copy'
import { css } from 'linaria'
import { COPY_ITEM_URL } from 'actions'

import { LinkCopyIcon } from '@pocket/web-ui'
import { FacebookColorIcon } from '@pocket/web-ui'
import { TwitterColorIcon } from '@pocket/web-ui'
import { LinkedinMonoIcon } from '@pocket/web-ui'
import { BufferIcon } from '@pocket/web-ui'
import { RedditMonoIcon } from '@pocket/web-ui'
import { WithTooltip } from '@pocket/web-ui'

import { openWindow } from 'common/utilities'

import { itemsShareCancel } from 'connectors/items-by-id/my-list/items.share'
import { itemsSocialShare } from 'connectors/items-by-id/my-list/items.share'

const socialIcons = css`
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;

  & > button {
    display: flex;
    padding: 0;
    background: none;
    transition: background-color 0.1s ease-out;
    color: var(--color-textSecondary);
    font-size: var(--fontSize100);
    font-family: var(--fontSansSerif);
    font-weight: 500;
    text-decoration: none;
    text-align: left;
    line-height: 1.5rem;
    border-radius: 0;
    margin: 0;
    &:hover {
      color: var(--color-actionPrimaryHover);
    }
  }

  .buffer-button {
    padding: 0;
  }

  .icon {
    height: 1.5rem;
    line-height: 1rem;
    margin-right: var(--spacing075);
    margin-top: 1px;
  }
`

export const BufferShareButton = ({
  url,
  text,
  onShareWindowClose,
  children
}) => {
  const prepareWindow = (url, quote, callback) => {
    const opts = {
      name: 'buffer',
      height: 550,
      width: 750
    }
    const text = quote ? `&text=${quote}` : ''
    const link = `https://bufferapp.com/add?url=${encodeURIComponent(
      url
    )}${text}`
    openWindow(link, opts, callback)
  }

  const clickHandler = (e) => {
    e.preventDefault()
    prepareWindow(url, text, onShareWindowClose)
  }

  return (
    <button
      aria-label="Buffer"
      className="buffer-button"
      onClick={clickHandler}>
      {children}
    </button>
  )
}

export const ShareSocial = function ({ item, quote, position = 0 }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { open_url, excerpt, title } = item

  const cancelShare = () => dispatch(itemsShareCancel())
  const onSocialShare = (service) => {
    dispatch(itemsSocialShare(item, position, `share.${service}`))
    cancelShare()
  }
  const copyAction = () => ({ type: COPY_ITEM_URL })
  const copyUrl = async () => {
    await copy(open_url)
    dispatch(itemsSocialShare(item, position, `share.copy`))
    dispatch(copyAction())
    cancelShare()
  }

  return (
    <div className={`${socialIcons} content`}>
      <button aria-label={t('share:copy-link', 'Copy Link')} onClick={copyUrl}>
        <WithTooltip
          label={t('share:copy-link', 'Copy Link')}
          placement="top"
          delay={true}>
          <LinkCopyIcon />
        </WithTooltip>
      </button>

      <FacebookShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('facebook')}
        quote={quote}
        url={open_url}>
        <WithTooltip
          label={t('share:share-to-facebook', 'Share to Facebook')}
          placement="top"
          delay={true}>
          <span className="label">
            <FacebookColorIcon />
          </span>
        </WithTooltip>
      </FacebookShareButton>
      <TwitterShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('twitter')}
        title={title}
        url={open_url}>
        <WithTooltip
          label={t('share:share-to-twitter', 'Share to Twitter')}
          placement="top"
          delay={true}>
          <span className="label">
            <TwitterColorIcon />
          </span>
        </WithTooltip>
      </TwitterShareButton>
      <LinkedinShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('linkedin')}
        title={title}
        summary={quote || excerpt}
        url={open_url}>
        <WithTooltip
          label={t('share:share-to-linkedin', 'Share to LinkedIn')}
          placement="top"
          delay={true}>
          <span className="label">
            <LinkedinMonoIcon />
          </span>
        </WithTooltip>
      </LinkedinShareButton>
      <RedditShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('reddit')}
        title={title}
        url={open_url}>
        <WithTooltip
          label={t('share:share-to-reddit', 'Share to Reddit')}
          placement="top"
          delay={true}>
          <span className="label">
            <RedditMonoIcon />
          </span>
        </WithTooltip>
      </RedditShareButton>
      <BufferShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('buffer')}
        quote={quote || excerpt}
        url={open_url}>
        <WithTooltip
          label={t('share:share-to-buffer', 'Share to Buffer')}
          placement="top"
          delay={true}>
          <span className="label">
            <BufferIcon />
          </span>
        </WithTooltip>
      </BufferShareButton>
    </div>
  )
}
