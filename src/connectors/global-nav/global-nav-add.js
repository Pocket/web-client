import GlobalNavAdd from 'components/global-nav/tools/add/global-nav-add'
import { useDispatch, useSelector } from 'react-redux'
import { itemAddAction } from 'connectors/items-by-id/saves/items.add'
import { mutationUpsert } from 'connectors/items/mutation-upsert.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

function GlobalNavAddConnected({ onClose }) {
  const dispatch = useDispatch()

  const featureState = useSelector((state) => state.features)
  const { filters, sort } = useSelector((state) => state.pageSavedInfo)
  const useApiNext = featureFlagActive({ flag: 'api.next', featureState })

  const saveFunction = useApiNext ? mutationUpsert : itemAddAction
  const onSubmit = (url) => {
    dispatch(sendSnowplowEvent('global-nav.save', { url }))
    dispatch(saveFunction(url, filters, sort))
  }
  return <GlobalNavAdd onClose={onClose} onSubmit={onSubmit} />
}

export default GlobalNavAddConnected
