import { useDispatch, useSelector } from 'react-redux'
import { ReaderNav } from 'components/reader/nav'

import { setColorMode } from 'connectors/app/app.state'
import { toggleSidebar } from 'containers/read/read.state'
import { favoriteItem } from 'containers/read/read.state'
import { unFavoriteItem } from 'containers/read/read.state'
import { archiveItem } from 'containers/read/read.state'
import { unArchiveItem } from 'containers/read/read.state'
import { mutationDelete } from 'connectors/items/mutation-delete.state'
import { mutationTagItem } from 'connectors/items/mutation-tagging.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const Toolbar = ({ id }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.reader.articleItem)
  const savedData = useSelector((state) => state.reader.savedData)
  const sideBarOpen = useSelector((state) => state.reader.sideBarOpen)

  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const colorMode = useSelector((state) => state?.app?.colorMode)

  // Display settings
  const lineHeight = useSelector((state) => state.reader.lineHeight)
  const columnWidth = useSelector((state) => state.reader.columnWidth)
  const fontSize = useSelector((state) => state.reader.fontSize)
  const fontFamily = useSelector((state) => state.reader.fontFamily)

  const { analyticsData } = item

  const {
    isArchived,
    isFavorite,
    tags
  } = savedData

  const handleSidebarToggle = () => dispatch(toggleSidebar())

  const itemTag = () => {
    dispatch(sendSnowplowEvent('reader.tag', analyticsData))
    dispatch(mutationTagItem(id, tags))
  }

  const itemShare = ({ quote }) => {
    dispatch(sendSnowplowEvent('reader.share', analyticsData))
    // dispatch(itemsShareAction({ id, quote }))
  }

  const itemDelete = () => {
    dispatch(sendSnowplowEvent('reader.delete', analyticsData))
    dispatch(mutationDelete(id))
  }

  const toggleFavorite = () => {
    const favoriteAction = isFavorite ? unFavoriteItem : favoriteItem
    const identifier = isFavorite ? 'reader.un-favorite' : 'reader.favorite'
    dispatch(sendSnowplowEvent(identifier, analyticsData))
    dispatch(favoriteAction(id))
  }

  const itemArchive = () => {
    const archiveAction = isArchived ? unArchiveItem : archiveItem
    const identifier = isArchived ? 'reader.un-archive' : 'reader.archive'
    dispatch(sendSnowplowEvent(identifier, analyticsData))
    dispatch(archiveAction(id))
  }

  const handleImpression = (identifier) => {
    dispatch(sendSnowplowEvent(identifier))
  }

  const setAppColorMode = (colorMode) => dispatch(setColorMode(colorMode))

  return (
    <ReaderNav
      isPremium={isPremium}
      sideBarOpen={sideBarOpen}
      toggleSidebar={handleSidebarToggle}
      toggleTagging={itemTag}
      toggleShare={itemShare}
      toggleDelete={itemDelete}
      toggleFavorite={toggleFavorite}
      archiveItem={itemArchive}
      displaySettings={{ columnWidth, lineHeight, fontSize, fontFamily }}
      favorite={isFavorite}
      archive={isArchived}
      onVisible={handleImpression}
      colorMode={colorMode}
      setColorMode={setAppColorMode}
    />
  )
}
