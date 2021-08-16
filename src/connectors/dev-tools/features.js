import { useSelector, useDispatch } from 'react-redux'
import { featuresToggle } from 'connectors/feature-flags/feature-flags.state'

export function Features() {
  const features = useSelector((state) => state.features)
  const featureList = Object.keys(features)

  return featureList.length
    ? featureList.map((feature) => <FeatureToggle feature={feature} key={feature} />)
    : null
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
