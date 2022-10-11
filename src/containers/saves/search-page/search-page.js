// Vendor
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useHasChanged } from 'common/utilities/hooks/has-changed'
import { getSavesSearchData } from 'containers/saves/saves.state'
import { appSetSection } from 'connectors/app/app.state'
import { VirtualizedList } from 'connectors/virtualized/virtualized-list'

export default function Collection(props) {
  const { filter } = props

  const dispatch = useDispatch()
  const router = useRouter()

  const { query } = router.query
  const queryChange = useHasChanged(query)
  const subset = 'search'

  const section = filter ? subset + filter : subset

  const items = useSelector((state) => state.saves[section])
  const offset = useSelector((state) => state.saves[`${section}Offset`])
  const total = useSelector((state) => state.saves[`${section}Total`])
  const prevQuery = useSelector((state) => state.saves.query)
  const listMode = useSelector((state) => state.app.listMode)
  const userStatus = useSelector((state) => state.user.user_status)
  const sortSubset = useSelector((state) => state.app.section)
  const sortOrder = useSelector((state) => state.app.sortOptions[sortSubset] || 'newest')

  // Check for initial items so we don't over request
  const initialItemsPopulated = items?.length || total === 0

  /**
   * Get initial list items. This should only fire once per page load
   * despite the exhaustive dependencies
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    if (userStatus === 'pending' || !query || initialItemsPopulated) return
    dispatch(getSavesSearchData(filter, query))
    dispatch(appSetSection(section))
  }, [userStatus, subset, sortOrder, filter, section, query, initialItemsPopulated, dispatch])

  useEffect(() => {
    if (queryChange || prevQuery !== query) {
      dispatch(getSavesSearchData(filter, query))
    }
  }, [queryChange, prevQuery, dispatch, filter, query])

  /**
   * FUNCTIONAL ACTIONS
   * ------------------------------------------------------------------------
   */
  const loadMore = () => {
    if (offset >= total) return
    dispatch(getSavesSearchData(filter, query, offset))
  }

  const type = listMode

  return items?.length ? (
    <VirtualizedList type={type} section={section} loadMore={loadMore} />
  ) : null
}
