import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { ReorderList } from 'components/reorder/reorder'
import { ReorderItem } from 'components/reorder/reorder'
import { ListSortHeader } from 'components/headers/lists-header'
import { IndividualListReorderCard } from 'connectors/lists/individual-list.reorder.card'
import { mutateReorderListItems } from 'connectors/lists/mutation-update.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const ListReorder = ({ id, toggleSort }) => {
  const dispatch = useDispatch()

  const { listItemIds, ...list } = useSelector((state) => state.listsDisplay[id])
  const [items, setItems] = useState(listItemIds)

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
    </main>
  )
}
