import { cx } from 'linaria'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'

export const AllLists = ({ shareableLists }) => {
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
            storyCount={3} // mocked data
            listStatus={list.status}
          />
        </div>
      ))}
    </div>
  )
}
