import Layout from 'layouts/main'
import { ItemCard } from 'connectors/items/item-card-transitional'
import { Toasts } from 'connectors/toasts/toast-list'
import { useSelector, useDispatch } from 'react-redux'
import { standardGrid } from 'components/item/items-layout'
import { SearchCorpus } from '../../connectors/search-corpus'

export const Search = () => {
  const dispatch = useDispatch()
  const pageSearchIds = useSelector((state) => state.pageSearchIds) //prettier-ignore

  return (
    <Layout>
      <SearchCorpus />
      <br />
      <div className={standardGrid}>
        {pageSearchIds.map((itemId) => {
          if (typeof itemId !== 'string') return null
          const positionOfItem = pageSearchIds.indexOf(itemId)
          return <ItemCard key={itemId} id={itemId} position={positionOfItem} snowplowId="search" />
        })}
      </div>
      <Toasts />
    </Layout>
  )
}
