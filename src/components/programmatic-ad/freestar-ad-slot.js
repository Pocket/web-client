import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import FreestarAdSlot from '@freestar/pubfig-adslot-react-component'

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

const FREESTAR_PUBLISHER_NAME = 'getpocket-com'

export function AdSlot({ placementName, targeting, instanceStyles }) {
  const { t } = useTranslation()
  const adLabel = t('ad:label', 'Advertisement')

  return (
    <div className={`${programmaticAdWrapperStyles} 'syndication-ad' ${instanceStyles}`}>
      <FreestarAdSlot
        publisher={FREESTAR_PUBLISHER_NAME}
        placementName={placementName}
        targeting={targeting}
      />
      <p className="label">{adLabel}</p>
    </div>
  )
}

AdSlot.propTypes = {
  // A string of the ad unit placement, which will be provided by Freestar
  placementName: PropTypes.string.isRequired,
  // An *optional* object of key/value pairs for targeting.
  targeting: PropTypes.object,
  // An *optional* classname to add to the ad container
  instanceStyles: PropTypes.string
}
