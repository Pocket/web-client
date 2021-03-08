import { TagPageHeader as TagHeader } from 'components/headers/tag-page-header'
import { pinUserTag } from './tags-page.state'
import { editUserTag } from './tags-page.state'
import { deleteUserTag } from './tags-page.state'
import { useDispatch, useSelector } from 'react-redux'

// Experiment analytics
import { trackEngagement } from 'connectors/snowplow/snowplow.state'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { UI_COMPONENT_BUTTON } from 'connectors/snowplow/entities'

const shareEngagement = (tag) => (trackEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  0, // position in list (zero since it's not in list)
  'tag.collection.share',
  tag
))

export function TagPageHeader({ subset, title, filter, tag }) {
  const isPinned = useSelector(
    (state) => !!state.userTags.pinnedTags.includes(tag)
  )
  const dispatch = useDispatch()
  const editTag = () => dispatch(editUserTag(tag))
  const deleteTag = () => dispatch(deleteUserTag(tag))
  const pinTag = () => dispatch(pinUserTag(tag))
  const shareTag = () => dispatch(shareEngagement(tag))

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
