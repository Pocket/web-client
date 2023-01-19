import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css, cx } from 'linaria'

import { getReadItem } from './reader.state'

import { Toolbar } from 'connectors/reader/toolbar'
import { Header } from 'connectors/reader/header'
import { SidebarWrapper } from 'connectors/reader/sidebar'
import { ContentWrapper } from 'connectors/reader/content'
import { Recommendations } from 'connectors/reader/recommendations'
import { Upsell } from 'connectors/reader/upsell'

import { MutationTaggingModal } from 'connectors/confirm-tags/confirm-tag-mutation'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModalConnector } from 'connectors/share-modal/share-modal'
import { Toasts } from 'connectors/toasts/toast-list'

import { GoogleFonts, FONT_TYPES } from 'components/fonts/fonts'
import { ReaderFonts } from 'components/reader/fonts'

import { Loader, LoaderCentered } from 'components/loader/loader'

import { COLUMN_WIDTH_RANGE } from 'common/constants'
import { LINE_HEIGHT_RANGE } from 'common/constants'
import { FONT_RANGE } from 'common/constants'

export const articleWrapperStyles = css`
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
    margin: var(--spacing250) auto;
    width: 100%;
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

  const item = useSelector((state) => state.itemsDisplay[id])
  const status = useSelector((state) => state.itemsSaved[id]?.status)

  // Is deleted ?
  useEffect(() => {
    if (status === 'DELETED') {
      const { getStarted } = router.query
      const path = getStarted ? '/home' : '/saves'
      router.replace(path)
    }
  }, [status, router, dispatch])

  // Display settings
  const lineHeight = useSelector((state) => state.readerSettings.lineHeight)
  const columnWidth = useSelector((state) => state.readerSettings.columnWidth)
  const fontSize = useSelector((state) => state.readerSettings.fontSize)
  const fontFamily = useSelector((state) => state.readerSettings.fontFamily)

  useEffect(() => {
    dispatch(getReadItem(id))
    // dispatch(selectShortcutItem(id))
  }, [dispatch, id])

  if (!item)
    return (
      <LoaderCentered>
        <Loader isVisible />
      </LoaderCentered>
    )

  const { title, hasVideo } = item

  const customStyles = {
    maxWidth: `${COLUMN_WIDTH_RANGE[columnWidth]}px`,
    lineHeight: LINE_HEIGHT_RANGE[lineHeight],
    fontSize: `${FONT_RANGE[fontSize]}px`,
    fontFamily: FONT_TYPES[fontFamily].family
  }

  const articleClasses = cx(
    ReaderFonts,
    GoogleFonts,
    'reader',
    hasVideo === 'IS_VIDEO' && 'is-video'
  )

  return (
    <>
      <Head>
        <title>Pocket - {title}</title>
      </Head>

      <Toolbar id={id} />

      <main className={articleWrapperStyles}>
        <SidebarWrapper id={id} />
        <article className={articleClasses} style={customStyles}>
          <Header id={id} />
          <ContentWrapper id={id} />
        </article>
      </main>

      <Recommendations id={id} />
      <Upsell />

      <DeleteModal />
      <MutationTaggingModal />
      <ShareModalConnector />
      <Toasts />
    </>
  )
}
