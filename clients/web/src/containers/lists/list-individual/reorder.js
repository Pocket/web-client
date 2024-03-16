import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { ReorderList } from 'components/reorder/reorder'
import { ReorderItem } from 'components/reorder/reorder'
import { ListSortHeader } from 'components/headers/lists-header'
import { IndividualListReorderCard } from 'connectors/lists/individual-list.reorder.card'
import { mutateReorderListItems } from 'connectors/lists/mutation-update.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { getMoreIndividualListAction } from '../lists.state'
import { LoadMore } from './load-more'

export const ListReorder = ({ id, toggleSort }) => {
  const dispatch = useDispatch()

  const { listItemIds, ...list } = useSelector((state) => state.listsDisplay[id])
  const [items, setItems] = useState([])

  useEffect(() => {
    // they're the same, don't update anything
    if (listItemIds.length === items.length) return () => {}

    // combine and dedupe to preserve any changes
    const newItems = [...new Set([...items, ...listItemIds])]
    setItems(newItems)
  }, [listItemIds, items])

  const { title, description, listItemNoteVisibility, analyticsData: passedAnalytics } = list

  const analyticsData = {
    ...passedAnalytics,
    listItemNoteVisibility
  }

  const handleSave = () => {
    dispatch(mutateReorderListItems({ id, items }))
    dispatch(sendSnowplowEvent('shareable-list.reorder.confirm', analyticsData))
    toggleSort(false)
  }

  const handleCancel = () => {
    dispatch(sendSnowplowEvent('shareable-list.reorder.cancel', analyticsData))
    toggleSort(false)
  }

  const updateList = (newItems) => setItems(newItems)

  const loadMore = () => dispatch(getMoreIndividualListAction(id))

  return (
    <main className="main">
      <ListSortHeader
        title={title}
        description={description}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />

      <ReorderList listItems={items} updateList={updateList}>
        {items.map((id, index) => (
          <ReorderItem key={id} id={id} index={index}>
            <IndividualListReorderCard id={id} />
          </ReorderItem>
        ))}
      </ReorderList>

      <LoadMore loadMore={loadMore} />
    </main>
  )
}
