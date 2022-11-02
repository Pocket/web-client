import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { css, cx } from 'linaria'

import copy from 'clipboard-copy'
import { COPY_ITEM_URL } from 'actions'

import { LinkCopyIcon } from 'components/icons/LinkCopyIcon'

import { topTooltipDelayed } from 'components/tooltip/tooltip'
import { socialButtonStyles } from 'components/social-button/social-button'
import { SocialButton } from 'components/social-button/social-button'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { itemsShareCancel } from 'connectors/items-by-id/saves/items.share'

const socialIcons = css`
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
`

export const ShareSocial = ({ openUrl, excerpt, title, itemId, quote, position = 0 }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const analyticsData = {
    id: itemId,
    url: openUrl,
    position
  }

  const cancelShare = () => dispatch(itemsShareCancel())
  const onSocialShare = (service) => {
    dispatch(sendSnowplowEvent(`share.${service}`, analyticsData))
    cancelShare()
  }
  const copyAction = () => ({ type: COPY_ITEM_URL })
  const copyUrl = async () => {
    await copy(openUrl)
    dispatch(sendSnowplowEvent('share.copy', analyticsData))
    dispatch(copyAction())
    cancelShare()
  }

  return (
    <div className={`${socialIcons} content`}>
      <button
        aria-label={t('share:copy-link', 'Copy Link')}
        data-tooltip={t('share:copy-link', 'Copy Link')}
        className={cx(socialButtonStyles, topTooltipDelayed)}
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
