import GlobalNavAdd from 'components/global-nav/tools/add/global-nav-add'
import { useDispatch } from 'react-redux'
import { itemAddAction } from 'connectors/items-by-id/my-list/items.add'
import { sendSaveEvent } from './global-nav.analytics'

function GlobalNavAddConnected({ onClose }) {
  const dispatch = useDispatch()

  const onSubmit = (url) => {
    // bool to denote save action, 0 is position which is required for engagement
    dispatch(sendSaveEvent(url))
    dispatch(itemAddAction(url))
  }
  return <GlobalNavAdd onClose={onClose} onSubmit={onSubmit} />
}

export default GlobalNavAddConnected
