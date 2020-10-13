import { css } from 'linaria'
import { useState } from 'react'
import classNames from 'classnames'
import { ReaderNav } from 'components/reader/nav'
import { ItemHeader } from 'components/reader/header'
import { Content } from 'components/reader/content'
import { SelectionPopover } from 'components/popover/popover-selection'
import { Sidebar } from 'components/reader/sidebar'
import { compileAnnotations } from 'components/annotations/utilities'
import { Fonts, FONT_TYPES } from 'components/fonts/fonts'

export const COLUMN_WIDTH_RANGE = [531, 574, 632, 718, 826, 933, 1041]
export const LINE_HEIGHT_RANGE = [1.2,1.3,1.4,1.5,1.65,1.9,2.5]
export const FONT_RANGE = [16, 19, 22, 25, 28, 32, 37]

const articleWrapper = css`
  p { font-size: unset !important; }

  display: flex;
  flex-direction: row;
  padding: var(--spacing400) 0;
  overflow-x: hidden;

  .sidebar {
    width: 0;
    transition: width 150ms ease-in-out;

    .rail-wrapper {
      transform: translateX(-318px);
      transition: transform 150ms ease-in-out;
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

export default function Read({ item }) {
  const [sideBarOpen, setSideBar] = useState(false)
  const [highlight, setHighlight] = useState(null)
  const [highlightList, setHighlightList] = useState({})

  const {
    authors,
    given_title,
    resolved_title,
    resolved_url,
    given_url,
    tags,
    has_video,
    word_count,
    videos,
    item_content,
    images,
    annotations
  } = item

  const headerData = {
    authors,
    given_title,
    resolved_title,
    resolved_url,
    given_url,
    tags,
    has_video,
    word_count,
    videos
  }

  const contentData = {
    content: item_content,
    annotations,
    images,
    videos
  }

  const customStyles = {
    maxWidth: `${COLUMN_WIDTH_RANGE[3]}px`,
    lineHeight: LINE_HEIGHT_RANGE[3],
    fontSize: `${FONT_RANGE[3]}px`,
    fontFamily: 'IdealSans'
  }

  const toggleSidebar = () => setSideBar(!sideBarOpen)

  const toggleHighlight = () => {
    const selection = window.getSelection()
    if (selection.toString()) {
      setHighlight(selection)
    } else if (highlight) {
      setHighlight(null)
    }
  }

  const clearSelection = () => {
    window.getSelection().removeAllRanges()
    toggleHighlight()
  }

  const buildAnnotations = () => {
    const compiled = compileAnnotations(highlightList)
    setHighlightList(compiled)
  }

  return (
    <>
      <ReaderNav toggleSidebar={toggleSidebar} />

      <main className={articleWrapper}>
        <aside className={classNames('sidebar', { active: sideBarOpen })}>
          <Sidebar
            sideBarOpen={sideBarOpen}
            clickAction={toggleSidebar}
            annotations={annotations}
            annotationList={highlightList}
            viewPort={{ top: 1000, bottom: 1800 }}
          />
        </aside>
        <article className={classNames(Fonts, "reader")} style={customStyles}>
          <ItemHeader {...headerData} />
          <Content
            {...contentData}
            onMouseUp={toggleHighlight}
            annotationsBuilt={buildAnnotations}
          />
          {highlight ? (
            <SelectionPopover
              anchor={highlight}
              disablePopup={clearSelection}
            />
          ) : null}
        </article>
      </main>
    </>
  )
}
