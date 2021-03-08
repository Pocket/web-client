import { TagPageHeader as TagHeader } from 'components/headers/tag-page-header'
import { pinUserTag } from './tags-page.state'
import { editUserTag } from './tags-page.state'
import { deleteUserTag } from './tags-page.state'
import { useDispatch, useSelector } from 'react-redux'
import { sendShareEngagement } from './tags-page.analytics'

export function TagPageHeader({ subset, title, filter, tag }) {
  const isPinned = useSelector(
    (state) => !!state.userTags.pinnedTags.includes(tag)
  )
  const dispatch = useDispatch()
  const editTag = () => dispatch(editUserTag(tag))
  const deleteTag = () => dispatch(deleteUserTag(tag))
  const pinTag = () => dispatch(pinUserTag(tag))
  const shareTag = () => dispatch(sendShareEngagement(tag))

  return subset && tag ? (
    <TagHeader
      subset={subset}
      title={title}
      filter={filter}
      tag={tag}
      editTag={editTag}
      deleteTag={deleteTag}
      pinTag={pinTag}
      shareTag={shareTag}
      isPinned={isPinned}
    />
  ) : null
}
