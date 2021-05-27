import { css, cx } from 'linaria'
import { BASE_URL } from 'common/constants'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { FacebookMonoIcon } from '@pocket/web-ui'
import { TwitterMonoIcon } from '@pocket/web-ui'
import { RedditMonoIcon } from '@pocket/web-ui'
import { LinkedinMonoIcon } from '@pocket/web-ui'
import { MailIcon } from '@pocket/web-ui'
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  LinkedinShareButton,
  EmailShareButton
} from 'react-share'
import { breakpointMediumTablet } from '@pocket/web-ui'

const saveButton = css`
  min-width: 0;
  svg {
    margin-right: 0;
  }
`

const shareContainer = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;

  .social-actions {
    ${breakpointMediumTablet} {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
    }
    & > div {
      svg {
        height: 24px;
      }
      margin-bottom: 1rem;
      ${breakpointMediumTablet} {
        font-size: 1.6rem;
        margin-bottom: 0;
        margin-right: 1rem;
      }
    }
  }

  button {
    line-height: 100%;
    padding: 0;
    width: 24px;
    height: 24px;
    position: relative;
    border-radius: var(--borderRadius);
    &:focus {
      outline-offset: 2px;
      outline-color: var(--color-actionFocus);
    }
    span.icon {
      display: block;
      margin-top: 0;
      height: 24px;
    }
  }

  .pocket-share {
    button {
      color: var(--color-textPrimary);
    }
    div {
      width: 200px;
      font-family: var(--fontSansSerif);
    }
  }

  .facebook-share {
    button:hover,
    button:active {
      svg {
        color: var(--color-brandFacebook);
      }
    }
  }
  .twitter-share {
    button:hover,
    button:active {
      svg {
        color: var(--color-brandTwitter);
      }
    }
  }
  .reddit-share {
    button:hover,
    button:active {
      svg {
        color: var(--color-brandReddit);
      }
    }
  }
  .linkedin-share {
    button:hover,
    button:active {
      svg {
        color: var(--color-brandLinkedin);
      }
    }
  }
  .email-share {
    button:hover,
    button:active {
      svg {
        color: var(--color-actionPrimary);
      }
    }
  }
`

function buildShareUrl(url, source) {
  return `${url}?utm_source=${source}&utm_medium=social`
}

export const ArticleActions = function ({
  isAuthenticated,
  onSave,
  onShare,
  saveStatus,
  excerpt = '',
  title,
  url,
  className
}) {
  const saveAction = () => onSave(url)

  return (
    <div className={cx(shareContainer, className)}>
      <div className="social-actions">
        <div className="pocket-share">
          <SaveToPocket
            saveAction={saveAction}
            isAuthenticated={isAuthenticated}
            saveStatus={saveStatus}
            hideCopy={true}
            className={saveButton}
            id="sidebar"
          />
        </div>

        <div className="facebook-share">
          <FacebookShareButton
            data-cy="share-facebook"
            onShareWindowClose={() => onShare('Facebook')}
            quote={excerpt}
            url={buildShareUrl(url, 'fbsynd')}>
            <FacebookMonoIcon />
          </FacebookShareButton>
        </div>

        <div className="twitter-share">
          <TwitterShareButton
            data-cy="share-twitter"
            onShareWindowClose={() => onShare('Twitter')}
            title={title}
            via="Pocket"
            url={buildShareUrl(url, 'twtrsynd')}>
            <TwitterMonoIcon />
          </TwitterShareButton>
        </div>

        <div className="reddit-share">
          <RedditShareButton
            data-cy="share-reddit"
            onShareWindowClose={() => onShare('Reddit')}
            title={title}
            url={buildShareUrl(url, 'redditsynd')}>
            <RedditMonoIcon />
          </RedditShareButton>
        </div>

        <div className="linkedin-share">
          <LinkedinShareButton
            data-cy="share-linkedin"
            onShareWindowClose={() => onShare('Linkedin')}
            summary={excerpt}
            source="Pocket"
            title={title}
            url={buildShareUrl(url, 'linkedinsynd')}>
            <LinkedinMonoIcon />
          </LinkedinShareButton>
        </div>

        <div className="email-share">
          <EmailShareButton
            data-cy="share-email"
            beforeOnClick={() => onShare('Email')}
            subject={title}
            body={excerpt}
            url={buildShareUrl(url, 'emailsynd')}
            separator=" — ">
            <MailIcon />
          </EmailShareButton>
        </div>
      </div>
    </div>
  )
}
