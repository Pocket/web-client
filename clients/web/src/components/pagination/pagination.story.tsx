// Libraries
import { useEffect, useState } from 'react'

// Dependencies
import { Pagination as PaginationComponent } from './pagination'

export default {
  title: 'Components/Pagination',
  component: PaginationComponent,
  argTypes: {
    page: {
      control: { type: 'range', min: 1, max: 100, step: 1 }
    },
    pageForward: { table: { disable: true } },
    pageBackward: { table: { disable: true } },
    currentPage: { table: { disable: true } }
  }
}

const Template = ({
  totalResults,
  totalLinksShown,
  perPageCount,
  page,
  pagePattern
}: {
  pagePattern: string
  totalResults: number
  totalLinksShown: number
  page: number
  perPageCount: number
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(totalResults / perPageCount)

  useEffect(() => {
    setCurrentPage(Math.max(Math.min(page, totalPages), 1))
  }, [page, totalPages])

  return (
    <PaginationComponent
      totalLinksShown={totalLinksShown}
      totalResults={totalResults}
      perPageCount={perPageCount}
      pagePattern={pagePattern}
      currentPage={currentPage}
    />
  )
}

export const Pagination = Template.bind({})
Pagination.args = {
  pagePattern: '/collections',
  totalResults: 222,
  totalLinksShown: 9,
  page: 1,
  perPageCount: 16
}
