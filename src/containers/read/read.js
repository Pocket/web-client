import { css } from 'linaria'
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
import {
  compileAnnotations,
  requestAnnotationPatch
} from 'components/annotations/utilities'
import { Fonts, FONT_TYPES } from 'components/fonts/fonts'
import { TagModal } from 'components/tagging/tag.modal'
import { DeleteModal } from 'components/delete/delete.modal'
import { SendToFriend } from 'components/share-sheet/share-sheet'
import { HighlightInlineMenu } from 'components/annotations/annotations.inline'
import { itemDataRequested, saveAnnotation } from './read.state'

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

  .sidebar {
    position: relative;
    z-index: 1;
    width: 0;
    transition: width 150ms ease-in-out;

    .rail-wrapper {
      transform: translateX(-318px);
      transition: all 150ms ease-in-out;
      padding-top: var(--size400);
    }

    &.active {
      width: 350px;
      .rail-wrapper {
        transform: translateX(0);
      }
    }
  }

  .reader {
    padding: 0 var(--spacing250);
    margin: var(--spacing250) auto;
  }
`

export default function Read({ appRootSelector, itemId }) {
  const dispatch = useDispatch()

  const isPremium = useSelector(
    (state) => parseInt(state?.user?.premium_status, 10) === 1 || false
  )

  const articleData = useSelector((state) => state.reader.articleData)
  const articleContent = useSelector((state) => state.reader.articleContent)
  const suggestedTags = useSelector((state) => state.reader.suggestedTags)
  const lineHeight = useSelector((state) => state.reader.lineHeight)
  const columnWidth = useSelector((state) => state.reader.columnWidth)
  const fontSize = useSelector((state) => state.reader.fontSize)
  const fontFamily = useSelector((state) => state.reader.fontFamily)
  const recentFriends = useSelector((state) => state.reader.recentFriends)
  const autoCompleteEmails = useSelector(
    (state) => state.reader.autoCompleteEmails
  )
  // const tagLibrary = useSelector((state) => state.reader.tagLibrary)

  const [sideBarOpen, setSideBar] = useState(false)
  const [taggingModalOpen, setTaggingModal] = useState(false)
  const [sendModalOpen, setSendModal] = useState(false)
  const [deleteModalOpen, setDeleteModal] = useState(false)
  const [highlight, setHighlight] = useState(null)
  const [highlightList, setHighlightList] = useState(false)
  const [highlightHovered, setHighlightHovered] = useState(null)

  useEffect(() => {
    dispatch(itemDataRequested(itemId))
  }, [dispatch])

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
    tags,
    has_video,
    word_count,
    videos,
    images,
    annotations,
    favorite
  } = articleData

  const tagList = Object.keys(tags)
  const favStatus = getBool(favorite)

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
  const toggleTagging = () => setTaggingModal(!taggingModalOpen)
  const toggleDelete = () => setDeleteModal(!deleteModalOpen)
  const toggleShare = ({ destination, quote }) =>
    setSendModal({ destination, quote })

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

  const deleteItem = () => {
    // dispatch(deleteListItem({ item_id }))
  }

  const archiveItem = () => {
    // dispatch(archiveListItem({ item_id }))
  }

  const toggleFavorite = () => {
    if (favStatus) {
      // dispatch(favoriteListItem({ item_id }))
    } else {
      // dispatch(unFavoriteListItem({ item_id }))
    }
  }

  return (
    <>
      <ReaderNav
        toggleSidebar={toggleSidebar}
        toggleTagging={toggleTagging}
        toggleShare={toggleShare}
        toggleDelete={toggleDelete}
        shareData={shareData}
        archiveItem={archiveItem}
        displaySettings={{ columnWidth, lineHeight, fontSize, fontFamily }}
        favorite={favStatus}
      />

      <main className={articleWrapper}>
        <aside className={classNames('sidebar', { active: sideBarOpen })}>
          <Sidebar
            sideBarOpen={sideBarOpen}
            toggleSidebar={toggleSidebar}
            highlightList={highlightList}
            shareItem={toggleShare}
            shareData={shareData}
            // deleteAnnotation={deleteAnnotation}
          />
        </aside>
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
              shareItem={toggleShare}
              shareData={shareData}
              isPremium={isPremium}
              // deleteAnnotation={deleteAnnotation}
            />
          ) : null}
        </article>
      </main>
      <DeleteModal
        isOpen={deleteModalOpen}
        setModalOpen={setDeleteModal}
        appRootSelector={appRootSelector}
        deleteItem={deleteItem}
      />
      <TagModal
        isPremium={isPremium}
        isOpen={taggingModalOpen}
        setModalOpen={setTaggingModal}
        appRootSelector={appRootSelector}
        currentTags={tagList}
        typeahead={[]}
        suggestedTags={suggestedTags}
      />
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
