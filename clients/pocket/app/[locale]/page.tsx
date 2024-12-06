// Constants
import { SUPPORTED_LOCALES } from '@common/localization'

// UI
import { Error } from '@ui/components/error'
import { ItemArticle } from '@ui/components/item-article'

import { getHomeSlates } from '@common/state/page-home/server'

// Types
import type { SlateWithRecIds, HomeQueryResponse } from '@common/state/page-home/server'

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const response = await getHomeSlates(locale)

  const errorTitle = 'Well that’s not right... '
  if ('responseError' in response)
    return <Error title={errorTitle} message={response.responseError ?? ''} />

  const { itemsById, slatesById, slateArray } = response as HomeQueryResponse
  const layoutStructure = ['lockup', 'carousel', 3]

  return (
    <div className="page-container">
      {slateArray.map((slateId: string, index: number) => {
        const slate: SlateWithRecIds = slatesById[slateId]
        const slateIds = slate.recIds
        const layoutColumns = layoutStructure[index] ?? 3
        const layoutTotal = Math.ceil(slateIds.length / 4)
        return (
          <section key={slateId} data-columns={layoutColumns}>
            <h3>{slate.headline}</h3>
            {slate.subheadline ?? <h4>{slate.subheadline}</h4>}
            <div className="outer">
              <div className="grid" data-total={layoutTotal}>
                {slateIds.map((itemId: string) => (
                  <ItemArticle key={itemId} item={itemsById[itemId]} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
