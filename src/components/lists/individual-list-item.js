import { cx } from 'linaria'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'

export const IndividualListItem = ({ listItems }) => {
  return (
    <div>
      {listItems.map((list) => (
        <div className={cx(stackedGrid, stackedGridNoAside)} key={list.externalId}>
          <Item
            itemId={list.externalId}
            title={list.title}
            excerpt={list.excerpt}
            itemImage={list.imageUrl}
            publisher={list.publisher}
            openUrl={list.url}
            onItemInView={() => { }} // impression event here
            onOpenOriginalUrl={() => { }} // engagement event here
            onOpen={() => { }} // engagement event here
          />
        </div>
      ))}
    </div>
  )
}
