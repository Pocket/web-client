import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

import { lineupAnalytics } from 'common/api/derivers/discover/discover.spec'
import { slateAnalytics } from 'common/api/derivers/discover/discover.spec'
import { recommendationsFromSlate } from 'common/api/derivers/discover/discover.spec'

import { ItemCard as DiscoverCard } from 'connectors/item-card/discover/card'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'

describe('ItemCard', () => {
  //Legacy Derivers
  const derivedDiscoverItem = deriveDiscoverItems([recommendationsFromSlate])[0]

  const initialState = {
    user: { auth: true },
    analytics: {
      impressions: []
    },
    discoverItemsById: {
      [derivedDiscoverItem.item_id]: derivedDiscoverItem
    }
  }

  beforeAll(() => {
    mockAllIsIntersecting()
  })

  // Discover card
  it('renders a discover item', () => {
    const { getByCy } = wrappedRender(<DiscoverCard id={derivedDiscoverItem.item_id} position={3} />, { initialState }) //prettier-ignore
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
        data-cy="article-card-3460462323"
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
              href="http://theverge.com/22734645/apple-macbook-pro-2021-ports-magsafe-touch-bar-usb-c-future?utm_source=pocket_discover"
              tabindex="-1"
            >
              <img
                alt=""
                src="https://pocket-image-cache.com/600x400/filters:format(jpg):extract_focal()/https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2F26f5VRT9jvt6JW6WB4Nohu849cI%3D%2F0x137%3A1911x1138%2Ffit-in%2F1200x630%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F22938855%2FApple_MacBook_Pro_Ports_10182021.jpg"
                srcset=" https://pocket-image-cache.com/1200x800/filters:format(jpg):extract_focal()/https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2F26f5VRT9jvt6JW6WB4Nohu849cI%3D%2F0x137%3A1911x1138%2Ffit-in%2F1200x630%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F22938855%2FApple_MacBook_Pro_Ports_10182021.jpg 2x "
                style="--fallbackBackground: #00CB7780; --fallbackColor: #00CB77; --fallbackLetter: 'A';"
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
                href="http://theverge.com/22734645/apple-macbook-pro-2021-ports-magsafe-touch-bar-usb-c-future?utm_source=pocket_discover"
                tabindex="0"
              >
                Apple is ready to admit it was wrong about the future of laptops
              </a>
            </h2>
            <cite
              class="details"
            >
              <a
                class="publisher"
                data-cy="publisher-link"
                href="http://theverge.com/22734645/apple-macbook-pro-2021-ports-magsafe-touch-bar-usb-c-future?utm_source=pocket_discover"
                tabindex="0"
              >
                The Verge
              </a>
              <span
                class="readtime"
                data-cy="read-time"
              >
                 
                · 
                7
                 min
              </span>
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
              data-cy="article-save-btn-3460462323"
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
            <button
              class="m11fpiro"
              data-cy="overflow"
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
                    d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM6 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM22 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </footer>
      </article>
    `)
  })
})
