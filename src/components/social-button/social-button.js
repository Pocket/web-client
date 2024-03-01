import { css, cx } from '@emotion/css'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'
import { openWindow } from 'common/utilities/open-window/open-window'
import { topTooltipDelayed } from 'components/tooltip/tooltip'

import { FacebookColorIcon } from 'components/icons/FacebookColorIcon'
import { TwitterColorIcon } from 'components/icons/TwitterColorIcon'
import { LinkedinMonoIcon } from 'components/icons/LinkedinMonoIcon'
import { RedditMonoIcon } from 'components/icons/RedditMonoIcon'
import { BufferIcon } from 'components/icons/BufferIcon'

export const socialButtonStyles = css`
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
    background: none;
  }
  &:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
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
    shareUrl: 'https://www.facebook.com/sharer/sharer.php',
    icon: FacebookColorIcon
  },
  twitter: {
    width: 550,
    height: 400,
    params: ['url', 'text', 'via'], // text === quote || title
    shareUrl: 'https://twitter.com/share',
    icon: TwitterColorIcon
  },
  linkedin: {
    width: 750,
    height: 600,
    params: ['url', 'title', 'summary', 'source'],
    shareUrl: 'https://linkedin.com/shareArticle',
    icon: LinkedinMonoIcon
  },
  reddit: {
    width: 660,
    height: 460,
    params: ['url', 'title'],
    shareUrl: 'https://www.reddit.com/submit',
    icon: RedditMonoIcon
  },
  buffer: {
    width: 750,
    height: 550,
    params: ['url', 'text'], // text === quote || excerpt
    shareUrl: 'https://bufferapp.com/add',
    icon: BufferIcon
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

export const SocialButton = ({ network, label, onSocialShare, ...rest }) => {
  const { width, height, icon } = SocialNetworks[network]
  const link = buildLink(network, rest)
  const opts = {
    name: network,
    width,
    height
  }
  const SocialIcon = icon

  const callbackHandler = () => onSocialShare(network)

  const clickHandler = (e) => {
    e.preventDefault()
    openWindow(link, opts, callbackHandler)
  }

  return (
    <button
      onClick={clickHandler}
      className={cx(socialButtonStyles, topTooltipDelayed)}
      aria-label={label}
      data-tooltip={label}
      data-testid={`share-${network}`}>
      <SocialIcon />
    </button>
  )
}
