import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { Loader, LoaderCentered } from 'components/loader/loader'
import { ReaderNav } from 'components/reader/nav'
import { ItemHeader } from 'components/reader/header'
import { SelectionPopover } from 'components/popover/popover-selection'
import { Sidebar } from 'components/reader/sidebar'
import { BottomUpsell } from 'components/reader/upsell.bottom'
import { Toasts } from 'connectors/toasts/toast-list'
import { compileAnnotations } from 'components/annotations/utilities'
import { requestAnnotationPatch } from 'components/annotations/utilities'
import { GoogleFonts, FONT_TYPES } from 'components/fonts/fonts'
import { ReaderFonts } from '@pocket/web-ui'
import { Recommendations } from 'containers/read/recommendations'

import { HighlightInlineMenu } from 'components/annotations/annotations.inline'
import { ModalLimitNotice as AnnotationsLimitModal } from 'components/annotations/annotations.limit'
import { saveAnnotation, deleteAnnotation } from './read.state'

import { setColorMode } from 'connectors/app/app.state'

import { getReadItem } from './read.state'

import { Content } from 'components/reader/content'

import { articleWrapperStyles } from './article-styles'

import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'

import { itemsDeleteAction } from 'connectors/items-by-id/my-list/items.delete'
import { itemsTagAction } from 'connectors/items-by-id/my-list/items.tag'
import { itemsShareAction } from 'connectors/items-by-id/my-list/items.share'

import { itemsFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsUnFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsArchiveAction } from 'connectors/items-by-id/my-list/items.archive'
import { itemsUnArchiveAction } from 'connectors/items-by-id/my-list/items.archive'

import { Onboarding } from 'connectors/onboarding/onboarding'

import { selectShortcutItem } from 'connectors/shortcuts/shortcuts.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const COLUMN_WIDTH_RANGE = [531, 574, 632, 718, 826, 933, 1041]
export const LINE_HEIGHT_RANGE = [1.2, 1.3, 1.4, 1.5, 1.65, 1.9, 2.5]
export const FONT_RANGE = [16, 19, 22, 25, 28, 32, 37]

