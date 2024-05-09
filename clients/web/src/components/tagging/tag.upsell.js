import { css } from '@emotion/css'
import { ArrowLink } from 'components/arrow-link/arrow-link'
import { useInView } from 'react-intersection-observer'
import { PREMIUM_URL } from 'common/constants'
import { PremiumIcon } from '@ui/icons/PremiumIcon'
import { Trans } from 'next-i18next'

const upsellWrapper = css`
  font-family: 'Graphik Web';
  font-size: 16px;
  font-weight: 500;
  line-height: 130%;
  padding: var(--spacing075) 0;
  width: 100%;

  p {
    line-height: 130%;
    font-weight: 400;
    font-size: 16px;
    margin: 0px;
    color: var(--color-textSecondary);
    svg {
      width: 19px;
      height: 17.5px;
      margin-right: 5px;
    }
  }
`

export const TagUpsell = ({ onVisible }) => {
  // Fire a tracking event
  const [viewRef] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    onChange: (inView) => inView && onVisible('suggested-tags.upgrade-link')
  })

  return (
    <div className={upsellWrapper} ref={viewRef}>
      <p>
        <PremiumIcon />
        <Trans i18nKey="tags:tag-stories-faster">
          Tag stories faster than ever—get tag suggestions with
        </Trans>
      </p>
      <ArrowLink
        id="suggested-tags.upgrade-link"
        dataCy="suggested-tags-upgrade"
        margin="10px 0"
        href={`${PREMIUM_URL}&utm_campaign=suggested-tags`}>
        <Trans i18nKey="tags:pocket-premium">Pocket Premium</Trans>
      </ArrowLink>
    </div>
  )
}
