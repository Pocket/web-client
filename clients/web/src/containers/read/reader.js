import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css, cx } from '@emotion/css'

import { getReadItem, clearFailure } from './reader.state'

import { Toolbar } from 'connectors/reader/toolbar'
import { Header } from 'connectors/reader/header'
import { SidebarWrapper } from 'connectors/reader/sidebar'
import { ContentWrapper } from 'connectors/reader/content'
import { Recommendations } from 'connectors/reader/recommendations'
import { Upsell } from 'connectors/reader/upsell'

import { ConfirmTagging } from 'connectors/confirm/tagging'
import { ConfirmShare } from 'connectors/confirm/share'
import { Toasts } from 'connectors/toasts/toast-list'

import { FONT_TYPES } from 'components/fonts/fonts'
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
  const { slug } = router.query

  const articleRef = useRef(null)

  const [annotationsProcessed, setAnnotationsProcessed] = useState(false)
  const annotationsCallback = useCallback(() => {
    if (annotationsProcessed) return
    setAnnotationsProcessed(true)
  }, [annotationsProcessed])

  // Item Data
  const itemId = useSelector((state) => state.idMap[slug])
  const item = useSelector((state) => state.itemsDisplay[itemId])
  const savedData = useSelector((state) => state.itemsSaved[itemId])
  const status = useSelector((state) => state.itemsSaved[itemId]?.status)
  const sharedItem = useSelector((state) => state.sharedItem)
  const hasFailed = useSelector((state) => state.reader.readFailure)
  const hasResolved = useSelector((state) => state.reader.hasResolved)

  // Display settings
  const lineHeight = useSelector((state) => state.readerSettings.lineHeight)
  const columnWidth = useSelector((state) => state.readerSettings.columnWidth)
  const fontSize = useSelector((state) => state.readerSettings.fontSize)
  const fontFamily = useSelector((state) => state.readerSettings.fontFamily)
  const fontLink =
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Vollkorn:ital,wght@0,400..900;1,400..900&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap'

  useEffect(() => {
    dispatch(getReadItem(slug))
    // dispatch(selectShortcutItem(id))
  }, [dispatch, slug])

  if (sharedItem || hasFailed) {
    dispatch(clearFailure())
    router.replace('/home')
  }

  // Is deleted ?
  if (status === 'DELETED') {
    const { getStarted } = router.query
    const path = getStarted ? '/home' : '/saves'
    router.replace(path)
  }

  if (!item)
    return (
      <LoaderCentered>
        <Loader isVisible />
      </LoaderCentered>
    )

  const { shareUrl: url } = sharedItem
  const image = item?.thumbnail || false
  const {title, hasVideo, excerpt, authors, timeToRead } = item //prettier-ignore
  const authorString = authors?.length ? authors.map((author) => author.name).join(',') : ''

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
        {/*  Title may have commas so we stringify it */}
        <title>{`Pocket - ${title}`}</title>

        {/*  Primary Meta Tags */}
        <meta name="description" content={excerpt} />

        {/*  Pocket Specific Tags */}
        <meta name="x-pocket-override-excerpt" content={excerpt} />

        {/* Schema.org for Google */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={excerpt} />
        {image ? <meta itemProp="image" content={image} /> : null}

        {/*  Twitter */}
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:site" content="@pocket" />
        {image ? <meta name="twitter:image" content={image} /> : null}

        {/* Slack Unfurls */}
        {authors.length ? (
          <>
            <meta name="twitter:label1" content="Written by" />
            <meta name="twitter:data1" content={authorString} />
          </>
        ) : null}
        {timeToRead ? (
          <>
            <meta name="twitter:label2" content="Reading time" />
            <meta name="twitter:data2" content={`${timeToRead} minutes`} />
          </>
        ) : null}

        {/* Open Graph general (Facebook) */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:site_name" content="Pocket" />
        {image ? <meta property="og:image" content={image} /> : null}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href={fontLink} rel="stylesheet" />
      </Head>

      {/**
       *  We don't want to render much else until we have saveData.
       * This wasn't a possibility in the past but because we can now get some basic
       * item data on the server, we need this check
       **/}
      {savedData ? (
        <>
          <Toolbar id={itemId} />

          <main className={articleWrapperStyles}>
            <SidebarWrapper
              id={itemId}
              articleRef={articleRef}
              annotationsProcessed={annotationsProcessed}
            />
            <article className={articleClasses} style={customStyles}>
              <Header id={itemId} />
              <ContentWrapper
                id={itemId}
                articleRef={articleRef}
                annotationsCallback={annotationsCallback}
              />
            </article>
          </main>

          <Recommendations id={itemId} />
          <Upsell />
        </>
      ) : null}

      {hasResolved && !sharedItem ? <ConfirmTagging /> : null}
      <ConfirmShare />
      <Toasts />
    </>
  )
}
