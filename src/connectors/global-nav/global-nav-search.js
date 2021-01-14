import GlobalNavSearch from 'components/global-nav/tools/search/global-nav-search'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { sendSearchEvent } from './global-nav.analytics'
import escape from 'validator/lib/escape'

function GlobalNavSearchConnected({ onClose }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const onSubmit = (searchTerm) => {
    dispatch(sendSearchEvent('global-nav.search'))
    router.push(`/my-list/search/?query=${escape(searchTerm)}`)
  }
  return <GlobalNavSearch onClose={onClose} onSubmit={onSubmit} />
}

export default GlobalNavSearchConnected
