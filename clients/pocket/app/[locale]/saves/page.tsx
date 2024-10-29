import { SUPPORTED_LOCALES } from '@common/localization'

import { Error } from '@ui/components/error'
import { ItemArticle } from '@ui/components/item-article'

// API
import { getUserSaves, type UserSavesQueryResponse } from '@common/state/page-saves/server'
import { SavedItemsSortBy, SavedItemsSortOrder, SavedItemStatusFilter } from '@common/types/pocket'

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export default async function Saves({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const sortBy = 'CREATED_AT' as SavedItemsSortBy.CreatedAt
  const sortOrder = 'DESC' as SavedItemsSortOrder.Desc
  const statuses = ['UNREAD' as SavedItemStatusFilter.Unread]

  const response = await getUserSaves({
    pagination: { first: 30 },
    sort: { sortBy, sortOrder },
    filter: { statuses }
  })

  const errorTitle = 'Well that’s not right... '
  if ('responseError' in response)
    return <Error title={errorTitle} message={response.responseError!} />

  const { itemsById, savePageIds } = response as UserSavesQueryResponse

  return (
    <div className="page-container">
      <section data-columns={3}>
        <div className="outer">
          <div className="grid" data-total={3}>
            {savePageIds.map((itemId: string) => (
              <ItemArticle key={itemId} item={itemsById[itemId]} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