export default function Reader() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug: id } = router.query

  const isPremium = useSelector((state) => state.user.premium_status === '1')

  // TODO: Remove articleData - still needed right now for externalUrl and analyticsData
  const articleData = useSelector((state) => state.myListItemsById[id])

  const articleItem = useSelector((state) => state.reader.articleItem)
  const savedData = useSelector((state) => state.reader.savedData)

  // Display settings
  const lineHeight = useSelector((state) => state.reader.lineHeight)
  const columnWidth = useSelector((state) => state.reader.columnWidth)
  const fontSize = useSelector((state) => state.reader.fontSize)
  const fontFamily = useSelector((state) => state.reader.fontFamily)
  const colorMode = useSelector((state) => state?.app?.colorMode)

  const [sideBarOpen, setSideBar] = useState(false)
  const [annotationLimitModal, setAnnotationLimitModal] = useState(false)
  const [highlight, setHighlight] = useState(null)
  const [highlightList, setHighlightList] = useState([])
  const [highlightHovered, setHighlightHovered] = useState(null)

  useEffect(() => {
    dispatch(getReadItem(id))
    dispatch(selectShortcutItem(id))
  }, [dispatch, id])

  if (!articleItem) {
    return (
      <LoaderCentered>
        <Loader isVisible />
      </LoaderCentered>
    )
  }

  const { itemId, article, authors, title, timeToRead, hasVideo, domainMetadata, images, videos } =
    articleItem

  const { isArchived, isFavorite, tags } = savedData
  const annotations = savedData.annotations.highlights
  const publisher = domainMetadata.name

  const tagList = tags
    ? tags.map((tag) => {
        return tag.name
      })
    : []

  // TODO: figure out what to do with these
  //       - derive item?
  //       - use another state besides reader?
  const { externalUrl, analyticsData } = articleData

  const headerData = {
    authors,
    title,
    externalUrl,
    publisher,
    tags: tagList,
    timeToRead
  }

  const customStyles = {
    maxWidth: `${COLUMN_WIDTH_RANGE[columnWidth]}px`,
    lineHeight: LINE_HEIGHT_RANGE[lineHeight],
    fontSize: `${FONT_RANGE[fontSize]}px`,
    fontFamily: FONT_TYPES[fontFamily].family
  }

  const toggleSidebar = () => setSideBar(!sideBarOpen)
  const closeAnnotationLimit = () => setAnnotationLimitModal(false)

  const toggleHighlight = () => {
    const selection = window.getSelection()
    if (selection.toString()) {
      setHighlight(selection)
    } else if (highlight) {
      setHighlight(null)
    }
  }

  const toggleHighlightHover = (e) => {
    if (e.type === 'mouseout') {
      setHighlightHovered(null)
    } else {
      setHighlightHovered({
        id: e.target.getAttribute('annotation_id'),
        event: e
      })
    }
  }

  const clearSelection = () => {
    window.getSelection().removeAllRanges()
    toggleHighlight()
  }

  const buildAnnotations = () => {
    const compiled = compileAnnotations(annotations)
    setHighlightList(compiled)
  }

  const analyticsInfo = { ...analyticsData, id: itemId }

  const addAnnotation = () => {
    if (annotations.length === 3 && !isPremium) {
      setAnnotationLimitModal(true)
    } else {
      dispatch(sendSnowplowEvent('reader.add-highlight', analyticsInfo))
      dispatch(
        saveAnnotation({
          id,
          patch: requestAnnotationPatch(highlight),
          quote: highlight.toString()
        })
      )
    }
  }

  const removeAnnotation = (annotation_id) => {
    dispatch(sendSnowplowEvent('reader.remove-highlight', analyticsInfo))
    dispatch(
      deleteAnnotation({
        id,
        annotation_id
      })
    )
  }

  // TODO: These actions need to be updated to use the new GraphQL Mutations
  const itemDelete = () => {
    dispatch(sendSnowplowEvent('reader.delete', analyticsInfo))
    dispatch(itemsDeleteAction([{ id }]))
  }
  const itemTag = () => {
    dispatch(sendSnowplowEvent('reader.tag', analyticsInfo))
    dispatch(itemsTagAction([{ id }]))
  }
  const itemShare = ({ quote }) => {
    dispatch(sendSnowplowEvent('reader.share', analyticsInfo))
    dispatch(itemsShareAction({ id, quote }))
  }
  const handleImpression = (identifier) => {
    dispatch(sendSnowplowEvent(identifier))
  }

  const archiveItem = () => {
    const archiveAction = isArchived ? itemsUnArchiveAction : itemsArchiveAction
    const identifier = isArchived ? 'reader.un-archive' : 'reader.archive'
    dispatch(sendSnowplowEvent(identifier, analyticsInfo))
    dispatch(archiveAction([{ id }]))
  }

  const toggleFavorite = () => {
    const favoriteAction = isFavorite ? itemsUnFavoriteAction : itemsFavoriteAction
    const identifier = isFavorite ? 'reader.un-favorite' : 'reader.favorite'
    dispatch(sendSnowplowEvent(identifier, analyticsInfo))
    dispatch(favoriteAction([{ id }]))
  }

  const externalLinkClick = (href) => {
    const data = { id: itemId, url: href }
    dispatch(sendSnowplowEvent('reader.external-link', data))
  }

  const viewOriginalEvent = () => {
    dispatch(sendSnowplowEvent('reader.view-original', analyticsInfo))
  }

  const setAppColorMode = (colorMode) => dispatch(setColorMode(colorMode))

  console.log('Client API')
  return (
    <>
      <Head>
        <title>Pocket - {title}</title>
      </Head>
      <ReaderNav
        isPremium={isPremium}
        toggleSidebar={toggleSidebar}
        toggleTagging={itemTag}
        toggleShare={itemShare}
        toggleDelete={itemDelete}
        toggleFavorite={toggleFavorite}
        archiveItem={archiveItem}
        displaySettings={{ columnWidth, lineHeight, fontSize, fontFamily }}
        favorite={isFavorite}
        archive={isArchived}
        onVisible={handleImpression}
        sideBarOpen={sideBarOpen}
        colorMode={colorMode}
        setColorMode={setAppColorMode}
      />

      <main className={articleWrapperStyles}>
        <div className={classNames('sidebar-anchor', { active: sideBarOpen })}>
          {articleItem ? (
            <Sidebar
              isPremium={isPremium}
              sideBarOpen={sideBarOpen}
              toggleSidebar={toggleSidebar}
              highlightList={highlightList}
              annotationCount={annotations?.length}
              shareItem={itemShare}
              deleteAnnotation={removeAnnotation}
              handleImpression={handleImpression}
            />
          ) : null}
        </div>
        <article
          className={classNames(
            ReaderFonts,
            GoogleFonts,
            'reader',
            hasVideo === 'IS_VIDEO' && 'is-video'
          )}
          style={customStyles}>
          <ItemHeader viewOriginalEvent={viewOriginalEvent} {...headerData} />

          {articleItem ? (
            <Content
              images={images}
              videos={videos}
              content={article}
              annotations={annotations}
              onMouseUp={toggleHighlight}
              onHighlightHover={toggleHighlightHover}
              annotationsBuilt={buildAnnotations}
              externalLinkClick={externalLinkClick}
            />
          ) : null}
          {highlight ? (
            <SelectionPopover
              anchor={highlight}
              disablePopup={clearSelection}
              addAnnotation={addAnnotation}
              shareItem={itemShare}
            />
          ) : null}
          {highlightList ? (
            <HighlightInlineMenu
              highlightList={highlightList}
              highlightHovered={highlightHovered}
              annotationCount={annotations?.length}
              shareItem={itemShare}
              isPremium={isPremium}
              deleteAnnotation={removeAnnotation}
            />
          ) : null}
        </article>
      </main>
      {articleItem ? <Recommendations id={itemId} /> : null}
      {!isPremium && articleItem ? (
        <BottomUpsell maxWidth={customStyles.maxWidth} onVisible={handleImpression} />
      ) : null}
      <AnnotationsLimitModal
        showModal={annotationLimitModal}
        closeModal={closeAnnotationLimit}
        onVisible={handleImpression}
      />
      <DeleteModal />
      <TaggingModal />
      <ShareModal />
      <Toasts />
      {articleItem ? <Onboarding type="reader.flyaway.apps" /> : null}
    </>
  )
}
