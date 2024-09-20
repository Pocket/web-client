// Libraries
import { css, cx } from '@emotion/css'
import Link from 'next/link'

// Dependencies
import { OverflowMenuIcon } from '@ui/icons/OverflowMenuIcon'
import { ChevronLeftIcon } from '@ui/icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@ui/icons/ChevronRightIcon'

/**
 * Pagination
 * A component to allow the user to navigate through a predictable pattern of
 * links in a sequence. Shows the users current location as well as the ability
 * to navigate incrementally and explicitly to exposed page numbers.
 *
 */
export const Pagination = ({
  pagePattern,
  totalResults,
  totalLinksShown = 9,
  currentPage,
  perPageCount
}: {
  pagePattern: string
  totalResults: number
  totalLinksShown: number
  currentPage: number
  perPageCount: number
}) => {
  //Some static settings in case we need to adjust
  const paginationLinkSize = 44

  // How many pages do we have (including partial pages)
  const totalPages = Math.ceil(totalResults / perPageCount)

  // Let's account for bad data here ... negative totalLinks shown or
  // more links shown than we have
  const totalShown = Math.max(4, Math.min(totalLinksShown, totalPages))

  // ? IMPROVEMENT: This could take container size and available space
  // ? Right now we are a bit more static with it.
  const maxWidth = totalShown * paginationLinkSize

  // If we have only one page ... no need for pagination
  const showPagination = totalPages > 1

  // Let's sort out if we need to show more items than we have room for
  const tooWide = paginationLinkSize * totalPages > maxWidth

  // We want to start truncating in the center of the pagination IF we need to
  // Conditions we want to account for are:
  // 1) Do we need an overflow because we have more pages than space to display
  // 2) Dragons ... we always gotta be on the look our for them

  // First lets find the center of the pagination based on the total we want to
  // show. Much better UI with an odd number shown
  const centerOfPagination = Math.ceil(totalShown / 2)

  // What links should we show?  If we are at page 18 of 20 ... we need to
  // truncate The beginning of the sequence
  const offsetStart = tooWide ? Math.max(currentPage - centerOfPagination, 0) : 0

  // Do we have a clear runway to the end, so overflow is no longer necessary?
  const clearToTheEnd = totalPages - offsetStart <= totalShown

  // If we are clear to the end, we no longer want to adjust the starting position
  // so we will show the last item back to the total shown without overflow
  const startingPosition = clearToTheEnd ? totalPages - totalShown : offsetStart

  // We want the end position to be the total shown from the starting point
  const endingPosition = clearToTheEnd
    ? totalPages
    : Math.min(startingPosition + totalShown - 2, totalPages)
  const showOverflow = tooWide && !clearToTheEnd

  // Let's build all the links that we want to show
  const links = Array(totalPages)
    .fill(0)
    .map((content, arrayIndex) => {
      // Since we are just building an empty array based on the total pages and
      // using the index to represent page number, we need to convert the
      // zero-based array index to a page-number the server will understand and
      // the url can represent with clarity
      const pageNumber = arrayIndex + 1

      return (
        <PageLink
          pagePattern={pagePattern}
          key={`pagination-${pageNumber}`}
          pageNumber={pageNumber}
          currentPage={currentPage}
        />
      )
    })
    .slice(startingPosition, endingPosition)

  // This end link may or may not be necessary based on overflow we calculated
  const endLink = [
    <div key="pagination-overflow" className="more">
      <OverflowMenuIcon className="" />
    </div>,
    <PageLink
      key="pagination-end-link"
      pagePattern={pagePattern}
      pageNumber={totalPages}
      currentPage={currentPage}
    />
  ]

  // Build our link array here (with possible overflow)
  const shownLinks = showOverflow ? [...links, ...endLink] : links

  // We want to know if we should be activating the forward/backward based on
  // the position we are at in the sequence. If we are at the second page we will return
  // them to the base location (without /page)
  const disableBack = currentPage === 1
  const disableForward = currentPage === totalPages
  const backLink = currentPage === 2 ? pagePattern : `${pagePattern}/page/${currentPage - 1}`
  const forwardLink = disableForward ? '#' : `${pagePattern}/page/${currentPage + 1}`

  return showPagination ? (
    <>
      <div className={paginationStyle}>
        {disableBack ? (
          <button className="pagination" disabled>
            <ChevronLeftIcon className="" />
          </button>
        ) : (
          <Link key={'pagination-backward'} href={backLink}>
            <button className="pagination">
              <ChevronLeftIcon className="" />
            </button>
          </Link>
        )}
        {shownLinks}
        {disableForward ? (
          <button className="pagination" disabled>
            <ChevronRightIcon className="" />
          </button>
        ) : (
          <Link key={'pagination-forward'} href={forwardLink}>
            <button className="pagination">
              <ChevronRightIcon className="" />
            </button>
          </Link>
        )}
      </div>
    </>
  ) : null
}

// This is the button for an individual link
const PageLink = ({
  pagePattern,
  pageNumber,
  currentPage
}: {
  pagePattern: string
  pageNumber: number
  currentPage: number
}) => {
  const buttonClass = pageNumber === currentPage ? 'active' : null
  const href = pageNumber === 1 ? pagePattern : `${pagePattern}/page/${pageNumber}`
  return (
    <Link href={href}>
      <button className={cx('pagination', buttonClass)}>{pageNumber}</button>
    </Link>
  )
}

/**
 * COMPONENT STYLES
 * -------------------------------------------------------------------------- */
const paginationStyle = css`
  display: flex;
  .more {
    color: var(--color-dividerTertiary);
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
`
