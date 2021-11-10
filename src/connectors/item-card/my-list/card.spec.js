import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

import { savedParsedFromV3 } from 'common/api/derivers/list/parsed.spec'
import { savedParsedFromClientApi } from 'common/api/derivers/list/parsed.spec'

import { savedUnparsedFromV3 } from 'common/api/derivers/list/unparsed.spec'
import { savedUnparsedFromClientApi } from 'common/api/derivers/list/unparsed.spec'

import { savedVideoFromV3 } from 'common/api/derivers/list/video.spec'
import { savedVideoFromClientApi } from 'common/api/derivers/list/video.spec'

import { savedImageFromV3 } from 'common/api/derivers/list/image.spec'
import { savedImageFromClientApi } from 'common/api/derivers/list/image.spec'

import { savedLegacyListItem } from 'common/api/derivers/list/legacy.spec'
import { savedLegacyListItemFromClientApi } from 'common/api/derivers/list/legacy.spec'

import { savedCollectionFromV3 } from 'common/api/derivers/list/collection.spec'
import { savedCollectionFromClientApi } from 'common/api/derivers/list/collection.spec'

import { ItemCard as MyListCard } from 'connectors/item-card/my-list/card'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'

describe('ItemCard', () => {
  //Legacy Derivers

  const derivedSavedParsed = deriveMyListItems([savedParsedFromV3])[0]
  const derivedSavedUnparsed = deriveMyListItems([savedUnparsedFromV3])[0]
  const derivedSavedVideo = deriveMyListItems([savedVideoFromV3])[0]
  const derivedSavedImage = deriveMyListItems([savedImageFromV3])[0]
  const derivedSavedLegacy = deriveMyListItems([savedLegacyListItem])[0]
  const deriveSavedCollection = deriveMyListItems([savedCollectionFromV3])[0]

  const initialState = {
    user: { auth: true },
    analytics: {
      impressions: []
    },
    myListItemsById: {
      [derivedSavedParsed.item_id]: derivedSavedParsed,
      [derivedSavedUnparsed.item_id]: derivedSavedUnparsed,
      [derivedSavedVideo.item_id]: derivedSavedVideo,
      [derivedSavedImage.item_id]: derivedSavedImage,
      [derivedSavedLegacy.item_id]: derivedSavedLegacy,
      [deriveSavedCollection.item_id]: deriveSavedCollection
    }
  }

  beforeAll(() => {
    mockAllIsIntersecting()
  })

  // My List cards
  it('renders a saved article that can be parsed', () => {
    const { getByCy } = wrappedRender(<MyListCard id={derivedSavedParsed.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchInlineSnapshot(`
      <article
        class="c18o9ext grid hiddenActions noExcerpt"
        data-cy="article-card-3362121180"
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
              href="/read/3362121180"
              tabindex="-1"
            >
              <img
                alt=""
                src="https://pocket-image-cache.com/600x400/filters:format(jpg):extract_focal()/https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2021%2F06%2F22%2Fscience%2F21SCI-BRODY-CENTENARIANS%2F21SCI-BRODY-CENTENARIANS-facebookJumbo.jpg"
                srcset=" https://pocket-image-cache.com/1200x800/filters:format(jpg):extract_focal()/https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2021%2F06%2F22%2Fscience%2F21SCI-BRODY-CENTENARIANS%2F21SCI-BRODY-CENTENARIANS-facebookJumbo.jpg 2x "
                style="--fallbackBackground: #FCB64380; --fallbackColor: #FCB643; --fallbackLetter: 'T';"
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
                href="/read/3362121180"
                tabindex="0"
              >
                The Secrets of ‘Cognitive Super-Agers’
              </a>
            </h2>
            <cite
              class="details"
            >
              <a
                class="publisher"
                data-cy="publisher-link"
                href="http://nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html?utm_source=pocket_mylist"
                tabindex="0"
              >
                The New York Times
              </a>
              <span
                class="readtime"
                data-cy="read-time"
              >
                 
                · 
                5
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
            <div
              class="item-actions"
            >
              <span>
                <button
                  aria-label="item-action:favorite"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:favorite"
                  data-tooltip="item-action:favorite"
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
                        d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Zm0 3.26L9.958 8.397a1 1 0 0 1-.753.548l-4.567.663 3.305 3.221a1 1 0 0 1 .287.885l-.78 4.548 4.085-2.147a1 1 0 0 1 .93 0l4.085 2.147-.78-4.548a1 1 0 0 1 .287-.885l3.305-3.22-4.567-.664a1 1 0 0 1-.753-.548L12 4.26Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:archive"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:archive"
                  data-tooltip="item-action:archive"
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
                        d="M1 4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4Zm2 0v2h18V4H3Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Zm2 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H5v10Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M15.707 11.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 14.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:tag"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:tag"
                  data-tooltip="item-action:tag"
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
                        d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 1.414.586L20 11.172a4 4 0 0 1 0 5.656L16.828 20a4 4 0 0 1-5.656 0l-8.586-8.586A2 2 0 0 1 2 10V4Zm8 0 8.586 8.586a2 2 0 0 1 0 2.828l-3.172 3.172a2 2 0 0 1-2.828 0L4 10V4h6Z"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M9 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:share"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:share"
                  data-tooltip="item-action:share"
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
                        d="M11.293 1.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 4.414V13a1 1 0 1 1-2 0V4.414L8.707 6.707a1 1 0 0 1-1.414-1.414l4-4Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M4 10a1 1 0 0 1 1 1v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a1 1 0 1 1 2 0v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-7a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:delete"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:delete"
                  data-tooltip="item-action:delete"
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
                        d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4h5a1 1 0 1 1 0 2h-1v11a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7H2a1 1 0 0 1 0-2h5Zm2 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2H9ZM5 7h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M9 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1ZM15 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
            </div>
          </div>
        </footer>
      </article>
    `)
  })

  it('renders a saved article that can`t be parsed', () => {
    const { getByCy } = wrappedRender(<MyListCard id={derivedSavedUnparsed.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchInlineSnapshot(`
      <article
        class="c18o9ext grid hiddenActions noExcerpt"
        data-cy="article-card-3117582481"
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
              href="https://www.myswitzerland.com/en-us/destinations/blausee/"
              tabindex="-1"
            >
              <img
                alt=""
                src="https://pocket-image-cache.com/600x400/filters:format(jpg):extract_focal()/https%3A%2F%2Fwww.myswitzerland.com%2F-%2Fmedia%2Fst%2Fgadmin%2Fimages%2Faccommodation%2Fsummer%2Ftypically%2520swiss%2Fk-img_5780_2_36163.jpg"
                srcset=" https://pocket-image-cache.com/1200x800/filters:format(jpg):extract_focal()/https%3A%2F%2Fwww.myswitzerland.com%2F-%2Fmedia%2Fst%2Fgadmin%2Fimages%2Faccommodation%2Fsummer%2Ftypically%2520swiss%2Fk-img_5780_2_36163.jpg 2x "
                style="--fallbackBackground: #1CB0A880; --fallbackColor: #1CB0A8; --fallbackLetter: 'B';"
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
                href="https://www.myswitzerland.com/en-us/destinations/blausee/"
                tabindex="0"
              >
                Blausee
              </a>
            </h2>
            <cite
              class="details"
            >
              <a
                class="publisher"
                data-cy="publisher-link"
                href="https://www.myswitzerland.com/en-us/destinations/blausee/?utm_source=pocket_mylist"
                tabindex="0"
              >
                myswitzerland.com
              </a>
              <span
                class="readtime"
                data-cy="read-time"
              >
                 
                · 
                2
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
            <div
              class="item-actions"
            >
              <span>
                <button
                  aria-label="item-action:favorite"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:favorite"
                  data-tooltip="item-action:favorite"
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
                        d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Zm0 3.26L9.958 8.397a1 1 0 0 1-.753.548l-4.567.663 3.305 3.221a1 1 0 0 1 .287.885l-.78 4.548 4.085-2.147a1 1 0 0 1 .93 0l4.085 2.147-.78-4.548a1 1 0 0 1 .287-.885l3.305-3.22-4.567-.664a1 1 0 0 1-.753-.548L12 4.26Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:archive"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:archive"
                  data-tooltip="item-action:archive"
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
                        d="M1 4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4Zm2 0v2h18V4H3Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Zm2 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H5v10Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M15.707 11.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 14.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:tag"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:tag"
                  data-tooltip="item-action:tag"
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
                        d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 1.414.586L20 11.172a4 4 0 0 1 0 5.656L16.828 20a4 4 0 0 1-5.656 0l-8.586-8.586A2 2 0 0 1 2 10V4Zm8 0 8.586 8.586a2 2 0 0 1 0 2.828l-3.172 3.172a2 2 0 0 1-2.828 0L4 10V4h6Z"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M9 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:share"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:share"
                  data-tooltip="item-action:share"
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
                        d="M11.293 1.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 4.414V13a1 1 0 1 1-2 0V4.414L8.707 6.707a1 1 0 0 1-1.414-1.414l4-4Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M4 10a1 1 0 0 1 1 1v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a1 1 0 1 1 2 0v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-7a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:delete"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:delete"
                  data-tooltip="item-action:delete"
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
                        d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4h5a1 1 0 1 1 0 2h-1v11a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7H2a1 1 0 0 1 0-2h5Zm2 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2H9ZM5 7h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M9 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1ZM15 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
            </div>
          </div>
        </footer>
      </article>
    `)
  })

  it('renders a saved collection', () => {
    const { getByCy } = wrappedRender(<MyListCard id={deriveSavedCollection.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchInlineSnapshot(`
      <article
        class="c18o9ext grid hiddenActions noExcerpt"
        data-cy="article-card-3453456445"
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
              href="/collections/delicious-reads-about-your-favorite-candy"
              tabindex="-1"
            >
              <img
                alt=""
                src="https://pocket-image-cache.com/600x400/filters:format(jpg):extract_focal()/https%3A%2F%2Fpocket-image-cache.com%2F1200x%2Ffilters%3Aformat(jpg)%3Aextract_focal()%2Fhttps%253A%252F%252Fs3.amazonaws.com%252Fpocket-collectionapi-prod-images%252F756e1877-8857-45c4-b9f6-84c62a0700b5.png"
                srcset=" https://pocket-image-cache.com/1200x800/filters:format(jpg):extract_focal()/https%3A%2F%2Fpocket-image-cache.com%2F1200x%2Ffilters%3Aformat(jpg)%3Aextract_focal()%2Fhttps%253A%252F%252Fs3.amazonaws.com%252Fpocket-collectionapi-prod-images%252F756e1877-8857-45c4-b9f6-84c62a0700b5.png 2x "
                style="--fallbackBackground: #00CB7780; --fallbackColor: #00CB77; --fallbackLetter: 'D';"
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
                href="/collections/delicious-reads-about-your-favorite-candy"
                tabindex="0"
              >
                Delicious Reads About Your Favorite Candy
              </a>
            </h2>
            <cite
              class="details"
            >
              <a
                class="publisher"
                data-cy="publisher-link"
                href="https://getpocket.com/collections/delicious-reads-about-your-favorite-candy?utm_source=pocket_mylist"
                tabindex="0"
              >
                Pocket
              </a>
              <span
                class="readtime"
                data-cy="read-time"
              >
                 
                · 
                2
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
            <div
              class="item-actions"
            >
              <span>
                <button
                  aria-label="item-action:favorite"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:favorite"
                  data-tooltip="item-action:favorite"
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
                        d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Zm0 3.26L9.958 8.397a1 1 0 0 1-.753.548l-4.567.663 3.305 3.221a1 1 0 0 1 .287.885l-.78 4.548 4.085-2.147a1 1 0 0 1 .93 0l4.085 2.147-.78-4.548a1 1 0 0 1 .287-.885l3.305-3.22-4.567-.664a1 1 0 0 1-.753-.548L12 4.26Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:archive"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:archive"
                  data-tooltip="item-action:archive"
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
                        d="M1 4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4Zm2 0v2h18V4H3Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Zm2 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H5v10Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M15.707 11.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 14.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:tag"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:tag"
                  data-tooltip="item-action:tag"
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
                        d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 1.414.586L20 11.172a4 4 0 0 1 0 5.656L16.828 20a4 4 0 0 1-5.656 0l-8.586-8.586A2 2 0 0 1 2 10V4Zm8 0 8.586 8.586a2 2 0 0 1 0 2.828l-3.172 3.172a2 2 0 0 1-2.828 0L4 10V4h6Z"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M9 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:share"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:share"
                  data-tooltip="item-action:share"
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
                        d="M11.293 1.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 4.414V13a1 1 0 1 1-2 0V4.414L8.707 6.707a1 1 0 0 1-1.414-1.414l4-4Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M4 10a1 1 0 0 1 1 1v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a1 1 0 1 1 2 0v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-7a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:delete"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:delete"
                  data-tooltip="item-action:delete"
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
                        d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4h5a1 1 0 1 1 0 2h-1v11a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7H2a1 1 0 0 1 0-2h5Zm2 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2H9ZM5 7h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M9 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1ZM15 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
            </div>
          </div>
        </footer>
      </article>
    `)
  })

  it('renders a saved video', () => {
    const { getByCy } = wrappedRender(<MyListCard id={derivedSavedVideo.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchInlineSnapshot(`
      <article
        class="c18o9ext grid hiddenActions noExcerpt"
        data-cy="article-card-2815325547"
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
              href="/read/2815325547"
              tabindex="-1"
            >
              <img
                alt=""
                src="https://pocket-image-cache.com/600x400/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.ytimg.com%2Fvi%2F1AnG04qnLqI%2Fmqdefault.jpg"
                srcset=" https://pocket-image-cache.com/1200x800/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.ytimg.com%2Fvi%2F1AnG04qnLqI%2Fmqdefault.jpg 2x "
                style="--fallbackBackground: #00CB7780; --fallbackColor: #00CB77; --fallbackLetter: 'M';"
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
                href="/read/2815325547"
                tabindex="0"
              >
                Mufasa- its friday then.
              </a>
            </h2>
            <cite
              class="details"
            >
              <a
                class="publisher"
                data-cy="publisher-link"
                href="https://www.youtube.com/watch?utm_source=pocket_mylist&v=1AnG04qnLqI"
                tabindex="0"
              >
                YouTube
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
            <div
              class="item-actions"
            >
              <span>
                <button
                  aria-label="item-action:favorite"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:favorite"
                  data-tooltip="item-action:favorite"
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
                        d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Zm0 3.26L9.958 8.397a1 1 0 0 1-.753.548l-4.567.663 3.305 3.221a1 1 0 0 1 .287.885l-.78 4.548 4.085-2.147a1 1 0 0 1 .93 0l4.085 2.147-.78-4.548a1 1 0 0 1 .287-.885l3.305-3.22-4.567-.664a1 1 0 0 1-.753-.548L12 4.26Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:archive"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:archive"
                  data-tooltip="item-action:archive"
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
                        d="M1 4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4Zm2 0v2h18V4H3Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Zm2 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H5v10Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M15.707 11.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 14.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:tag"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:tag"
                  data-tooltip="item-action:tag"
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
                        d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 1.414.586L20 11.172a4 4 0 0 1 0 5.656L16.828 20a4 4 0 0 1-5.656 0l-8.586-8.586A2 2 0 0 1 2 10V4Zm8 0 8.586 8.586a2 2 0 0 1 0 2.828l-3.172 3.172a2 2 0 0 1-2.828 0L4 10V4h6Z"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M9 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:share"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:share"
                  data-tooltip="item-action:share"
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
                        d="M11.293 1.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 4.414V13a1 1 0 1 1-2 0V4.414L8.707 6.707a1 1 0 0 1-1.414-1.414l4-4Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M4 10a1 1 0 0 1 1 1v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a1 1 0 1 1 2 0v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-7a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:delete"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:delete"
                  data-tooltip="item-action:delete"
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
                        d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4h5a1 1 0 1 1 0 2h-1v11a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7H2a1 1 0 0 1 0-2h5Zm2 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2H9ZM5 7h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M9 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1ZM15 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
            </div>
          </div>
        </footer>
      </article>
    `)
  })

  it('renders a saved image', () => {
    const { getByCy } = wrappedRender(<MyListCard id={derivedSavedImage.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchInlineSnapshot(`
      <article
        class="c18o9ext grid hiddenActions noExcerpt"
        data-cy="article-card-3462094779"
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
              href="/read/3462094779"
              tabindex="-1"
            >
              <img
                alt=""
                src="https://pocket-image-cache.com/600x400/filters:format(jpg):extract_focal()/https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F59947%2Fscreenshots%2F16700535%2Fmedia%2F335d386abb459f49570030e830429cef.jpg"
                srcset=" https://pocket-image-cache.com/1200x800/filters:format(jpg):extract_focal()/https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F59947%2Fscreenshots%2F16700535%2Fmedia%2F335d386abb459f49570030e830429cef.jpg 2x "
                style="--fallbackBackground: #00CB7780; --fallbackColor: #00CB77; --fallbackLetter: '3';"
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
                href="/read/3462094779"
                tabindex="0"
              >
                335d386abb459f49570030e830429cef.jpg (1600×1200)
              </a>
            </h2>
            <cite
              class="details"
            >
              <a
                class="publisher"
                data-cy="publisher-link"
                href="https://cdn.dribbble.com/users/59947/screenshots/16700535/media/335d386abb459f49570030e830429cef.jpg?utm_source=pocket_mylist"
                tabindex="0"
              >
                cdn.dribbble.com
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
            <div
              class="item-actions"
            >
              <span>
                <button
                  aria-label="item-action:favorite"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:favorite"
                  data-tooltip="item-action:favorite"
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
                        d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Zm0 3.26L9.958 8.397a1 1 0 0 1-.753.548l-4.567.663 3.305 3.221a1 1 0 0 1 .287.885l-.78 4.548 4.085-2.147a1 1 0 0 1 .93 0l4.085 2.147-.78-4.548a1 1 0 0 1 .287-.885l3.305-3.22-4.567-.664a1 1 0 0 1-.753-.548L12 4.26Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:archive"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:archive"
                  data-tooltip="item-action:archive"
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
                        d="M1 4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4Zm2 0v2h18V4H3Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Zm2 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H5v10Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M15.707 11.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 14.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:tag"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:tag"
                  data-tooltip="item-action:tag"
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
                        d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 1.414.586L20 11.172a4 4 0 0 1 0 5.656L16.828 20a4 4 0 0 1-5.656 0l-8.586-8.586A2 2 0 0 1 2 10V4Zm8 0 8.586 8.586a2 2 0 0 1 0 2.828l-3.172 3.172a2 2 0 0 1-2.828 0L4 10V4h6Z"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M9 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:share"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:share"
                  data-tooltip="item-action:share"
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
                        d="M11.293 1.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 4.414V13a1 1 0 1 1-2 0V4.414L8.707 6.707a1 1 0 0 1-1.414-1.414l4-4Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M4 10a1 1 0 0 1 1 1v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a1 1 0 1 1 2 0v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-7a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:delete"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:delete"
                  data-tooltip="item-action:delete"
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
                        d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4h5a1 1 0 1 1 0 2h-1v11a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7H2a1 1 0 0 1 0-2h5Zm2 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2H9ZM5 7h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M9 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1ZM15 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
            </div>
          </div>
        </footer>
      </article>
    `)
  })

  it('renders a legacy saved item', () => {
    const { getByCy } = wrappedRender(<MyListCard id={derivedSavedLegacy.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchInlineSnapshot(`
      <article
        class="c18o9ext grid hiddenActions noExcerpt"
        data-cy="article-card-3059000415"
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
              href="/read/3059000415"
              tabindex="-1"
            >
              <img
                alt=""
                src="https://pocket-image-cache.com/600x400/filters:format(jpg):extract_focal()/https%3A%2F%2Fpocket-image-cache.com%2F1200x%2Ffilters%3Aformat(jpg)%3Aextract_focal()%2Fhttps%253A%252F%252Fpocket-syndicated-images.s3.amazonaws.com%252Farticles%252F5173%252F1595617454_GettyImages-1168909015.jpgcrop.jpg"
                srcset=" https://pocket-image-cache.com/1200x800/filters:format(jpg):extract_focal()/https%3A%2F%2Fpocket-image-cache.com%2F1200x%2Ffilters%3Aformat(jpg)%3Aextract_focal()%2Fhttps%253A%252F%252Fpocket-syndicated-images.s3.amazonaws.com%252Farticles%252F5173%252F1595617454_GettyImages-1168909015.jpgcrop.jpg 2x "
                style="--fallbackBackground: #1CB0A880; --fallbackColor: #1CB0A8; --fallbackLetter: 'T';"
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
                href="/read/3059000415"
                tabindex="0"
              >
                The Undisciplined Pursuit of More (The Art of Limiting Yourself to Only The Essential)
              </a>
            </h2>
            <cite
              class="details"
            >
              <a
                class="publisher"
                data-cy="publisher-link"
                href="https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential?utm_source=pocket_mylist"
                tabindex="0"
              >
                Pocket
              </a>
              <span
                class="readtime"
                data-cy="read-time"
              >
                 
                · 
                5
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
            <div
              class="item-actions"
            >
              <span>
                <button
                  aria-label="item-action:unfavorite"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq active"
                  data-cy="item-action:unfavorite"
                  data-tooltip="item-action:unfavorite"
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
                        d="M12 1a1 1 0 0 1 .897.557l2.706 5.484 6.051.88a1 1 0 0 1 .555 1.705l-4.38 4.268 1.034 6.027a1 1 0 0 1-1.45 1.054L12 18.13l-5.413 2.845a1 1 0 0 1-1.45-1.054l1.033-6.027-4.379-4.268a1 1 0 0 1 .555-1.706l6.051-.88 2.706-5.483A1 1 0 0 1 12 1Zm0 3.26L9.958 8.397a1 1 0 0 1-.753.548l-4.567.663 3.305 3.221a1 1 0 0 1 .287.885l-.78 4.548 4.085-2.147a1 1 0 0 1 .93 0l4.085 2.147-.78-4.548a1 1 0 0 1 .287-.885l3.305-3.22-4.567-.664a1 1 0 0 1-.753-.548L12 4.26Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:archive"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:archive"
                  data-tooltip="item-action:archive"
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
                        d="M1 4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4Zm2 0v2h18V4H3Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Zm2 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H5v10Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M15.707 11.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 14.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:tag"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:tag"
                  data-tooltip="item-action:tag"
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
                        d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 1.414.586L20 11.172a4 4 0 0 1 0 5.656L16.828 20a4 4 0 0 1-5.656 0l-8.586-8.586A2 2 0 0 1 2 10V4Zm8 0 8.586 8.586a2 2 0 0 1 0 2.828l-3.172 3.172a2 2 0 0 1-2.828 0L4 10V4h6Z"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M9 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:share"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:share"
                  data-tooltip="item-action:share"
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
                        d="M11.293 1.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 4.414V13a1 1 0 1 1-2 0V4.414L8.707 6.707a1 1 0 0 1-1.414-1.414l4-4Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M4 10a1 1 0 0 1 1 1v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a1 1 0 1 1 2 0v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-7a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
              <span>
                <button
                  aria-label="item-action:delete"
                  class="m11fpiro t1221eea pmdugmx d1ihjjkq"
                  data-cy="item-action:delete"
                  data-tooltip="item-action:delete"
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
                        d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4h5a1 1 0 1 1 0 2h-1v11a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7H2a1 1 0 0 1 0-2h5Zm2 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2H9ZM5 7h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"
                        fill-rule="evenodd"
                      />
                      <path
                        clip-rule="evenodd"
                        d="M9 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1ZM15 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </span>
            </div>
          </div>
        </footer>
      </article>
    `)
  })
})
