import { useDispatch, useSelector } from 'react-redux'

import { FacebookShareButton } from 'react-share'
import { TwitterShareButton } from 'react-share'
import { LinkedinShareButton } from 'react-share'
import { RedditShareButton } from 'react-share'

import copy from 'clipboard-copy'
import { css } from 'linaria'

import { LinkCopyIcon } from '@pocket/web-ui'
import { FacebookColorIcon } from '@pocket/web-ui'
import { TwitterColorIcon } from '@pocket/web-ui'
import { LinkedinMonoIcon } from '@pocket/web-ui'
import { BufferIcon } from '@pocket/web-ui'
import { RedditMonoIcon } from '@pocket/web-ui'

import { openWindow } from 'common/utilities'

import { itemsShareCancel } from 'connectors/items-by-id/my-list/items.share'

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

export const ShareSocial = function ({ item }) {
  const dispatch = useDispatch()
  const { open_url, excerpt, title } = item

  const cancelShare = () => dispatch(itemsShareCancel())
  const onSocialShare = (type) => {
    // Some analytics here
    cancelShare()
  }
  const copyUrl = async () => {
    await copy(open_url)
    cancelShare()
  }

  return (
    <div className={`${socialIcons} content`}>
      <button aria-label="Copy Url" onClick={copyUrl}>
        <LinkCopyIcon />
      </button>
      <FacebookShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('facebook')}
        quote={excerpt}
        url={open_url}>
        <span className="label">
          <FacebookColorIcon />
        </span>
      </FacebookShareButton>
      <TwitterShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('twitter')}
        title={title}
        url={open_url}>
        <span className="label">
          <TwitterColorIcon />
        </span>
      </TwitterShareButton>
      <LinkedinShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('linkedin')}
        title={title}
        summary={excerpt}
        url={open_url}>
        <span className="label">
          <LinkedinMonoIcon />
        </span>
      </LinkedinShareButton>
      <RedditShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('reddit')}
        title={title}
        url={open_url}>
        <span className="label">
          <RedditMonoIcon />
        </span>
      </RedditShareButton>
      <BufferShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('buffer')}
        text={excerpt}
        url={open_url}>
        <span className="label">
          <BufferIcon />
        </span>
      </BufferShareButton>
    </div>
  )
}
