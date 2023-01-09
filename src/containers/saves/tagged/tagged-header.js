import { TagPageHeader as TagHeader } from 'components/headers/tag-page-header'
import { pinUserTag } from './tagged-page.state'
import { editUserTag } from './tagged-page.state'
import { deleteUserTag } from './tagged-page.state'
import { useDispatch, useSelector } from 'react-redux'

export function TagPageHeader({
  subset,
  title,
  filter,
  tag,
  sortOrder,
  handleNewest,
  handleOldest
}) {
  const isPinned = useSelector((state) => !!state.settings.pinnedTags.includes(tag))
  const dispatch = useDispatch()
  const editTag = () => dispatch(editUserTag(tag))
  const deleteTag = () => dispatch(deleteUserTag(tag))
  const pinTag = () => dispatch(pinUserTag(tag))

  return subset && tag ? (
    <TagHeader
      subset={subset}
      title={title}
      filter={filter}
      tag={tag}
      editTag={editTag}
      deleteTag={deleteTag}
      pinTag={pinTag}
      isPinned={isPinned}
      sortOrder={sortOrder}
      handleNewest={handleNewest}
      handleOldest={handleOldest}
    />
  ) : null
}
