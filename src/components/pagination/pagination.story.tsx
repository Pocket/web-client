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

const Template = ({ totalResults, perPageCount, page, pagePattern }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(totalResults / perPageCount)
  const nextPage = Math.min(currentPage + 1, totalPages)
  const previousPage = Math.max(1, currentPage - 1)

  const pageForward = () => setCurrentPage(nextPage)
  const pageBackward = () => setCurrentPage(previousPage)

  useEffect(() => {
    setCurrentPage(Math.max(Math.min(page, totalPages), 1))
  }, [page, totalPages])

  return (
    <PaginationComponent
      totalResults={totalResults}
      perPageCount={perPageCount}
      pagePattern={pagePattern}
      currentPage={currentPage}
      pageForward={pageForward}
      pageBackward={pageBackward}
    />
  )
}

export const Pagination = Template.bind({})
Pagination.args = {
  pagePattern: '/collections',
  totalResults: 222,
  page: 1,
  perPageCount: 16
}
