import { Card as CardComponent } from './card'
import { deriveListItem } from 'common/api/derivers/item'
import { deriveRecommendation } from 'common/api/derivers/item'
import { deriveCollection } from 'common/api/derivers/item'
import { deriveStory } from 'common/api/derivers/item'

import { arrayToObject } from 'common/utilities/object-array/object-array'
import { Saves as SavesActions } from 'components/item-actions/item-actions.story'
import { Recommendation as RecommendationActions } from 'components/item-actions/item-actions.story'
import { Home as HomeActions } from 'components/item-actions/item-actions.story'
import { Similar as SimilarActions } from 'components/item-actions/item-actions.story'

import savesResponse from 'mocks/savedItems.json'
import discoverResponse from 'mocks/slateLineupResponse.json'
import collectionResponse from 'mocks/collectionResponse.json'

import { css } from '@emotion/css'
import { cardsGrid } from 'components/items-layout/base'

const grid = css`
  max-width: 936px;
  ${cardsGrid};
`

const discoverItems = discoverResponse?.data?.getSlateLineup?.slates[0].recommendations?.map(
  (node) => {
    const derivedItem = deriveRecommendation(node)
    derivedItem['storyName'] = `Discover - ${sanitizeString(derivedItem.title)}`
    return derivedItem
  }
)

const savesItems = Object.values(savesResponse.edges).map((item) => {
  const derivedItem = deriveListItem(item)
  derivedItem['storyName'] = `Saves - ${sanitizeString(derivedItem.title)}`
  return derivedItem
})

const collections = () => {
  const derivedItem = deriveCollection(collectionResponse.data.getCollectionBySlug)
  derivedItem['storyName'] = `Collection - ${sanitizeString(derivedItem.title)}`
  return [derivedItem]
}
const collectionItems = collections()

const storyItems = collectionResponse.data.getCollectionBySlug.stories.map((item) => {
  const derivedItem = deriveStory(item)
  derivedItem['storyName'] = `Story - ${sanitizeString(derivedItem.title)}`
  return derivedItem
})

const itemsToDisplay = arrayToObject(
  [...savesItems, ...discoverItems, ...collectionItems, ...storyItems],
  'storyName'
)

export const Card = (args) => {
  const itemToDisplay = args.itemToDisplay
  const item = itemsToDisplay[itemToDisplay]

  if (!item) return <div>No card to display</div>

  const { itemId, readUrl, externalUrl, openExternal } = item
  const {
    tags,
    title,
    authors,
    publisher,
    excerpt,
    timeToRead,
    isSyndicated,
    isInternalItem,
    fromPartner
  } = item
  const openUrl = readUrl && !openExternal ? readUrl : externalUrl
  const getShownImage = () => {
    if (item?.noImage) return ''
    if (args.useHeroImage) return item?.heroImage || item?.thumbnail
    return item?.thumbnail
  }
  const itemImage = getShownImage()
  const shownPublisher = args.showAuthors ? false : publisher
  const shownAuthors = args.showAuthors ? authors : false

  return (
    <div className={grid}>
      <CardComponent
        itemId={itemId}
        externalUrl={externalUrl}
        tags={tags}
        title={title}
        itemImage={itemImage}
        publisher={shownPublisher}
        excerpt={excerpt}
        authors={shownAuthors}
        timeToRead={timeToRead}
        isSyndicated={isSyndicated}
        isInternalItem={isInternalItem}
        openUrl={openUrl}
        position={0}
        fromPartner={fromPartner}
        useMarkdown={true}
        ActionMenu={SavesActions}
        {...args}
      />
    </div>
  )
}

Card.args = {
  itemToDisplay: savesItems[0].storyName,
  ActionMenu: 'saves',
  showExcerpt: false,
  showMedia: true,
  hiddenActions: false,
  bulkSelected: false,
  shortcutSelected: false,
  isSyndicated: false,
  showAuthors: false,
  useHeroImage: true,
  fromPartner: true, // This is so we can superseded this with the selector
  partnerType: 'FALSE'
}

export default {
  title: 'Card/Card Shapes',
  component: CardComponent,
  decorators: [
    (Story) => (
      <div style={{ margin: '2em 1rem' }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    itemToDisplay: {
      control: {
        type: 'select',
        options: Object.keys(itemsToDisplay)
      }
    },
    cardShape: {
      control: {
        type: 'inline-radio'
      }
    },
    tags: {
      control: {
        type: 'inline-radio',
        options: ['none', 'one', 'a few', 'ridiculous']
      },
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
    ActionMenu: {
      control: {
        type: 'inline-radio',
        options: ['saves', 'recommendation', 'home', 'recent']
      },
      mapping: {
        saves: SavesActions,
        recommendation: RecommendationActions,
        home: HomeActions,
        recent: SimilarActions
      }
    },
    partnerType: {
      control: {
        type: 'inline-radio',
        options: ['FALSE', 'PARTNERED', 'SPONSORED']
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
    className: { table: { disable: true } },
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

function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü \\.,_-]/gim, '')
  return str.trim()
}
