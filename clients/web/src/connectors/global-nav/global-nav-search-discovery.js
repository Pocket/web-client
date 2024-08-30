import GlobalNavSearch from 'components/global-nav/tools/search/global-nav-search'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getRecentSearch } from 'connectors/search/search.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

function GlobalNavSearchDiscoveryConnected({ onClose }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const onSubmit = (searchTerm) => {
    dispatch(sendSnowplowEvent('global-nav.search-discovery.submit', { value: searchTerm }))
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  useEffect(() => {
    dispatch(getRecentSearch())
  }, [dispatch])

  return <GlobalNavSearch onClose={onClose} onSubmit={onSubmit} />
}

export default GlobalNavSearchDiscoveryConnected
