import GlobalNavAdd from 'components/global-nav/tools/add/global-nav-add'
import { useDispatch, useSelector } from 'react-redux'
import { mutationUpsert } from 'connectors/items/mutation-upsert.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

function GlobalNavAddConnected({ onClose }) {
  const dispatch = useDispatch()
  const { filters, sort } = useSelector((state) => state.pageSavedInfo)

  const onSubmit = (url) => {
    dispatch(sendSnowplowEvent('global-nav.save', { url }))
    dispatch(mutationUpsert(url, filters, sort))
  }
  return <GlobalNavAdd onClose={onClose} onSubmit={onSubmit} />
}

export default GlobalNavAddConnected
