export const deriveCollectionPage = (response) => {
  return response.map((collection) => {
    if (!collection) return false
    const slug = collection.slug
    const url = `/collections/${slug}`
    const firstImage = collection.stories[0]?.thumbnail || false
    const authorImage = collection.authors[0]?.imageUrl || false
    const heroImage = collection.thumbnail || false
    return {
      ...collection,
      heroImage: heroImage,
      thumbnail: authorImage || firstImage,
      url,
      item_id: slug
    }
  })
}
