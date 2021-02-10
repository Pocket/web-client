import GlobalNavSearch from 'components/global-nav/tools/search/global-nav-search'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getRecentSearch } from 'connectors/search/search.state'
import { saveRecentSearch } from 'connectors/search/search.state'
import { sendSearchEvent } from './global-nav.analytics'
import escape from 'validator/lib/escape'

function GlobalNavSearchConnected({ onClose }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const isPremium = useSelector((state) => parseInt(state?.user?.premium_status, 10) === 1 || false) //prettier-ignore
  const recentSearches = useSelector((state) => state?.userSearch?.recent ) //prettier-ignore

  const onSubmit = (searchTerm) => {
    dispatch(sendSearchEvent(searchTerm))
    dispatch(saveRecentSearch(searchTerm))
    router.push(`/my-list/search/?query=${escape(searchTerm)}`)
  }

  useEffect(() => {
    dispatch(getRecentSearch())
  }, [dispatch])

  return (
    <GlobalNavSearch
      recentSearches={recentSearches}
      onClose={onClose}
      onSubmit={onSubmit}
      isPremium={isPremium}
    />
  )
}

export default GlobalNavSearchConnected
