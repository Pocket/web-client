import { ItemSignaled as ItemComponent } from './item.signaled'
import savesResponse from 'mocks/savedItems.json'
import { topics } from 'mocks/_data/article'
import { deriveListItem } from 'common/api/derivers/item'
import { arrayToObject } from 'common/utilities/object-array/object-array'
import { css, cx } from '@emotion/css'
import { SavedActions } from './actions/saved'
import { TransitionalActions } from './actions/transitional'
import { SignaledActions } from './actions/signaled'

const savesItems = Object.values(savesResponse.edges).map((item) => {
  const derivedItem = deriveListItem(item)
  derivedItem['storyName'] = item.storybookContext
  return derivedItem
})

const itemsToDisplay = arrayToObject([...savesItems], 'storyName')

const gridContainer = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  .column6 {
    grid-column: span 6;
  }
  .column5 {
    grid-column: span 5;
  }
  .column4 {
    grid-column: span 4;
  }
  .column3 {
    grid-column: span 3;
  }
  .column2 {
    grid-column: span 2;
  }
`

export default {
  title: 'Item/Signaled',
  component: ItemComponent,
  decorators: [
    (Story) => (
      <div className={gridContainer}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    cardSpan: {
      control: { type: 'range', min: 2, max: 6, step: 1 }
    },
    itemToDisplay: {
      control: { type: 'select' },
      options: Object.keys(itemsToDisplay)
    },
    Actions: {
      control: { type: 'inline-radio' },
      options: ['discovery', 'saved', 'signaled'],
      mapping: {
        saved: SavedActions,
        discovery: TransitionalActions,
        signaled: SignaledActions
      }
    },
    topicName: {
      control: { type: 'select' },
      options: Object.keys(topics),
      if: {
        arg: 'showTopic'
      }
    }
  }
}

export const Signaled = (args) => {
  const itemToDisplay = args.itemToDisplay
  const item = itemsToDisplay[itemToDisplay]

  if (!item) return <div>No card to display</div>

  const {
    itemId,
    url,
    tags,
    title,
    authors,
    publisher,
    excerpt,
    timeToRead,
    isSyndicated,
    isUserList,
    isInternalItem,
    onItemInView = () => {},
    onReport = () => {},
    publisherLogo,
    fromPartner,
    clamp,
    topic
  } = item

  const getShownImage = () => {
    if (item?.noImage) return ''
    if (args.useHeroImage) return item?.heroImage || item?.thumbnail
    return item?.thumbnail
  }
  const itemImage = getShownImage()

  const cardClassnames = cx(
    args.className,
    `column${args.cardSpan}`,
    args.sideBySide && 'side-by-side'
  )

  return (
    <ItemComponent
      itemId={itemId}
      tags={tags}
      authors={authors}
      title={title}
      itemImage={itemImage}
      publisher={publisher}
      publisherLogo={publisherLogo}
      excerpt={excerpt}
      timeToRead={timeToRead}
      isSyndicated={isSyndicated}
      isUserList={isUserList}
      isInternalItem={isInternalItem}
      clamp={clamp}
      openUrl={url}
      position={0}
      fromPartner={fromPartner}
      useMarkdown={true}
      topicName={topic}
      onItemInView={onItemInView}
      onReport={onReport}
      {...args}
      className={cardClassnames}
    />
  )
}

Signaled.args = {
  cardSpan: 3,
  itemToDisplay: savesItems[0].storyName,
  Actions: 'signaled',
  saveStatus: 'unsaved',
  isSyndicated: false,
  isUserList: false,
  isFavorite: false,
  isArchive: false,
  isPremium: false,
  isInternalItem: false,
  fromPartner: true, // This is so we can supersede this with the selector
  clamp: false,
  showExcerpt: true,
  partnerType: false,
  sideBySide: false,
  showTopic: true,
  topicName: 'Technology',
  tags: 'none'
}
