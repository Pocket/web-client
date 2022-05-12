import PropTypes from 'prop-types'
import { AdSlot } from './ad-slot'

import { POCKET_AD_UNIT_PATH } from './ad-helpers'

export const AD_TYPE_VERTICAL = 'vertical'
export const AD_TYPE_HORIZONTAL_LG = 'horizontal-large'
export const AD_TYPE_HORIZONTAL_M = 'horizontal-medium'

// This is a pure convenience method to avoid loading ads when they are not suppose to show
export const ProgrammaticAd = (props) => {
  const { allowAds } = props
  return allowAds ? <AdSlot {...props} /> : null
}

export default ProgrammaticAd

ProgrammaticAd.propTypes = {
  id: PropTypes.string.isRequired, //The ID attached to the div where the ad will be loaded. Also referenced in its respective config
  type: PropTypes.oneOf([AD_TYPE_VERTICAL, AD_TYPE_HORIZONTAL_M, AD_TYPE_HORIZONTAL_LG]).isRequired, //A string describing which ad sizes to map to this ad slot
  positionAlias: PropTypes.string, //A name given to the ad, able to be tracked by the programmatic team for their forecasting and analytics
  adUnitPath: PropTypes.string, //A string full path of the ad unit with the network code and unit code
  adLabel: PropTypes.string, //A string to be used for the ad label
  instanceStyles: PropTypes.string, //A Linaria css`` ruleset to be used as additional styling for the ad instance
  refreshRate: PropTypes.number //Refresh rate of an ad slot in seconds. If provided, this ad is permitted to refresh at the given interval
}

ProgrammaticAd.defaultProps = {
  positionAlias: 'NO-POSITION-GIVEN',
  adUnitPath: POCKET_AD_UNIT_PATH,
  adLabel: 'Advertisement',
  instanceStyles: null,
  refreshRate: null
}
