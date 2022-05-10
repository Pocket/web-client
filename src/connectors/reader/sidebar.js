import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { Sidebar } from 'components/reader/sidebar'

import { toggleSidebar } from 'containers/read/read.state'
import { deleteHighlightRequest } from 'containers/read/read.state'
import { shareAction } from 'connectors/share-modal/share-modal.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const SidebarWrapper = ({ id }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.reader.articleItem)
  const savedData = useSelector((state) => state.reader.savedData)
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
    dispatch(deleteHighlightRequest({ annotationId }))
  }

  return (
    <div className={classNames('sidebar-anchor', { active: sideBarOpen })}>
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
