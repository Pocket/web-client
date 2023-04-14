import { css, cx } from 'linaria'
import Link from 'next/link'
import { OverflowMenuIcon } from 'components/icons/OverflowMenuIcon'
import { ChevronLeftIcon } from 'components/icons/ChevronLeftIcon'
import { ChevronRightIcon } from 'components/icons/ChevronRightIcon'

export const Pagination = ({
  pagePattern,
  totalResults,
  currentPage,
  perPageCount,
  pageForward,
  pageBackward
}) => {
  //Some static settings in case we need to adjust
  const totalShown = 9
  const paginationLinkSize = 44
  const maxWidth = totalShown * paginationLinkSize

  // How many pages do we have (including partial pages)
  const totalPages = Math.ceil(totalResults / perPageCount)

  // If we have only one page ... no need for pagination
  const showPagination = totalPages > 1

  // Let's sort out if we need to show more items than we have room for
  const tooWide = paginationLinkSize * totalPages > maxWidth

  // We want to start truncating in the center of the pagination IF we need to
  const centerOfPagination = Math.ceil(totalShown / 2)
  const offsetStart = tooWide ? Math.max(currentPage - centerOfPagination, 0) : 0
  const clearToTheEnd = totalPages - offsetStart <= totalShown
  const startingPosition = clearToTheEnd ? totalPages - totalShown : offsetStart

  // We want the end position to be the total shown from the starting point
  // Conditions we want to account for are:
  // ) Dragons ... we always gotta be on the look our for them
  const endingPosition = clearToTheEnd
    ? totalPages
    : Math.min(startingPosition + totalShown - 2, totalPages)
  const showOverflow = tooWide && !clearToTheEnd

  // Let's build all the links that we want to show
  const links = Array(totalPages)
    .fill(0)
    .map((content, pageNumber) => {
      return (
        <PageLink
          pagePattern={pagePattern}
          key={pageNumber + 1}
          pageNumber={pageNumber + 1}
          currentPage={currentPage}
        />
      )
    })
    .slice(startingPosition, endingPosition)

  // This endlink may or may not be neccesary
  const endLink = (
    <>
      <div className="more">
        <OverflowMenuIcon className="" />
      </div>
      <PageLink
        pagePattern={pagePattern}
        key={totalPages}
        pageNumber={totalPages}
        currentPage={currentPage}
      />
    </>
  )

  const shownLinks = showOverflow ? [...links, endLink] : links

  return showPagination ? (
    <>
      <div className={paginationStyle}>
        <button className="pagination" onClick={pageBackward}>
          <ChevronLeftIcon className="" />
        </button>
        {shownLinks}
        <button className="pagination" onClick={pageForward}>
          <ChevronRightIcon className="" />
        </button>
      </div>
    </>
  ) : null
}

const PageLink = ({ pagePattern, pageNumber, currentPage }) => {
  const buttonClass = pageNumber === currentPage ? 'active' : null
  const href = pageNumber === 1 ? pagePattern : `${pagePattern}/page/${pageNumber}`
  return (
    <Link href={href}>
      <a>
        <button className={cx('pagination', buttonClass)}>{pageNumber}</button>
      </a>
    </Link>
  )
}

/**
 * COMPONENT STYLES
 * -------------------------------------------------------------------------- */
const paginationStyle = css`
  display: flex;
  .more {
    margin-right: 0.25rem;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-size: 1.5rem;
    line-height: 0;
    .icon {
      margin-top: 0;
    }
  }
  a {
    text-decoration: none;
  }

  button.pagination {
    margin-right: 0.25rem;
    padding: 0;
    display: flex;
    align-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 0.875rem;
    line-height: 0;
    width: 40px;
    height: 40px;
    display: block;
    color: var(--color-paginationText);
    background-color: transparent;
    &:focus,
    &:hover {
      outline: 1px solid var(--color-dividerTertiary);
      outline-offset: -1px;
    }
    &.active {
      background-color: var(--color-paginationActive);
      color: var(--color-paginationActiveText);
    }
    .icon {
      margin-top: 0;
    }
  }
`
