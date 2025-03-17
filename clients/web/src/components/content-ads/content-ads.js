import { css } from '@emotion/css'
import { AdSlot } from 'components/programmatic-ad/mozads-ad-slot'

import { IABFixedSize } from '@mozilla-services/ads-sdk/dist/core'

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

// Syndicated Article MozAds placements
const ABOVE_THE_FOLD_MARS_ID = "pocket_billboard_1"
const BELOW_THE_FOLD_MARS_ID = "pocket_billboard_2"
const ABOVE_THE_FOLD_MOBILE_MARS_ID = "pocket_mrec_1"
const BELOW_THE_FOLD_MOBILE_MARS_ID = "pocket_mrec_2"
const RIGHT_RAIL_1_MARS_ID = "pocket_skyscraper_1"
const RIGHT_RAIL_2_MARS_ID = "pocket_skyscraper_2"

let placements = {}
placements[ABOVE_THE_FOLD_MARS_ID] = IABFixedSize.Billboard,
placements[BELOW_THE_FOLD_MARS_ID] = IABFixedSize.Billboard,
placements[ABOVE_THE_FOLD_MOBILE_MARS_ID] = IABFixedSize.MediumRectangle
placements[BELOW_THE_FOLD_MOBILE_MARS_ID] = IABFixedSize.MediumRectangle
placements[RIGHT_RAIL_1_MARS_ID] = IABFixedSize.Skyscaper,
placements[RIGHT_RAIL_2_MARS_ID] = IABFixedSize.Skyscaper

export function BillboardAboveTheFold({ allowAds, targeting }) {
  return allowAds ? (
    <AdSlot
      placementId={ABOVE_THE_FOLD_MARS_ID}
      placementName={placements[ABOVE_THE_FOLD_MARS_ID]}
      targeting={targeting}
      instanceStyles={aboveTheFoldStyle}
    />
  ) : null
}

export function BillboardBelowTheFold({ allowAds, targeting }) {
  return allowAds ? (
    <AdSlot
      placementId={BELOW_THE_FOLD_MARS_ID}
      placementName={placements[BELOW_THE_FOLD_MARS_ID]}
      targeting={targeting}
      instanceStyles={belowTheFoldStyle}
    />
  ) : null
}

export function RectangleAboveTheFold({ allowAds, targeting }) {
  return allowAds ? (
    <AdSlot
      placementId={ABOVE_THE_FOLD_MOBILE_MARS_ID}
      placementName={placements[ABOVE_THE_FOLD_MOBILE_MARS_ID]}
      targeting={targeting}
      instanceStyles={aboveTheFoldStyle}
    />
  ) : null
}

export function RectangleBelowTheFold({ allowAds, targeting }) {
  return allowAds ? (
    <AdSlot
      placementId={BELOW_THE_FOLD_MOBILE_MARS_ID}
      placementName={placements[BELOW_THE_FOLD_MOBILE_MARS_ID]}
      targeting={targeting}
      instanceStyles={belowTheFoldStyle}
    />
  ) : null
}

export function AdRailTop({ allowAds, targeting }) {
  return allowAds ? (
    <div className={adRailStyle}>
      <AdSlot
        placementId={RIGHT_RAIL_1_MARS_ID}
        placementName={placements[RIGHT_RAIL_1_MARS_ID]}
        targeting={targeting} />
    </div>
  ) : null
}

export function AdRailBottom({ allowAds, targeting }) {
  return allowAds ? (
    <div className={adRailStyle}>
      <AdSlot
        placementId={RIGHT_RAIL_2_MARS_ID}
        placementName={placements[RIGHT_RAIL_2_MARS_ID]}
        targeting={targeting} />
    </div>
  ) : null
}
