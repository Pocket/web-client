'use client'

import { css } from '@emotion/css'
import { AdSlot, Placements } from 'components/programmatic-ad/mozads-ad-slot'
import { useViewport } from 'components/viewport-provider/viewport-provider'

/**
 * We assume user is premium, and if not this provides a smoother
 * transition into showing the ad.
 */
const adCollapseWrapper = css`
  display: grid;
  grid-template-rows: 1fr;
  justify-content: center;
  transition: grid-template-rows 250ms ease-in-out;
  &.isCollapsed {
    grid-template-rows: 0fr;
  }
  .inner {
    overflow: hidden;
  }
`

/**
 * Baseline styles for above the fold content ads.
 */
const aboveTheFoldStyle = css`
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-dividerSecondary);
`

/**
 * Sticky rails, this lets us load multiple rail ads and have them just get
 * out of each others way
 */
const adRailStyle = css`
  & > div {
    position: sticky;
    top: 6rem;
    margin: 0 0 4rem;
    margin-top: -22px;
  }
`

/**
 * Suprisingly, this defines styles for ads below the fold
 */
const belowTheFoldStyle = css`
  margin-top: 4rem;
`

/**
 * BillboardAboveTheFold
 * ---
 * Full size horizontal ad
 * This ad collapses so there isn't a big screen jump since it sits above the content
 */
export function BillboardAboveTheFold({ isMobile, allowAds, resolved, targeting }) {
  const collapse = allowAds && resolved
  const viewport = useViewport()
  const showMobile = viewport.width < 600 || isMobile
  const placement = showMobile ? Placements.ABOVE_THE_FOLD_MOBILE : Placements.ABOVE_THE_FOLD

  return (
    <div className={`${adCollapseWrapper} ${collapse ? null : 'isCollapsed'}`}>
      <div className="inner">
        {allowAds ? (
          <AdSlot placement={placement} targeting={targeting} instanceStyles={aboveTheFoldStyle} />
        ) : null}
      </div>
    </div>
  )
}

/**
 * BillboardBelowTheFold
 * ---
 * You are never gonna believe what this one does!
 */
export function BillboardBelowTheFold({ isMobile, allowAds, targeting }) {
  const viewport = useViewport()
  const showMobile = viewport.width < 600 || isMobile
  const placement = showMobile ? Placements.BELOW_THE_FOLD_MOBILE : Placements.BELOW_THE_FOLD

  return allowAds ? (
    <AdSlot placement={placement} targeting={targeting} instanceStyles={belowTheFoldStyle} />
  ) : null
}

export function AdRailTop({ allowAds, targeting }) {
  return allowAds ? (
    <div className={adRailStyle}>
      <AdSlot placement={Placements.RIGHT_RAIL_1} targeting={targeting} />
    </div>
  ) : null
}

export function AdRailBottom({ allowAds, targeting }) {
  return allowAds ? (
    <div className={adRailStyle}>
      <AdSlot placement={Placements.RIGHT_RAIL_2} targeting={targeting} />
    </div>
  ) : null
}
