import GlobalNavAdd from 'components/global-nav/tools/add/global-nav-add'
import { useDispatch } from 'react-redux'
import { itemAddAction } from 'connectors/items-by-id/my-list/items.add'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

function GlobalNavAddConnected({ onClose }) {
  const dispatch = useDispatch()

  const onSubmit = (url) => {
    dispatch(sendSnowplowEvent('global-nav.save', { url }))
    dispatch(itemAddAction(url))
  }
  return <GlobalNavAdd onClose={onClose} onSubmit={onSubmit} />
}

export default GlobalNavAddConnected
