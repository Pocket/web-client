import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

import { storyFromClientApi } from 'common/api/derivers/collection/story.spec'
import { ItemCard as StoryCard } from 'connectors/item-card/collection/story-card'
import { deriveCollectionStories } from 'connectors/items-by-id/collection/stories.derive'

describe('ItemCard', () => {
  //Legacy Derivers
  const derivedStory = deriveCollectionStories([storyFromClientApi])[0]

  const initialState = {
    user: { auth: true },
    analytics: {
      impressions: []
    },
    collectionStoriesById: {
      [derivedStory.item_id]: derivedStory
    }
  }

  beforeAll(() => {
    mockAllIsIntersecting()
  })

  it('renders a story', () => {
    const { getByCy } = wrappedRender(<StoryCard id={derivedStory.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })
})
