import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'
import { featuresToggle } from 'connectors/feature-flags/feature-flags.state'

const featureStyles = css`
  h6 {
    font-weight: 600;
  }
  .flags {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
  }
`

export function Features() {
  const features = useSelector((state) => state.features)
  const featureList = Object.keys(features)

  return (
    <div className={featureStyles}>
      <h6>Feature Flags</h6>
      <div className="flags">
        {featureList.length
          ? featureList.map((feature) => <FeatureToggle feature={feature} key={feature} />)
          : null}
      </div>
    </div>
  )
}

function FeatureToggle({ feature }) {
  const dispatch = useDispatch()

  const featureAssigned = useSelector((state) => state.features[feature].active)
  const handleChange = () => dispatch(featuresToggle(feature))

  return (
    <div>
      <input type="checkbox" id={feature} checked={featureAssigned} onChange={handleChange} />
      <label htmlFor={feature}>{feature}</label>
    </div>
  )
}
