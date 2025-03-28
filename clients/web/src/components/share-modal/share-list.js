import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { css, cx } from '@emotion/css'
import copy from 'clipboard-copy'
import { COPY_ITEM_URL } from 'actions'
import { CopyIcon } from '@ui/icons/CopyIcon'
import { topTooltipDelayed } from 'components/tooltip/tooltip'
import { SocialButton } from 'components/social-button/social-button'
import { MastodonIcon } from '@ui/icons/MastodonIcon'
import { socialButtonStyles } from 'components/social-button/social-button'

const socialIcons = css`
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;

  button {
    margin: 0;
  }
`

export const ShareList = ({
  openUrl,
  excerpt,
  title,
  quote,
  engagementEvent,
  updateContext,
  cancelShare,
  handleMastodon
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const onSocialShare = (service) => {
    engagementEvent(`share.${service}`)
    updateContext()
    cancelShare()
  }

  const onShareMastodon = () => {
    engagementEvent('share.mastodon')
    updateContext()
    handleMastodon()
  }

  const copyUrl = async () => {
    await copy(openUrl)
    engagementEvent('share.copy')
    updateContext()
    dispatch({ type: COPY_ITEM_URL }) // sends Toast
    cancelShare()
  }

  return (
    <div className={`${socialIcons} content`}>
      <button
        aria-label={t('share:copy-link', 'Copy Link')}
        data-tooltip={t('share:copy-link', 'Copy Link')}
        className={cx(socialButtonStyles, topTooltipDelayed)}
        data-testid="copy-link"
        onClick={copyUrl}>
        <CopyIcon />
      </button>

      <SocialButton
        network="facebook"
        label={t('share:share-to-facebook', 'Share to Facebook')}
        onSocialShare={onSocialShare}
        quote={quote}
        u={openUrl}
      />

      <SocialButton
        network="twitter"
        label={t('share:share-to-twitter', 'Share to Twitter')}
        onSocialShare={onSocialShare}
        text={quote || title}
        url={openUrl}
      />

      <SocialButton
        network="linkedin"
        label={t('share:share-to-linkedin', 'Share to LinkedIn')}
        onSocialShare={onSocialShare}
        title={title}
        summary={quote || excerpt}
        url={openUrl}
      />

      <SocialButton
        network="reddit"
        label={t('share:share-to-reddit', 'Share to Reddit')}
        onSocialShare={onSocialShare}
        title={title}
        url={openUrl}
      />

      <button
        aria-label={t('share:share-to-mastodon', 'Share to Mastodon')}
        data-tooltip={t('share:share-to-mastodon', 'Share to Mastodon')}
        className={cx(socialButtonStyles, topTooltipDelayed)}
        data-testid="share-mastodon"
        onClick={onShareMastodon}>
        <MastodonIcon />
      </button>

      <SocialButton
        network="buffer"
        label={t('share:share-to-buffer', 'Share to Buffer')}
        onSocialShare={onSocialShare}
        text={quote || excerpt}
        url={openUrl}
      />
    </div>
  )
}
