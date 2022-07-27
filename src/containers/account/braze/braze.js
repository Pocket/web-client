import { Braze as BrazeComp } from 'components/account/braze/braze'
import { useSelector, useDispatch } from 'react-redux'
import { toggleBraze } from 'connectors/third-party/braze.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Braze = () => {
  const dispatch = useDispatch()
  const subscribed = useSelector((state) => state?.userBraze?.brazeSubscribed)

  // Remove when Braze launches
  const featureState = useSelector((state) => state.features)
  const showBraze = featureFlagActive({ flag: 'lab.braze', featureState })

  const onBrazeToggle = () => dispatch(toggleBraze())

  return showBraze ? (
    <BrazeComp
      subscribed={subscribed}
      onBrazeToggle={onBrazeToggle}
    />
  ) : null
}
