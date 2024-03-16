import { Braze as BrazeComp } from 'components/account/braze/braze'
import { useSelector, useDispatch } from 'react-redux'
import { toggleBraze } from 'connectors/third-party/braze.state'

export const Braze = () => {
  const dispatch = useDispatch()
  const subscribed = useSelector((state) => state?.braze?.brazeSubscribed)

  const onBrazeToggle = () => dispatch(toggleBraze())

  return <BrazeComp subscribed={subscribed} onBrazeToggle={onBrazeToggle} />
}
