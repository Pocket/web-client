import { css } from 'linaria'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { domainForUrl, getBool } from 'common/utilities'
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
import { Fonts, FONT_TYPES } from 'components/fonts/fonts'

import { HighlightInlineMenu } from 'components/annotations/annotations.inline'
import { ModalLimitNotice as AnnotationsLimitModal } from 'components/annotations/annotations.limit'
import { itemDataRequest, saveAnnotation, deleteAnnotation } from './read.state'

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

import { genericRecsRequested } from '/connectors/recit/recit.state'

import { sendDeleteEvent } from './read.analytics'
import { sendArchiveEvent } from './read.analytics'
import { sendTagEvent } from './read.analytics'
import { sendFavoriteEvent } from './read.analytics'
import { sendAnnotationEvent } from './read.analytics'
import { sendShareEvent } from './read.analytics'
import { sendImpression } from './read.analytics'

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

  const itemDelete = () => {
    dispatch(sendDeleteEvent(articleData))
    dispatch(itemsDeleteAction([{ id }]))
  }
  const itemTag = () => {
    dispatch(sendTagEvent(articleData))
    dispatch(itemsTagAction([{ id }]))
  }
  const itemShare = ({ quote }) => {
    dispatch(sendShareEvent(articleData))
    dispatch(itemsShareAction({ id, quote }))
  }
  const handleImpression = (identifier) => {
    dispatch(sendImpression(identifier))
  }

  const [sideBarOpen, setSideBar] = useState(false)
  const [sendModalOpen, setSendModal] = useState(false)
  const [annotationLimitModal, setAnnotationLimitModal] = useState(false)
  const [highlight, setHighlight] = useState(null)
  const [highlightList, setHighlightList] = useState([])
  const [highlightHovered, setHighlightHovered] = useState(null)

  useEffect(() => {
    dispatch(itemDataRequest(id))
    // dispatch(genericRecsRequested(id))
  }, [dispatch, id])

  if (!articleData) {
    return (
      <LoaderCentered>
        <Loader isVisible />
      </LoaderCentered>
    )
  }

  const {
    item_id,
    authors,
    title,
    open_url,
    share_url,
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

  const addAnnotation = () => {
    if (annotations.length === 3 && !isPremium) {
      setAnnotationLimitModal(true)
    }
    else {
      dispatch(sendAnnotationEvent(articleData, false))
      dispatch(
        saveAnnotation({
          item_id,
          patch: requestAnnotationPatch(highlight),
          quote: highlight.toString()
        })
      )
    }
  }

  const removeAnnotation = (annotation_id) => {
    dispatch(sendAnnotationEvent(articleData, true))
    dispatch(
      deleteAnnotation({
        item_id,
        annotation_id
      })
    )
  }

  const archiveItem = () => {
    const archiveAction = archiveStatus ? itemsUnArchiveAction : itemsArchiveAction //prettier-ignore
    dispatch(sendArchiveEvent(articleData, archiveStatus))
    dispatch(archiveAction([{ id }]))
  }

  const toggleFavorite = () => {
    const favoriteAction = favStatus ? itemsUnFavoriteAction : itemsFavoriteAction //prettier-ignore
    dispatch(sendFavoriteEvent(articleData, favStatus))
    dispatch(favoriteAction([{ id }]))
  }

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
      />

      <main className={articleWrapper}>
        <div className={classNames('sidebar-anchor', { active: sideBarOpen })}>
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
        </div>
        <article className={classNames(Fonts, 'reader')} style={customStyles}>
          <ItemHeader {...headerData} />
          {articleContent ? (
            <Content
              {...contentData}
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
      {!isPremium && articleContent ? (
        <BottomUpsell
          maxWidth={customStyles.maxWidth}
          onVisible={handleImpression} />
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
    </>
  )
}
