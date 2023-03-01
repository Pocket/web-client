import { cx } from 'linaria'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { ListActions } from 'components/item/actions/list'
import { useDispatch } from 'node_modules/react-redux/es/exports'
import { mutateListDelete } from 'connectors/items/mutation-lists.state'

export const AllLists = ({ shareableLists }) => {
  const dispatch = useDispatch()

  const handleDeleteList = (externalId) => {
    console.log('delete intent')
    dispatch(mutateListDelete(externalId))
  }

  return (
    <div>
      {shareableLists.map((list) => (
        <div className={cx(stackedGrid, stackedGridNoAside)} key={list.externalId}>
          <Item
            itemId={list.externalId}
            title={list.title}
            excerpt={list.description}
            openUrl={`/lists/${list.externalId}`}
            onItemInView={() => {}} // impression event here
            isInternalItem={true}
            listStatus={list.status}
            listUrl={'www.google.com'}
            Actions={ListActions}
            onListDelete={handleDeleteList}
            externalId={list.externalId}
          />
        </div>
      ))}
    </div>
  )
}
