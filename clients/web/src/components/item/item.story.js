import { Item as ItemComponent } from './item'
import savesResponse from 'mocks/savedItems.json'
import { topics } from 'mocks/_data/article'
import { deriveListItem } from 'common/api/derivers/item'
import { arrayToObject } from 'common/utilities/object-array/object-array'
import { css, cx } from '@emotion/css'
import { SavedActions } from './actions/saved'
import { TransitionalActions } from './actions/transitional'
import { SignalActions } from './actions/signaled'

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
  title: 'Item/Item',
  component: Item,
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
      control: {
        type: 'select'
      },
      options: Object.keys(itemsToDisplay)
    },
    saveStatus: {
      control: {
        type: 'inline-radio',
        options: ['saved', 'unsaved']
      }
    },
    tags: {
      control: {
        type: 'inline-radio'
      },
      options: ['none', 'one', 'a few', 'ridiculous'],
      mapping: {
        none: [],
        one: [{ name: 'i am a tag' }],
        'a few': [{ name: 'philosophy' }, { name: 'science' }],
        ridiculous: [
          { name: 'things' },
          { name: 'stuff' },
          { name: 'whatnot' },
          { name: 'thing a ma bobs' },
          { name: 'such organize' },
          { name: 'much wow' }
        ]
      }
    },
    Actions: {
      control: {
        type: 'inline-radio'
      },
      options: ['discovery', 'saved', 'signaled'],
      mapping: {
        saved: SavedActions,
        discovery: TransitionalActions,
        signaled: SignalActions
      }
    },
    partnerType: {
      control: {
        type: 'inline-radio'
      },
      options: [false, 'PARTNERED', 'SPONSORED']
    },
    topicName: {
      control: { type: 'select' },
      options: Object.keys(topics),
      if: {
        arg: 'showTopic'
      }
    },
    itemId: { table: { disable: true } },
    title: { table: { disable: true } },
    publisher: { table: { disable: true } },
    timeToRead: { table: { disable: true } },
    excerpt: { table: { disable: true } },
    hiddenActions: { table: { disable: true } },
    bulkSelected: { table: { disable: true } },
    authors: { table: { disable: true } },
    fromPartner: { table: { disable: true } },
    itemImage: { table: { disable: true } },
    isUserList: { table: { disable: false } },
    className: { table: { disable: false }, control: 'text' },
    position: { table: { disable: true } },
    bulkEdit: { table: { disable: true } },
    bulkSelect: { table: { disable: true } },
    shortcutSelect: { table: { disable: true } },
    openUrl: { table: { disable: true } },
    externalUrl: { table: { disable: true } },
    onItemInView: { table: { disable: true } },
    onOpen: { table: { disable: true } },
    onOpenOriginalUrl: { table: { disable: true } }
  }
}

export const Item = (args) => {
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
      {...args}
      className={cardClassnames}
    />
  )
}

Item.args = {
  cardSpan: 3,
  itemToDisplay: savesItems[0].storyName,
  Actions: 'discovery',
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
  showTopic: false,
  topicName: null,
  tags: 'none'
}
