import { css } from 'linaria'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { getBool } from 'common/utilities'
import { Loader, LoaderCentered } from 'components/loader/loader'
import { ReaderNav } from 'components/reader/nav'
import { ItemHeader } from 'components/reader/header'
import { Content } from 'components/reader/content'
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
import { itemDataRequest, saveAnnotation, deleteAnnotation } from './read.state'

import { setColorMode } from 'connectors/app/app.state'

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

const articleWrapper = css`
  p {
    font-size: unset !important;
  }

  display: flex;
  flex-direction: row;
  padding: var(--spacing400) 0;
  overflow-x: hidden;

  .sidebar-anchor {
    position: relative;
    width: 0;
    transition: width 150ms ease-in-out;
    &.active {
      width: 350px;
    }
  }

  .reader {
    padding: 0 var(--spacing250);
    margin: var(--spacing250) auto;
  }

  .is-video {
    max-width: initial !important;
    width: 80%;
  }

  @media print {
    display: block;
    padding: 0;

    .sidebar-anchor {
      display: none;
    }

    .reader {
      padding: 0;
      margin: 0;
      max-width: unset !important;
    }

    :after {
      margin-top: 1rem;
      content: 'Printed with ❤️ from Pocket';
    }
  }
`

export default function Reader() {
  const dispatch = useDispatch()

  const router = useRouter()
  const { slug: id } = router.query

  const isPremium = useSelector((state) => parseInt(state?.user?.premium_status, 10) === 1 || false ) //prettier-ignore
  const articleData = useSelector((state) => state.myListItemsById[id])
  const articleContent = useSelector((state) => state.reader.articleContent)
  const annotations = useSelector((state) => state.reader.annotations)
  const tags = useSelector((state) => state.reader.tags)
  const favorite = useSelector((state) => state.reader.favorite)

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
    dispatch(itemDataRequest(id))
    dispatch(selectShortcutItem(id))
  }, [dispatch, id])

  if (!articleData) {
    return (
      <LoaderCentered>
        <Loader isVisible />
      </LoaderCentered>
    )
  }

  const {
    itemId,
    authors,
    title,
    open_url,
    read_time,
    syndicated,
    publisher,
    has_video,
    videos,
    images,
    status
  } = articleData

  const tagList = tags ? Object.keys(tags) : []
  const favStatus = getBool(favorite)
  const archiveStatus = getBool(status)

  const headerData = {
    authors,
    title,
    open_url,
    publisher,
    syndicated,
    tags: tagList,
    has_video,
    read_time,
    videos
  }

  const contentData = {
    content: articleContent,
    annotations,
    images,
    videos
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

  const analyticsData = { id: itemId, url: open_url }

  const addAnnotation = () => {
    if (annotations.length === 3 && !isPremium) {
      setAnnotationLimitModal(true)
    } else {
      dispatch(sendSnowplowEvent('reader.add-highlight', analyticsData))
      dispatch(
        saveAnnotation({
          itemId,
          patch: requestAnnotationPatch(highlight),
          quote: highlight.toString()
        })
      )
    }
  }

  const removeAnnotation = (annotation_id) => {
    dispatch(sendSnowplowEvent('reader.remove-highlight', analyticsData))
    dispatch(
      deleteAnnotation({
        itemId,
        annotation_id
      })
    )
  }

  const itemDelete = () => {
    dispatch(sendSnowplowEvent('reader.delete', analyticsData))
    dispatch(itemsDeleteAction([{ id }]))
  }
  const itemTag = () => {
    dispatch(sendSnowplowEvent('reader.tag', analyticsData))
    dispatch(itemsTagAction([{ id }]))
  }
  const itemShare = ({ quote }) => {
    dispatch(sendSnowplowEvent('reader.share', analyticsData))
    dispatch(itemsShareAction({ id, quote }))
  }
  const handleImpression = (identifier) => {
    dispatch(sendSnowplowEvent(identifier))
  }

  const archiveItem = () => {
    const archiveAction = archiveStatus ? itemsUnArchiveAction : itemsArchiveAction
    const identifier = archiveStatus ? 'reader.un-archive' : 'reader.archive'
    dispatch(sendSnowplowEvent(identifier, analyticsData))
    dispatch(archiveAction([{ id }]))
  }

  const toggleFavorite = () => {
    const favoriteAction = favStatus ? itemsUnFavoriteAction : itemsFavoriteAction
    const identifier = favStatus ? 'reader.un-favorite' : 'reader.favorite'
    dispatch(sendSnowplowEvent(identifier, analyticsData))
    dispatch(favoriteAction([{ id }]))
  }

  const externalLinkClick = (href) => {
    const data = { id: itemId, url: href }
    dispatch(sendSnowplowEvent('reader.external-link', data))
  }

  const viewOriginalEvent = () => {
    dispatch(sendSnowplowEvent('reader.view-original', analyticsData))
  }

  const setAppColorMode = (colorMode) => dispatch(setColorMode(colorMode))

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
        favorite={favStatus}
        archive={archiveStatus}
        onVisible={handleImpression}
        sideBarOpen={sideBarOpen}
        colorMode={colorMode}
        setColorMode={setAppColorMode}
      />

      <main className={articleWrapper}>
        <div className={classNames('sidebar-anchor', { active: sideBarOpen })}>
          {articleContent ? (
            <Sidebar
              isPremium={isPremium}
              sideBarOpen={sideBarOpen}
              toggleSidebar={toggleSidebar}
              highlightList={highlightList}
              annotationCount={annotations.length}
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
            has_video === '2' && 'is-video'
          )}
          style={customStyles}>
          <ItemHeader viewOriginalEvent={viewOriginalEvent} {...headerData} />
          {articleContent ? (
            <Content
              {...contentData}
              externalLinkClick={externalLinkClick}
              onMouseUp={toggleHighlight}
              onHighlightHover={toggleHighlightHover}
              annotationsBuilt={buildAnnotations}
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
              annotationCount={annotations.length}
              shareItem={itemShare}
              isPremium={isPremium}
              deleteAnnotation={removeAnnotation}
            />
          ) : null}
        </article>
      </main>
      {articleContent ? <Recommendations id={itemId} /> : null}
      {!isPremium && articleContent ? (
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
      {articleContent ? <Onboarding type="reader.flyaway.apps" /> : null}
    </>
  )
}
