import { useSelector, useDispatch } from 'react-redux'
import { css } from '@emotion/css'
import { updateFilter } from './items-filter.state'

import { FilterSearch } from './filter-search'
import { FilterTitle } from './filter-title'
import { FilterTags } from './filter-tags'
import { FilterStatus } from './filter-status'

const headerWrapper = css`
  p {
    margin-top: 8px;
    font-size: 14px;
    font-style: italic;
    color: var(--color-textSecondary);
  }
`

export const FilterHeader = () => {
  const dispatch = useDispatch()

  const totalCount = useSelector((state) => state.pageSavedInfo.totalCount)
  const loading = useSelector((state) => state.pageSavedInfo.loading)

  const handleTagsUpdate = (passedTags) => {
    const tags = passedTags.length === 0 ? null : passedTags
    dispatch(updateFilter({ tags }))
  }

  const handleSearchUpdate = (searchTerm) => {
    dispatch(updateFilter({ searchTerm }))
  }

  const handleTitleUpdate = (title) => {
    dispatch(updateFilter({ title }))
  }

  const handleStatusUpdate = (status) => {
    dispatch(updateFilter({ status }))
  }

  return (
    <header className={headerWrapper}>
      <FilterSearch handleUpdate={handleSearchUpdate} />
      {/* <FilterTitle handleUpdate={handleTitleUpdate} /> */}
      <FilterTags handleUpdate={handleTagsUpdate} />

      {/* <FilterStatus handleUpdate={handleStatusUpdate} /> */}

      <p>{loading ? null : <i>{totalCount} items</i>}</p>
    </header>
  )
}
