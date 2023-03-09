import { GlobalNavAdd as GlobalNavAddComponent } from 'components/global-nav/tools/add/global-nav-add'
import { useDispatch, useSelector } from 'react-redux'
import { mutationUpsert } from 'connectors/items/mutation-upsert.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function GlobalNavAdd({ onClose }) {
  const dispatch = useDispatch()
  const { filters, sort } = useSelector((state) => state.pageSavedInfo)

  const onSubmit = (url) => {
    dispatch(sendSnowplowEvent('global-nav.save', { url }))
    dispatch(mutationUpsert(url, filters, sort))
  }
  return <GlobalNavAddComponent onClose={onClose} onSubmit={onSubmit} />
}
