import { Error } from '@ui/components/error'
import { ItemArticle } from '@ui/components/item-article'

import { getHomeSlates, type HomeQueryResponse } from './(server)/api/get-home-feed'
import type { CorpusSlate } from '@common/types/pocket'

// Revalidate this request once every minute
export const revalidate = 60

export default async function Home() {
  const response = await getHomeSlates('en')

  const errorTitle = 'Well that’s not right... '
  if ('responseError' in response)
    return <Error title={errorTitle} message={response.responseError as string} />

  const { itemsById, slatesById, slateArray } = response as HomeQueryResponse

  const layoutStructure = ['lockup', 'carousel', 3]
  return (
    <div className="page-container">
      {slateArray.map((slateId: string, index: number) => {
        const slate: CorpusSlate = slatesById[slateId]
        const slateIds = slate.recommendations as unknown as string[]
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
