export const deriveCollectionPage = (response) => {
  return response.map((collection) => {
    const slug = collection.slug
    const url = `/collections/${slug}`
    const firstImage = collection.stories[0].thumbnail
    const authorImage = collection.authors[0].imageUrl
    const heroImage = collection.thumbnail
    return {
      ...collection,
      heroImage: heroImage,
      thumbnail: authorImage || firstImage,
      url,
      item_id: slug
    }
  })
}
