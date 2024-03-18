import { Card as CardComponent } from 'components/item-card/card'
import { deriveRecommendation } from 'common/api/derivers/item'
import { OffsetList as OffsetComponent } from './list-offset'
import discoverResponse from 'mocks/slateLineupResponse.json'
import { arrayToObject } from 'common/utilities/object-array/object-array'

const discoverItems = discoverResponse?.data?.getSlateLineup?.slates[0].recommendations?.map(
  (item) => {
    const derivedItem = deriveRecommendation(item)
    derivedItem.story_name = `Discover - ${item.title}`
    return derivedItem
  }
)

const itemsToDisplay = discoverItems
const itemsById = arrayToObject(itemsToDisplay, 'itemId')
const items = Object.keys(itemsById)

export default {
  title: 'Card Layouts/Offset',
  component: OffsetComponent
}

const ItemCard = ({ id, position, ...rest }) => {
  const item = itemsById[id]
  if (!item) return <div>No card to display</div>

  const { itemId, readUrl, externalUrl, openExternal } = item
  const { tags, title, publisher, excerpt, timeToRead, isSyndicated, isInternalItem, fromPartner } =
    item
  const openUrl = readUrl && !openExternal ? readUrl : externalUrl
  const itemImage = item?.noImage ? '' : item?.thumbnail

  return (
    <CardComponent
      key={id}
      itemId={itemId}
      externalUrl={externalUrl}
      tags={tags}
      title={title}
      itemImage={itemImage}
      publisher={publisher}
      excerpt={excerpt}
      timeToRead={timeToRead}
      isSyndicated={isSyndicated}
      isInternalItem={isInternalItem}
      fromPartner={fromPartner}
      openUrl={openUrl}
      position={position}
      {...rest}
    />
  )
}

export const OffsetList = () => {
  return <OffsetComponent items={items} cardShape="wide" ItemCard={ItemCard} border={true} />
}
