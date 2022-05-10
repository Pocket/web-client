import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'

import { FacebookShareButton } from 'react-share'
import { TwitterShareButton } from 'react-share'
import { LinkedinShareButton } from 'react-share'
import { RedditShareButton } from 'react-share'

import { css } from 'linaria'

import copy from 'clipboard-copy'
import { COPY_ITEM_URL } from 'actions'

import { LinkCopyIcon } from '@pocket/web-ui'
import { FacebookColorIcon } from '@pocket/web-ui'
import { TwitterColorIcon } from '@pocket/web-ui'
import { LinkedinMonoIcon } from '@pocket/web-ui'
import { BufferIcon } from '@pocket/web-ui'
import { RedditMonoIcon } from '@pocket/web-ui'

import { topTooltipDelayed } from 'components/tooltip/tooltip'
import { openWindow } from 'common/utilities'

const socialIcons = css`
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  padding: var(--spacing100) var(--spacing150);
  border-top: var(--dividerStyle);

  & > button {
    display: flex;
    padding: 4px;
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
    &:focus {
      transition: none;
      color: var(--color-navCurrentTabText);
      outline: 1px auto var(--color-navCurrentTab);
    }
  }

  .buffer-button {
    padding: 0;
  }

  .icon {
    height: 1.5rem;
    line-height: 1rem;
    margin-right: 0;
    margin-top: 1px;
  }
`

export const BufferShareButton = ({ url, text, onShareWindowClose, children, ...rest }) => {
  const prepareWindow = (url, quote, callback) => {
    const opts = {
      name: 'buffer',
      height: 550,
      width: 750
    }
    const text = quote ? `&text=${quote}` : ''
    const link = `https://bufferapp.com/add?url=${encodeURIComponent(url)}${text}`
    openWindow(link, opts, callback)
  }

  const clickHandler = (e) => {
    e.preventDefault()
    prepareWindow(url, text, onShareWindowClose)
  }

  return (
    <button onClick={clickHandler} {...rest}>
      {children}
    </button>
  )
}

export const ShareSocial = ({
  openUrl,
  excerpt,
  title,
  quote,
  engagementEvent,
  cancelShare
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const onSocialShare = (service) => {
    engagementEvent(`share.${service}`)
    cancelShare()
  }

  const copyUrl = async () => {
    await copy(openUrl)
    engagementEvent('share.copy')
    dispatch({ type: COPY_ITEM_URL }) // sends Toast
    cancelShare()
  }

  return (
    <div className={`${socialIcons} content`}>
      <button
        aria-label={t('share:copy-link', 'Copy Link')}
        data-tooltip={t('share:copy-link', 'Copy Link')}
        className={topTooltipDelayed}
        data-cy="copy-link"
        onClick={copyUrl}>
        <LinkCopyIcon />
      </button>
      <FacebookShareButton
        aria-label={t('share:share-to-facebook', 'Share to Facebook')}
        data-tooltip={t('share:share-to-facebook', 'Share to Facebook')}
        data-cy="share-facebook"
        className={topTooltipDelayed}
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('facebook')}
        quote={quote}
        url={openUrl}>
        <FacebookColorIcon />
      </FacebookShareButton>
      <TwitterShareButton
        aria-label={t('share:share-to-twitter', 'Share to Twitter')}
        data-tooltip={t('share:share-to-twitter', 'Share to Twitter')}
        data-cy="share-twitter"
        className={topTooltipDelayed}
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('twitter')}
        title={title}
        url={openUrl}>
        <TwitterColorIcon />
      </TwitterShareButton>
      <LinkedinShareButton
        aria-label={t('share:share-to-linkedin', 'Share to LinkedIn')}
        data-tooltip={t('share:share-to-linkedin', 'Share to LinkedIn')}
        data-cy="share-linkedin"
        className={topTooltipDelayed}
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('linkedin')}
        title={title}
        summary={quote || excerpt}
        url={openUrl}>
        <LinkedinMonoIcon />
      </LinkedinShareButton>
      <RedditShareButton
        aria-label={t('share:share-to-reddit', 'Share to Reddit')}
        data-tooltip={t('share:share-to-reddit', 'Share to Reddit')}
        data-cy="share-reddit"
        className={topTooltipDelayed}
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('reddit')}
        title={title}
        url={openUrl}>
        <RedditMonoIcon />
      </RedditShareButton>
      <BufferShareButton
        aria-label={t('share:share-to-buffer', 'Share to Buffer')}
        data-tooltip={t('share:share-to-buffer', 'Share to Buffer')}
        data-cy="share-buffer"
        className={topTooltipDelayed}
        onShareWindowClose={() => onSocialShare('buffer')}
        quote={quote || excerpt}
        url={openUrl}>
        <BufferIcon />
      </BufferShareButton>
    </div>
  )
}
