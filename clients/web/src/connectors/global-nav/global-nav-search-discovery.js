import GlobalNavSearch from 'components/global-nav/tools/search/global-nav-search'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getRecentSearch } from 'connectors/search/search.state'
import { saveRecentSearch } from 'connectors/search/search.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { useDispatch, useSelector } from 'react-redux'

function GlobalNavSearchDiscoveryConnected({ onClose }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const isPremium = useSelector((state) => parseInt(state?.user?.premium_status, 10) === 1 || false) //prettier-ignore
  const recentSearches = useSelector((state) => state?.userSearch?.recent ) //prettier-ignore

  const onSubmit = (searchTerm) => {
    dispatch(sendSnowplowEvent('global-nav.search-discovery.submit', { value: searchTerm }))
    dispatch(saveRecentSearch(searchTerm))
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  useEffect(() => {
    dispatch(getRecentSearch())
  }, [dispatch])

  return (
    <GlobalNavSearch
      onClose={onClose}
      onSubmit={onSubmit}
      discovery={true}
      recentSearches={recentSearches}
      isPremium={isPremium}
    />
  )
}

export default GlobalNavSearchDiscoveryConnected
