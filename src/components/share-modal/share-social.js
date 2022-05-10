import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { getObjectWithValidKeysOnly } from 'common/utilities'
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

  .icon {
    height: 1.5rem;
    line-height: 1rem;
    margin-right: 0;
    margin-top: 1px;
  }
`

const SocialNetworks = {
  facebook: {
    width: 550,
    height: 400,
    params: ['u', 'quote'], // u === url
    shareUrl: 'https://www.facebook.com/sharer/sharer.php'
  },
  twitter: {
    width: 550,
    height: 400,
    params: ['url', 'text'], // text === title
    shareUrl: 'https://twitter.com/share'
  },
  linkedin: {
    width: 750,
    height: 600,
    params: ['url', 'title', 'summary'],
    shareUrl: 'https://www.reddit.com/submit'
  },
  reddit: {
    width: 660,
    height: 460,
    params: ['url', 'title'],
    shareUrl: 'https://www.reddit.com/submit'
  },
  buffer: {
    width: 750,
    height: 550,
    params: ['url', 'text'], // text === quote || excerpt
    shareUrl: 'https://bufferapp.com/add'
  }
}

function buildLink(network, rest) {
  const { params, shareUrl } = SocialNetworks[network]

  const tmpParams = params.reduce((obj, key) => ({ ...obj, [key]: rest[key] }), {})
  const searchParams = getObjectWithValidKeysOnly(tmpParams)

  const url = new URL(shareUrl)
  url.search = new URLSearchParams(searchParams)
  return url.href
}

export const SocialButton = ({
  network,
  label,
  dataTooltip,
  onSocialShare,
  children,
  ...rest
}) => {
  const { width, height } = SocialNetworks[network]
  const link = buildLink(network, rest)
  const opts = {
    name: network,
    width,
    height
  }

  const callbackHandler = () => onSocialShare(network)

  const clickHandler = (e) => {
    e.preventDefault()
    openWindow(link, opts, callbackHandler)
  }

  return (
    <button
      onClick={clickHandler}
      className={topTooltipDelayed}
      aria-label={label}
      data-tooltip={label}
      data-cy={`share-${network}`}
    >
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
      <SocialButton
        network="facebook"
        label={t('share:share-to-facebook', 'Share to Facebook')}
        onSocialShare={onSocialShare}
        quote={quote}
        u={openUrl}
      >
        <FacebookColorIcon />
      </SocialButton>

      <SocialButton
        network="twitter"
        label={t('share:share-to-twitter', 'Share to Twitter')}
        onSocialShare={onSocialShare}
        text={title}
        url={openUrl}
      >
        <TwitterColorIcon />
      </SocialButton>

      <SocialButton
        network="linkedin"
        label={t('share:share-to-linkedin', 'Share to LinkedIn')}
        onSocialShare={onSocialShare}
        title={title}
        summary={quote || excerpt}
        url={openUrl}
      >
        <LinkedinMonoIcon />
      </SocialButton>

      <SocialButton
        network="reddit"
        label={t('share:share-to-reddit', 'Share to Reddit')}
        onSocialShare={onSocialShare}
        title={title}
        url={openUrl}
      >
        <RedditMonoIcon />
      </SocialButton>

      <SocialButton
        network="buffer"
        label={t('share:share-to-buffer', 'Share to Buffer')}
        onSocialShare={onSocialShare}
        text={quote || excerpt}
        url={openUrl}
      >
        <BufferIcon />
      </SocialButton>
    </div>
  )
}
