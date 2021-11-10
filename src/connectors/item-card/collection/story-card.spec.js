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
    /**
     * ===============================================================
     * !! IMPORTANT !!
     * ———————————————————————
     * !! Inline snapshots are generated and should not be edited directly
     * !! If this needs updating, use the jest interface to do so by running a test
     * !! and following the prompts to update.  But only do so if the change was
     * !! intentional.
     * ===============================================================
     **/

    expect(getByCy('article-card-', { exact: false })).toMatchInlineSnapshot(`
      <article
        class="c18o9ext grid noExcerpt"
        data-cy="article-card-1731163180"
      >
        <div
          class="selectedBack"
        />
        <div
          class="cardWrap"
        >
          <div
            class="c97c5c media"
          >
            <a
              data-cy="image-link"
              href="https://www.nytimes.com/2017/05/06/business/inside-vws-campaign-of-trickery.html"
              tabindex="-1"
            >
              <img
                alt=""
                src="https://pocket-image-cache.com/600x400/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F914953af-15fd-46b9-ba3c-eed3ed278f9a.jpeg"
                srcset=" https://pocket-image-cache.com/1200x800/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F914953af-15fd-46b9-ba3c-eed3ed278f9a.jpeg 2x "
                style="--fallbackBackground: #FCB64380; --fallbackColor: #FCB643; --fallbackLetter: 'I';"
              />
            </a>
          </div>
          <div
            class="content"
          >
            <h2
              class="title"
            >
              <a
                data-cy="title-link"
                href="https://www.nytimes.com/2017/05/06/business/inside-vws-campaign-of-trickery.html"
                tabindex="0"
              >
                Inside VW’s Campaign of Trickery
              </a>
            </h2>
            <cite
              class="details"
            >
              <div
                class="authors"
              >
                <span>
                  Jack Ewing
                </span>
              </div>
              <a
                class="publisher"
                data-cy="publisher-link"
                href="https://www.nytimes.com/2017/05/06/business/inside-vws-campaign-of-trickery.html"
                tabindex="0"
              >
                The New York Times
              </a>
            </cite>
          </div>
        </div>
        <footer
          class="footer"
        >
          <div
            class="i18uycg6 actions"
          >
            <button
              class="b5bt6fr sb4ns5w unsaved card-actions"
              data-cy="article-save-btn-1731163180"
            >
              <span
                class="igxbmuu icon "
              >
                <svg
                  aria-hidden="true"
                  aria-labelledby=" "
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2H2Zm2 0H2v6c0 5.523 4.477 10 10 10s10-4.477 10-10V5h-2v6a8 8 0 1 1-16 0V5Z"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M7.293 9.293a1 1 0 0 1 1.414 0L12 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"
                    fill-rule="evenodd"
                  />
                </svg>
              </span>
              <div
                class="actionCopy"
              >
                item-action:save-unsaved
              </div>
            </button>
          </div>
        </footer>
      </article>
    `)
  })
})
