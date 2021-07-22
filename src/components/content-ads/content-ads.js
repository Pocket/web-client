import { css } from 'linaria'
import ProgrammaticAd from 'components/programmatic-ad/programmatic-ad'
import { AD_TYPE_VERTICAL } from 'components/programmatic-ad/programmatic-ad'
import { AD_TYPE_HORIZONTAL_LG } from 'components/programmatic-ad/programmatic-ad'
import { AD_TYPE_HORIZONTAL_M } from 'components/programmatic-ad/programmatic-ad'

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

export function AdAboveTheFold({ allowAds, usePersonalized, ...adTargetingMetadata }) {
  return (
    <ProgrammaticAd
      usePersonalized={usePersonalized}
      id={ABOVE_THE_FOLD}
      positionAlias="ATF"
      type={AD_TYPE_HORIZONTAL_LG}
      adTargetingMetadata={adTargetingMetadata}
      showAd={allowAds}
      instanceStyles={aboveTheFoldStyle}
    />
  )
}

export function AdBelowTheFold({ allowAds, usePersonalized, ...adTargetingMetadata }) {
  return (
    <ProgrammaticAd
      usePersonalized={usePersonalized}
      id={BELOW_THE_FOLD}
      positionAlias="BTF"
      type={AD_TYPE_HORIZONTAL_M}
      adTargetingMetadata={adTargetingMetadata}
      showAd={allowAds}
      instanceStyles={belowTheFoldStyle}
    />
  )
}

export function AdRailTop({ allowAds, usePersonalized, ...adTargetingMetadata }) {
  return (
    <div className={adRailStyle}>
      <ProgrammaticAd
        usePersonalized={usePersonalized}
        id={RIGHT_RAIL_1_ID}
        positionAlias="RightRail1"
        type={AD_TYPE_VERTICAL}
        adTargetingMetadata={adTargetingMetadata}
        showAd={allowAds}
      />
    </div>
  )
}

export function AdRailBottom({ allowAds, usePersonalized, ...adTargetingMetadata }) {
  return (
    <div className={adRailStyle}>
      <ProgrammaticAd
        usePersonalized={usePersonalized}
        id={RIGHT_RAIL_2_ID}
        positionAlias="RightRail2"
        type={AD_TYPE_VERTICAL}
        adTargetingMetadata={adTargetingMetadata}
        showAd={allowAds}
      />
    </div>
  )
}
