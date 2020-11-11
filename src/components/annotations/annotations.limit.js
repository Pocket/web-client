/* eslint  react/jsx-no-target-blank: 0*/
import { css } from 'linaria'
import { PremiumIcon } from '@pocket/web-ui'
import { ArrowLink } from 'components/arrow-link/arrow-link'
// import { MAX_ANNOTATIONS_DEFAULT } from 'Common/constants'
import { PREMIUM_URL } from 'common/constants'

const upsellWrapper = css`
  font-family: 'Graphik Web';
  font-size: 16px;
  line-height: 22px;
  padding: 20px 32px 40px;

  p  {
    margin-bottom: 10px;
    color: var(--color-textSecondary);
  }
`

export const LimitNotice = ({ trackClick }) => {
  return (
    <div className={upsellWrapper}>
      <p>
        <PremiumIcon />{' '}
        You’re limited to 3 highlights per article. {/*highlightLimit.header*/}
        Pocket Premium members get unlimited highlights. {/*highlightLimit.subheader*/}
      </p>
      <ArrowLink
        // onClick={trackClick}
        href={`${PREMIUM_URL}14`}
        target="_blank">
        Upgrade now {/*highlightLimit.ctaNow*/}
      </ArrowLink>
    </div>
  )
}
