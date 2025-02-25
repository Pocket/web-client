import PropTypes from 'prop-types'
import { css } from '@emotion/css'

import { MozAdsPlacement } from '@mozilla-services/ads-sdk/dist/react'

const programmaticAdWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  .label {
    font-family: var(--fontSansSerif);
    font-size: 0.85rem;
    line-height: 100%;
    color: var(--color-textTertiary);
    text-align: center;
    margin: 0;
    padding-bottom: 0.5rem;
    width: 100%;
  }
`

export function AdSlot({ placementName, targeting, instanceStyles }) {

  return (
    <div className={`${programmaticAdWrapperStyles} 'syndication-ad' ${instanceStyles}`}>
      <MozAdsPlacement
        placementId="pocket_billboard_1"
        iabContentCategoryIds={targeting.Category}
        fixedSize={placementName}
      />
      <p className="label">{adLabel}</p>
    </div>
  )
}

AdSlot.propTypes = {
  // A string of the ad unit placement, which are constants provided by ads-sdk
  placementName: PropTypes.string.isRequired,
  // An *optional* object of key/value pairs for targeting.
  targeting: PropTypes.object,
  // An *optional* classname to add to the ad container
  instanceStyles: PropTypes.string
}
