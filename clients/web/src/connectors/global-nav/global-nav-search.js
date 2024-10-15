import GlobalNavSearch from 'components/global-nav/tools/search/global-nav-search'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getRecentSearch } from 'connectors/search/search.state'
import { saveRecentSearch } from 'connectors/search/search.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { useDispatch, useSelector } from 'react-redux'

function GlobalNavSearchConnected({ onClose, searchEnrolled, fromSaves }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const isPremium = useSelector((state) => parseInt(state?.user?.premium_status, 10) === 1 || false) //prettier-ignore
  const recentSearches = useSelector((state) => state?.userSearch?.recent ) //prettier-ignore

  const baseQuery = searchEnrolled ? '/search?q' : '/saves/search/?query'
  const saveType = fromSaves ? '&st=saves' : '&st=all'
  const enrolledId = fromSaves ? 'global-nav.search.global.submit' : 'global-nav.search.save.submit'
  const snowplowId = searchEnrolled ? enrolledId : 'global-nav.search.submit'

  const onSubmit = (searchTerm) => {
    dispatch(sendSnowplowEvent(snowplowId, { value: searchTerm }))
    dispatch(saveRecentSearch(searchTerm))
    router.push(`${baseQuery}=${encodeURIComponent(searchTerm)}${saveType}`)
  }

  useEffect(() => {
    dispatch(getRecentSearch())
  }, [dispatch])

  return (
    <GlobalNavSearch
      discovery={searchEnrolled}
      recentSearches={recentSearches}
      onClose={onClose}
      onSubmit={onSubmit}
      isPremium={isPremium}
    />
  )
}

export default GlobalNavSearchConnected
