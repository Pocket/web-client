import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import { ItemCard } from './card'

//!! This test is not very effective.  Keeping it for parity as we switch to jest
describe('ItemCard', () => {
  it('renders an article card', () => {
    const mockState = {
      user: { auth: true },
      analytics: {
        impressions: []
      },
      discoverItemsById: {
        12345: {
          resolved_id: '12345',
          save_url: 'https://isithalloween.com',
          save_status: 'saved'
        }
      }
    }

    mockAllIsIntersecting()

    // render the topic card
    const { getByCy } = wrappedRender(<ItemCard id="12345" position={3} />, {
      initialState: mockState
    })

    expect(getByCy('article-card-', { exact: false }))
  })
})
