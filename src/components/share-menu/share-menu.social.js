import {
  FacebookColorIcon,
  TwitterColorIcon,
  LinkedinMonoIcon,
  RedditMonoIcon,
  breakpointLargeHandset
} from '@pocket/web-ui'
import { BufferShareButton } from './share-menu.buffer'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton
} from 'react-share'
import { PopupMenuGroup, PopupMenuItem } from '@pocket/web-ui'
import { css } from 'linaria'

const itemStyle = css`
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;

  button,
  a {
    display: flex;
    width: 100%;
    padding: var(--spacing075) var(--spacing100);
    background: none;
    transition: background-color 0.1s ease-out;
    color: var(--color-textPrimary);
    font-size: var(--fontSize100);
    font-family: var(--fontSansSerif);
    font-weight: 500;
    text-decoration: none;
    text-align: left;
    line-height: 1.5rem;
    border-radius: 0;

    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--color-actionFocus);
    }

    &:hover {
      background: var(--color-actionPrimary);
      color: var(--color-actionPrimaryText);

      .label-secondary {
        color: var(--color-actionPrimaryText);
      }
    }

    &:active {
      background: var(--color-actionPrimaryHover);
      color: var(--color-actionPrimaryText);

      .label-secondary {
        color: var(--color-actionPrimaryText);
      }
    }

    &:disabled {
      pointer-events: none;
      cursor: default;
      opacity: 0.5;
    }

    ${breakpointLargeHandset} {
      border-radius: var(--borderRadius);
    }
  }

  .icon {
    height: 1.5rem;
    line-height: 1rem;
    margin-right: var(--spacing075);
    margin-top: 1px;
  }
`

export const SocialItems = ({ onSocialShare, quote = '', url, title }) => (
  <PopupMenuGroup>
    <li className={itemStyle}>
      <FacebookShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('facebook')}
        quote={quote}
        url={url}>
        <span className="label">
          <FacebookColorIcon />
          Facebook
        </span>
      </FacebookShareButton>
    </li>
    <li className={itemStyle}>
      <TwitterShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('twitter')}
        title={title}
        url={url}>
        <span className="label">
          <TwitterColorIcon />
          Twitter
        </span>
      </TwitterShareButton>
    </li>
    <li className={itemStyle}>
      <LinkedinShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('linkedin')}
        title={title}
        summary={quote}
        url={url}>
        <span className="label">
          <LinkedinMonoIcon />
          LinkedIn
        </span>
      </LinkedinShareButton>
    </li>
    <li className={itemStyle}>
      <RedditShareButton
        resetButtonStyle={false}
        onShareWindowClose={() => onSocialShare('reddit')}
        title={title}
        url={url}>
        <span className="label">
          <RedditMonoIcon />
          Reddit
        </span>
      </RedditShareButton>
    </li>
    <li className={itemStyle}>
      <BufferShareButton
        onShareWindowClose={() => onSocialShare('buffer')}
        text={quote}
        url={url}>
        <span className="label">Buffer</span>
      </BufferShareButton>
    </li>
  </PopupMenuGroup>
)
