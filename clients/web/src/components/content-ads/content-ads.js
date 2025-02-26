import { css } from '@emotion/css'
import { AdSlot } from 'components/programmatic-ad/mozads-ad-slot'

import { IABFixedSize } from '@mozilla-services/ads-sdk/core'

const aboveTheFoldStyle = css`
  margin-bottom: var(--spacing250);
  border-bottom: 3px solid var(--color-actionPrimaryHover);
  padding-bottom: 3rem;
`
const adRailStyle = css`
  & > div {
    position: sticky;
    top: 6rem;
    margin: 0 0 4rem;
    margin-top: -22px;
  }
`
const belowTheFoldStyle = css`
  margin-top: 4rem;
`
// Syndicated Article Freestar placement IDs
const ABOVE_THE_FOLD = IABFixedSize.Billboard
const BELOW_THE_FOLD = IABFixedSize.Billboard
const RIGHT_RAIL_1_ID = IABFixedSize.Skyscaper
const RIGHT_RAIL_2_ID = IABFixedSize.Skyscaper

export function AdAboveTheFold({ allowAds, targeting }) {
  return allowAds ? (
    <AdSlot
      placementName={ABOVE_THE_FOLD}
      targeting={targeting}
      instanceStyles={aboveTheFoldStyle}
    />
  ) : null
}

export function AdBelowTheFold({ allowAds, targeting }) {
  return allowAds ? (
    <AdSlot
      placementName={BELOW_THE_FOLD}
      targeting={targeting}
      instanceStyles={belowTheFoldStyle}
    />
  ) : null
}

export function AdRailTop({ allowAds, targeting }) {
  return allowAds ? (
    <div className={adRailStyle}>
      <AdSlot placementName={RIGHT_RAIL_1_ID} targeting={targeting} />
    </div>
  ) : null
}

export function AdRailBottom({ allowAds, targeting }) {
  return allowAds ? (
    <div className={adRailStyle}>
      <AdSlot placementName={RIGHT_RAIL_2_ID} targeting={targeting} />
    </div>
  ) : null
}
