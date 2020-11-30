import { TagPageHeader as TagHeader } from 'components/headers/tag-page-header'
import { pinUserTag } from './tags-page.state'
import { editUserTag } from './tags-page.state'
import { useDispatch, useSelector } from 'react-redux'

export function TagPageHeader({ subset, title, filter, tag }) {
  const isPinned = useSelector(
    (state) => !!state.userTags.pinnedTags.includes(tag)
  )
  const dispatch = useDispatch()
  const editTag = () => dispatch(editUserTag(tag))
  const pinTag = () => dispatch(pinUserTag(tag))

  return subset && tag ? (
    <TagHeader
      subset={subset}
      title={title}
      filter={filter}
      tag={tag}
      editTag={editTag}
      pinTag={pinTag}
      isPinned={isPinned}
    />
  ) : null
}
