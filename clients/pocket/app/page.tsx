import { getHomeSlates, type HomeQueryResponse } from './(server)/api/get-home-feed'
import type { CorpusSlate } from '@common/types/pocket'

export default async function Home() {
  const response = await getHomeSlates('en')
  if ('responseError' in response) return null

  const { itemsById, slatesById, slateArray } = response as HomeQueryResponse

  return (
    <div className="page-container">
      {slateArray.map((slateId: string) => {
        const slate: CorpusSlate = slatesById[slateId]
        const slateIds = slate.recommendations as unknown as string[]
        return (
          <section key={slateId}>
            <h3>{slate.headline}</h3>
            {slate.subheadline ?? <h4>{slate.subheadline}</h4>}
            {slateIds.map((itemId: string) => {
              return <article key={itemId}>{itemsById[itemId].title}</article>
            })}
          </section>
        )
      })}
    </div>
  )
}
