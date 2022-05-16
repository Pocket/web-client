import { css } from 'linaria'
import { AdSlot } from 'components/programmatic-ad/ad-slot'
import { AD_TYPE_VERTICAL } from 'components/programmatic-ad/ad-constants'
import { AD_TYPE_HORIZONTAL_LG } from 'components/programmatic-ad/ad-constants'
import { AD_TYPE_HORIZONTAL_M } from 'components/programmatic-ad/ad-constants'
import { POCKET_AD_UNIT_PATH } from 'components/programmatic-ad/ad-constants'

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

// Syndicated Article Ad IDs
const ABOVE_THE_FOLD = 'div-gpt-ad-6843487-1'
const RIGHT_RAIL_1_ID = 'div-gpt-ad-6843487-2'
const RIGHT_RAIL_2_ID = 'div-gpt-ad-6843487-7'
const BELOW_THE_FOLD = 'div-gpt-ad-6843487-4'
// unused ad slots
// const MIDDLE_OF_ARTICLE = 'div-gpt-ad-6843487-3'
// const NATIVE_SYNDICATION = 'div-gpt-ad-6843487-5'
// const NATIVE_FRONT_DOOR = 'div-gpt-ad-6843487-6'

export function AdAboveTheFold({ allowAds, adsReady, ...adTargetingMetadata }) {
  return allowAds ? (
    <AdSlot
      id={ABOVE_THE_FOLD}
      positionAlias="ATF"
      type={AD_TYPE_HORIZONTAL_LG}
      adUnitPath={POCKET_AD_UNIT_PATH}
      adTargetingMetadata={adTargetingMetadata}
      adsReady={adsReady}
      instanceStyles={aboveTheFoldStyle}
    />
  ) : null
}

export function AdBelowTheFold({ allowAds, adsReady, ...adTargetingMetadata }) {
  return allowAds ? (
    <AdSlot
      id={BELOW_THE_FOLD}
      positionAlias="BTF"
      type={AD_TYPE_HORIZONTAL_M}
      adUnitPath={POCKET_AD_UNIT_PATH}
      adTargetingMetadata={adTargetingMetadata}
      adsReady={adsReady}
      instanceStyles={belowTheFoldStyle}
    />
  ) : null
}

export function AdRailTop({ allowAds, adsReady, ...adTargetingMetadata }) {
  return allowAds ? (
    <div className={adRailStyle}>
      <AdSlot
        id={RIGHT_RAIL_1_ID}
        positionAlias="RightRail1"
        type={AD_TYPE_VERTICAL}
        adUnitPath={POCKET_AD_UNIT_PATH}
        adTargetingMetadata={adTargetingMetadata}
        allowAds={allowAds}
        adsReady={adsReady}
      />
    </div>
  ) : null
}

export function AdRailBottom({ allowAds, adsReady, ...adTargetingMetadata }) {
  return allowAds ? (
    <div className={adRailStyle}>
      <AdSlot
        id={RIGHT_RAIL_2_ID}
        positionAlias="RightRail2"
        type={AD_TYPE_VERTICAL}
        adUnitPath={POCKET_AD_UNIT_PATH}
        adTargetingMetadata={adTargetingMetadata}
        allowAds={allowAds}
        adsReady={adsReady}
      />
    </div>
  ) : null
}
