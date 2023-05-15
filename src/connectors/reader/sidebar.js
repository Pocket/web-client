import { useDispatch, useSelector } from 'react-redux'
import { Sidebar } from 'components/reader/sidebar'
import { cx } from '@emotion/css'
import { toggleSidebar } from 'containers/read/reader.state'
import { mutationHighlightDelete } from 'connectors/items/mutation-highlight.state'
import { shareAction } from 'connectors/items/mutation-share.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const SidebarWrapper = ({ id }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.itemsDisplay[id])
  const savedData = useSelector((state) => state.itemsSaved[id])
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const sideBarOpen = useSelector((state) => state.reader.sideBarOpen)
  const highlightList = useSelector((state) => state.reader.highlightList)

  const { analyticsData } = item
  const { annotations } = savedData
  const highlights = annotations?.highlights || []

  const handleSidebarToggle = () => dispatch(toggleSidebar())

  const handleImpression = (identifier) => {
    dispatch(sendSnowplowEvent(identifier))
  }

  const itemShare = ({ quote }) => {
    dispatch(sendSnowplowEvent('reader.share', analyticsData))
    dispatch(shareAction({ item, quote }))
  }

  const removeAnnotation = (annotationId) => {
    dispatch(sendSnowplowEvent('reader.remove-highlight', analyticsData))
    dispatch(mutationHighlightDelete({ annotationId, savedItemId: id }))
  }

  return (
    <div className={cx('sidebar-anchor', sideBarOpen && 'active')}>
      <Sidebar
        isPremium={isPremium}
        sideBarOpen={sideBarOpen}
        toggleSidebar={handleSidebarToggle}
        highlightList={highlightList}
        annotationCount={highlights?.length}
        deleteAnnotation={removeAnnotation}
        shareItem={itemShare}
        handleImpression={handleImpression}
      />
    </div>
  )
}
