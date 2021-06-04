export function deriveCollectionStories(stories) {
  /**
   * @title {string} The most appropriate title to show
   * @thumbnail {url} The most appropriate image to show as a thumbnail
   * @publisher {string} The best text to display as the publisher of this item
   * @excerpt {string} The most appropriate excerpt to show
   * @open_url {url} The url that should be saved or opened
   * @share_url {url} The url that should be shared if the user shares this item
   * @save_status {string} A string value (unsaved, saving, saved)
   */
  return stories.map((story) => {
    return {
      item_id: story.item.itemId,
      title: story.title,
      thumbnail: story.thumbnail,
      publisher: story.publisher,
      excerpt: story.excerpt,
      save_url: story.url,
      open_url: story.url,
      syndicated: false,
      original_url: story.url,
      openExternal: false,
      save_status: 'unsaved',
      authors: story.authors
    }
  })
}
