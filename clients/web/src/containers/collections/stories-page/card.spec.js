import { render } from '@config/jest'
import '@testing-library/jest-dom'

import { storyFromClientApi } from 'common/api/derivers/collection/story.spec'
import { ItemCard as StoryCard } from './card'
import { deriveStory } from 'common/api/derivers/item'

describe('ItemCard', () => {
  //Legacy Derivers
  const derivedStory = deriveStory(storyFromClientApi)

  const initialState = {
    user: { auth: true },
    analytics: {
      impressions: []
    },
    itemsDisplay: {
      [derivedStory.itemId]: derivedStory
    }
  }

  it('renders a story', () => {
    const { getByTestId } = render(<StoryCard id={derivedStory.itemId} position={3} />, { initialState }) //prettier-ignore
    expect(getByTestId('article-card-', { exact: false })).toMatchSnapshot()
  })
})
