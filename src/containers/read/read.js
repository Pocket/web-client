import { css } from 'linaria'
import { useRouter } from 'next/router'
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
import { compileAnnotations } from 'components/annotations/utilities'
import { requestAnnotationPatch } from 'components/annotations/utilities'
import { Fonts, FONT_TYPES } from 'components/fonts/fonts'
import { SendToFriend } from 'components/share-sheet/share-sheet'
import { HighlightInlineMenu } from 'components/annotations/annotations.inline'
import { itemDataRequest, saveAnnotation, deleteAnnotation } from './read.state'

import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'

import { itemsDeleteAction } from 'connectors/items-by-id/my-list/items.delete'
import { itemsTagAction } from 'connectors/items-by-id/my-list/items.tag'
import { itemsFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsUnFavoriteAction } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsArchiveAction } from 'connectors/items-by-id/my-list/items.archive'
import { itemsUnArchiveAction } from 'connectors/items-by-id/my-list/items.archive'

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
  const appRootSelector = '#__next'
  const dispatch = useDispatch()

  const router = useRouter()
  const { slug: id } = router.query

  const isPremium = useSelector((state) => parseInt(state?.user?.premium_status, 10) === 1 || false ) //prettier-ignore
  const articleData = useSelector((state) => state.myListItemsById[id])
  const articleContent = useSelector((state) => state.reader.articleContent)

  const lineHeight = useSelector((state) => state.reader.lineHeight)
  const columnWidth = useSelector((state) => state.reader.columnWidth)
  const fontSize = useSelector((state) => state.reader.fontSize)
  const fontFamily = useSelector((state) => state.reader.fontFamily)
  const recentFriends = useSelector((state) => state.reader.recentFriends)
  const autoCompleteEmails = useSelector((state) => state.reader.autoCompleteEmails) //prettier-ignore
  // const tagLibrary = useSelector((state) => state.reader.tagLibrary)

  const itemDelete = () => dispatch(itemsDeleteAction([{ id }]))
  const itemTag = () => dispatch(itemsTagAction([{ id }]))

  const [sideBarOpen, setSideBar] = useState(false)
  const [sendModalOpen, setSendModal] = useState(false)
  const [highlight, setHighlight] = useState(null)
  const [highlightList, setHighlightList] = useState(false)
  const [highlightHovered, setHighlightHovered] = useState(null)

  useEffect(() => {
    dispatch(itemDataRequest(id))
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
    given_title,
    resolved_title,
    resolved_url,
    given_url,
    top_image_url,
    tags = {},
    has_video,
    word_count,
    videos,
    images,
    annotations = [],
    favorite,
    status
  } = articleData

  const tagList = Object.keys(tags)
  const favStatus = getBool(favorite)
  const archiveStatus = getBool(status)

  const headerData = {
    authors,
    given_title,
    resolved_title,
    resolved_url,
    given_url,
    tags: tagList,
    has_video,
    word_count,
    videos
  }

  const contentData = {
    content: articleContent,
    annotations,
    images,
    videos
  }

  const shareData = {
    url: resolved_url,
    quote: highlight?.toString() || sendModalOpen?.quote,
    title: resolved_title || given_title,
    item_id
  }

  const customStyles = {
    maxWidth: `${COLUMN_WIDTH_RANGE[columnWidth]}px`,
    lineHeight: LINE_HEIGHT_RANGE[lineHeight],
    fontSize: `${FONT_RANGE[fontSize]}px`,
    fontFamily: FONT_TYPES[fontFamily].family
  }

  const toggleSidebar = () => setSideBar(!sideBarOpen)
  const toggleShare = ({ destination, quote }) => setSendModal({ destination, quote }) //prettier-ignore

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
    dispatch(
      saveAnnotation({
        item_id,
        patch: requestAnnotationPatch(highlight),
        quote: highlight.toString()
      })
    )
  }

  const removeAnnotation = (annotation_id) => {
    dispatch(
      deleteAnnotation({
        item_id,
        annotation_id
      })
    )
  }

  const archiveItem = () => {
    const archiveAction = archiveStatus ? itemsUnArchiveAction : itemsArchiveAction //prettier-ignore
    dispatch(archiveAction([{ id }]))
  }

  const toggleFavorite = () => {
    const favoriteAction = favStatus ? itemsUnFavoriteAction : itemsFavoriteAction //prettier-ignore
    dispatch(favoriteAction([{ id }]))
  }

  return (
    <>
      <ReaderNav
        isPremium={isPremium}
        toggleSidebar={toggleSidebar}
        toggleTagging={itemTag}
        toggleShare={toggleShare}
        toggleDelete={itemDelete}
        toggleFavorite={toggleFavorite}
        shareData={shareData}
        archiveItem={archiveItem}
        displaySettings={{ columnWidth, lineHeight, fontSize, fontFamily }}
        favorite={favStatus}
        archive={archiveStatus}
      />

      <main className={articleWrapper}>
        <div className={classNames('sidebar-anchor', { active: sideBarOpen })}>
          <Sidebar
            isPremium={isPremium}
            sideBarOpen={sideBarOpen}
            toggleSidebar={toggleSidebar}
            highlightList={highlightList}
            annotationCount={annotations.length}
            shareItem={toggleShare}
            shareData={shareData}
            deleteAnnotation={removeAnnotation}
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
              shareItem={toggleShare}
              shareData={shareData}
            />
          ) : null}
          {highlightList ? (
            <HighlightInlineMenu
              highlightList={highlightList}
              highlightHovered={highlightHovered}
              annotationCount={annotations.length}
              shareItem={toggleShare}
              shareData={shareData}
              isPremium={isPremium}
              deleteAnnotation={removeAnnotation}
            />
          ) : null}
        </article>
      </main>
      {!isPremium && articleContent ? (
        <BottomUpsell maxWidth={customStyles.maxWidth} />
      ) : null}
      <DeleteModal />
      <TaggingModal />
      <SendToFriend
        {...shareData}
        domain={domainForUrl(resolved_url)}
        recentFriends={recentFriends}
        autoCompleteEmails={autoCompleteEmails}
        isOpen={!!sendModalOpen}
        setModalOpen={setSendModal}
        appRootSelector={appRootSelector}
        thumbnail={top_image_url}
        recommend={sendModalOpen.destination}
      />
    </>
  )
}
