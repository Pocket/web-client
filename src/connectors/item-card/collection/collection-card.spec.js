import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

import { collectionFromClientApi } from 'common/api/derivers/collection/page.spec'
import { partnerCollectionFromClientApi } from 'common/api/derivers/collection/page.spec'
import { ItemCard as CollectionCard } from 'connectors/item-card/collection/collection-card'
import { deriveCollectionPage } from 'connectors/items-by-id/collection/page.derive'

describe('ItemCard', () => {
  //Legacy Derivers
  const derivedCollection = deriveCollectionPage([collectionFromClientApi])[0]

  const initialState = {
    user: { auth: true },
    analytics: {
      impressions: []
    },
    collectionsBySlug: {
      [derivedCollection.item_id]: derivedCollection
    }
  }

  beforeAll(() => mockAllIsIntersecting())

  it('renders a collection', () => {
    const { getByCy } = wrappedRender(<CollectionCard id={derivedCollection.item_id} position={3} />, { initialState }) //prettier-ignore
    /**
     * ===============================================================
     * !! IMPORTANT !!
     * ———————————————————————
     * !! Inline snapshots are generated and should not be edited directly
     * !! If this needs updating, use the jest interface to do so.
     * ===============================================================
     **/

    expect(getByCy('article-card-', { exact: false })).toMatchInlineSnapshot(`
      <article
        class="c18o9ext grid noExcerpt"
        data-cy="article-card-making-sense-of-cybersecurity-in-2021"
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
              href="/collections/making-sense-of-cybersecurity-in-2021"
              tabindex="-1"
            >
              <img
                alt=""
                src="https://pocket-image-cache.com/600x400/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F51ebddac-b680-4162-bf8c-78a48dbd4a61.png"
                srcset=" https://pocket-image-cache.com/1200x800/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F51ebddac-b680-4162-bf8c-78a48dbd4a61.png 2x "
                style="--fallbackBackground: #EF405680; --fallbackColor: #EF4056; --fallbackLetter: 'M';"
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
                href="/collections/making-sense-of-cybersecurity-in-2021"
                tabindex="0"
              >
                Making Sense of Cybersecurity in 2021
              </a>
            </h2>
            <cite
              class="details"
            >
              <div
                class="authors"
              >
                <span>
                  Alex Argüelles
                </span>
              </div>
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
              data-cy="article-save-btn-making-sense-of-cybersecurity-in-2021"
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
