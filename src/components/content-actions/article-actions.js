import { css, cx } from '@emotion/css'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { MailIcon } from '@ui/icons/MailIcon'
import { MastodonIcon } from '@ui/icons/MastodonIcon'
import { breakpointMediumTablet } from 'common/constants'
import { SocialButton } from 'components/social-button/social-button'

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
    color: var(--color-textPrimary);
    background: none;

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
    width: 24px;
    button {
      color: var(--color-textPrimary);
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
  .mastodon-share {
    button:hover,
    button:active {
      svg {
        color: var(--color-brandMastodon);
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
    ${breakpointMediumTablet} {
      line-height: 1rem;
    }
  }
`

function buildShareUrl(url, source) {
  return `${url}?utm_source=${source}&utm_medium=social`
}

function buildEmailUrl(shareUrl, title, excerpt) {
  const builtUrl = buildShareUrl(shareUrl, 'emailsynd')
  const body = excerpt
    ? `${excerpt} — ${encodeURIComponent(builtUrl)}`
    : encodeURIComponent(builtUrl)
  return `mailto:?subject=${title}&body=${body}`
}

export const ArticleActions = function ({
  isAuthenticated,
  onSave = () => {},
  onShare = () => {},
  onShareMastodon = () => {},
  saveStatus,
  excerpt = '',
  title,
  url,
  className
}) {
  const emailUrl = buildEmailUrl(url, title, excerpt)
  const saveAction = () => onSave(url, 'save-story-side')
  const emailAction = () => {
    onShare('email')
    window.location.href = emailUrl
  }

  const mastodonAction = () => {
    onShare('mastodon')
    onShareMastodon()
  }

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
          <SocialButton
            network="facebook"
            onSocialShare={onShare}
            quote={excerpt}
            u={buildShareUrl(url, 'fbsynd')}
          />
        </div>

        <div className="twitter-share">
          <SocialButton
            network="twitter"
            onSocialShare={onShare}
            text={title}
            via="Pocket"
            url={buildShareUrl(url, 'twtrsynd')}
          />
        </div>

        <div className="reddit-share">
          <SocialButton
            network="reddit"
            onSocialShare={onShare}
            title={title}
            url={buildShareUrl(url, 'redditsynd')}
          />
        </div>

        <div className="linkedin-share">
          <SocialButton
            network="linkedin"
            onSocialShare={onShare}
            source="Pocket"
            title={title}
            summary={excerpt}
            url={buildShareUrl(url, 'linkedinsynd')}
          />
        </div>

        <div className="mastodon-share">
          <button data-testid="share-mastodon" onClick={mastodonAction}>
            <MastodonIcon />
          </button>
        </div>

        <div className="email-share">
          <button data-testid="share-email" onClick={emailAction}>
            <MailIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
