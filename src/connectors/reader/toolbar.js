import { useDispatch, useSelector } from 'react-redux'
import { ReaderNav } from 'components/reader/nav'

import { setColorMode } from 'connectors/app/app.state'
import { toggleSidebar } from 'containers/read/reader.state'

import { mutationFavorite } from 'connectors/items/mutation-favorite.state'
import { mutationUnFavorite } from 'connectors/items/mutation-favorite.state'
import { mutationArchive } from 'connectors/items/mutation-archive.state'
import { mutationDelete } from 'connectors/items/mutation-delete.state'
import { mutationUnArchive } from 'connectors/items/mutation-archive.state'
import { mutationTagItem } from 'connectors/items/mutation-tagging.state'

import { updateLineHeight } from 'containers/read/reader-settings.state'
import { updateColumnWidth } from 'containers/read/reader-settings.state'
import { updateFontSize } from 'containers/read/reader-settings.state'
import { updateFontType } from 'containers/read/reader-settings.state'

import { shareAction } from 'connectors/items/mutation-share.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const Toolbar = ({ id }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.itemsDisplay[id])
  const savedData = useSelector((state) => state.itemsSaved[id])
  const sideBarOpen = useSelector((state) => state.reader.sideBarOpen)

  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const colorMode = useSelector((state) => state?.app?.colorMode)

  // Display settings
  const lineHeight = useSelector((state) => state.readerSettings.lineHeight)
  const columnWidth = useSelector((state) => state.readerSettings.columnWidth)
  const fontSize = useSelector((state) => state.readerSettings.fontSize)
  const fontFamily = useSelector((state) => state.readerSettings.fontFamily)

  const { analyticsData } = item

  const { isArchived, isFavorite, tags } = savedData

  const handleSidebarToggle = () => dispatch(toggleSidebar())

  const itemTag = () => {
    dispatch(sendSnowplowEvent('reader.tag', analyticsData))
    dispatch(mutationTagItem(id, tags))
  }

  const itemShare = ({ quote }) => {
    dispatch(sendSnowplowEvent('reader.share', analyticsData))
    dispatch(shareAction({ item, quote }))
  }

  const itemDelete = () => {
    dispatch(sendSnowplowEvent('reader.delete', analyticsData))
    dispatch(mutationDelete(id))
  }

  const toggleFavorite = () => {
    const favoriteAction = isFavorite ? mutationUnFavorite : mutationFavorite
    const identifier = isFavorite ? 'reader.un-favorite' : 'reader.favorite'
    dispatch(sendSnowplowEvent(identifier, analyticsData))
    dispatch(favoriteAction(id))
  }

  const itemArchive = () => {
    const archiveAction = isArchived ? mutationUnArchive : mutationArchive
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
      updateLineHeight={updateLineHeight}
      updateColumnWidth={updateColumnWidth}
      updateFontSize={updateFontSize}
      updateFontType={updateFontType}
    />
  )
}
