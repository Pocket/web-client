import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { ReorderList } from 'components/reorder/reorder'
import { ReorderItem } from 'components/reorder/reorder'
import { ListSortHeader } from 'components/headers/lists-header'
import { IndividualListReorderCard } from 'connectors/lists/individual-list.reorder.card'
import { mutateReorderListItems } from 'connectors/lists/mutation-update.state'

export const ListReorder = ({ id, toggleSort }) => {
  const dispatch = useDispatch()

  const { title, description, listItemIds } = useSelector((state) => state.listsDisplay[id])
  const [items, setItems] = useState(listItemIds)

  const handleSave = () => {
    dispatch(mutateReorderListItems({ id, items }))
    // dispatch(sendSnowplowEvent('shareable-list.sort.save', analyticsData??))
    toggleSort(false)
  }

  const handleCancel = () => {
    // dispatch(sendSnowplowEvent('shareable-list.sort.cancel', analyticsData??))
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
