import { BASE_URL } from 'common/constants'

export function deriveCollectionItems(response) {
  /**
 * @title {string} The most appropriate title to show
 * @thumbnail {url} The most appropriate image to show as a thumbnail
 * @publisher {string} The best text to display as the publisher of this item
 * @excerpt {string} The most appropriate excerpt to show
 * @open_url {url} The url that should be saved or opened
 * @share_url {url} The url that should be shared if the user shares this item
 * @save_status {string} A string value (unsaved, saving, saved)
 */
    return response.map((collectionItem) => {
    return {
      slug: collectionItem.slug,
      title: collectionItem.title,
      thumbnail: collectionItem.thumbnail,
      publisher: 'Pocket',
      excerpt: collectionItem.excerpt,
      save_url: collectionUrl(collectionItem),
      open_url: collectionUrl(collectionItem),
      syndicated: false,
      original_url: collectionUrl(collectionItem),
      openExternal: false,
      save_status: 'unsaved',
      authors: collectionItem.authors
    }
  })
}

function collectionUrl(collectionItem) {
  return `/collections/${collectionItem.slug}`
}

