import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'linaria'
import classNames from 'classnames'

import { getReadItem } from './read.state'

import { Toolbar } from 'connectors/reader/toolbar'
import { Header } from 'connectors/reader/header'
import { SidebarWrapper } from 'connectors/reader/sidebar'
import { ContentWrapper } from 'connectors/reader/content'
import { Recommendations } from 'containers/read/recommendations'
import { Upsell } from 'connectors/reader/upsell'

import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { Toasts } from 'connectors/toasts/toast-list'
import { Onboarding } from 'connectors/onboarding/onboarding'

import { GoogleFonts, FONT_TYPES } from 'components/fonts/fonts'
import { ReaderFonts } from '@pocket/web-ui'

import { Loader, LoaderCentered } from 'components/loader/loader'

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

export const COLUMN_WIDTH_RANGE = [531, 574, 632, 718, 826, 933, 1041]
export const LINE_HEIGHT_RANGE = [1.2, 1.3, 1.4, 1.5, 1.65, 1.9, 2.5]
export const FONT_RANGE = [16, 19, 22, 25, 28, 32, 37]

export default function Reader() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug: id } = router.query

  const item = useSelector((state) => state.reader.articleItem)

  // Display settings
  const lineHeight = useSelector((state) => state.reader.lineHeight)
  const columnWidth = useSelector((state) => state.reader.columnWidth)
  const fontSize = useSelector((state) => state.reader.fontSize)
  const fontFamily = useSelector((state) => state.reader.fontFamily)

  useEffect(() => {
    dispatch(getReadItem(id))
    // dispatch(selectShortcutItem(id))
  }, [dispatch, id])

  if (!item) return (
    <LoaderCentered>
      <Loader isVisible />
    </LoaderCentered>
  )

  const {
    title,
    hasVideo
  } = item

  const customStyles = {
    maxWidth: `${COLUMN_WIDTH_RANGE[columnWidth]}px`,
    lineHeight: LINE_HEIGHT_RANGE[lineHeight],
    fontSize: `${FONT_RANGE[fontSize]}px`,
    fontFamily: FONT_TYPES[fontFamily].family
  }

  const articleClasses = classNames(
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
      <TaggingModal />
      <ShareModal />
      <Toasts />

      <Onboarding type="reader.flyaway.apps" />
    </>
  )
}
