import { css } from 'linaria'
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

const shareContainer = css`
  button {
    line-height: 100%;
  }

  svg {
    height: 22px;
  }

  .pocket-share {
    width: 1.5rem;
    button {
      color: var(--color-textPrimary);
    }

    .actionCopy {
      display: none;
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
  saveAction,
  saveStatus,
  excerpt = '',
  title,
  handleShareClick,
  trackSaveClick,
  slug
}) {
  const url = `${BASE_URL}/explore/item/${slug}`

  const onSave = () => {
    saveAction(url)
    trackSaveClick('save-story-sidebar')
  }

  return (
    <aside className={shareContainer}>
      <div className="pocket-share">
        <SaveToPocket
          saveAction={onSave}
          isAuthenticated={isAuthenticated}
          saveStatus={saveStatus}
          id="sidebar"
        />
      </div>

      <div className="facebook-share">
        <FacebookShareButton
          data-cy="share-facebook"
          onShareWindowClose={() => handleShareClick('Facebook')}
          quote={excerpt}
          url={buildShareUrl(url, 'fbsynd')}>
          <FacebookMonoIcon />
        </FacebookShareButton>
      </div>

      <div className="twitter-share">
        <TwitterShareButton
          data-cy="share-twitter"
          onShareWindowClose={() => handleShareClick('Twitter')}
          title={title}
          via="Pocket"
          url={buildShareUrl(url, 'twtrsynd')}>
          <TwitterMonoIcon />
        </TwitterShareButton>
      </div>

      <div className="reddit-share">
        <RedditShareButton
          data-cy="share-reddit"
          onShareWindowClose={() => handleShareClick('Reddit')}
          title={title}
          url={buildShareUrl(url, 'redditsynd')}>
          <RedditMonoIcon />
        </RedditShareButton>
      </div>

      <div className="linkedin-share">
        <LinkedinShareButton
          data-cy="share-linkedin"
          onShareWindowClose={() => handleShareClick('Linkedin')}
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
          beforeOnClick={() => handleShareClick('Email')}
          subject={title}
          body={excerpt}
          url={buildShareUrl(url, 'emailsynd')}
          separator=" — ">
          <MailIcon />
        </EmailShareButton>
      </div>
    </aside>
  )
}
