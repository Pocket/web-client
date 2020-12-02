import GlobalNavSearch from 'components/global-nav/tools/search/global-nav-search'
import { useRouter } from 'next/router'
import escape from 'validator/lib/escape'

function GlobalNavSearchConnected({ onClose }) {
  const router = useRouter()
  const onSubmit = (searchTerm) => {
    router.push(`/my-list/search/?query=${escape(searchTerm)}`)
  }
  return <GlobalNavSearch onClose={onClose} onSubmit={onSubmit} />
}

export default GlobalNavSearchConnected
