import { deriveRecommendation } from 'common/api/derivers/item'

const discoverItemFromSlate = {
  item: {
    isArticle: true,
    title: 'A Syrian Seed Bank’s Fight to Survive',
    itemId: '3460049565',
    normalUrl:
      'http://newyorker.com/news/annals-of-a-warming-planet/a-syrian-seed-banks-fight-to-survive',
    resolvedId: '3460049565',
    resolvedUrl:
      'https://www.newyorker.com/news/annals-of-a-warming-planet/a-syrian-seed-banks-fight-to-survive',
    domain: null,
    domainMetadata: {
      name: 'The New Yorker'
    },
    excerpt:
      'The International Center for Agricultural Research in the Dry Areas, known as ICARDA, is housed in a cluster of small buildings on a dusty property in Lebanon’s Bekaa Valley, halfway between Beirut and Damascus.',
    hasImage: 'HAS_IMAGES',
    hasVideo: 'NO_VIDEOS',
    images: [
      {
        caption: 'Illustration by Lennard Kok',
        credit: 'Illustration  Lennard Kok',
        height: 0,
        imageId: 1,
        src: 'https://media.newyorker.com/photos/616d9640a3e83f834a643513/master/w_2560%2Cc_limit/SullivanSeedBank_lennardkok_final%2520(1).jpg',
        width: 0
      }
    ],
    topImageUrl:
      'https://media.newyorker.com/photos/616d9640a3e83f834a643513/16:9/w_1280,c_limit/SullivanSeedBank_lennardkok_final%20(1).jpg',
    wordCount: 3176,
    timeToRead: 14,
    givenUrl:
      'http://newyorker.com/news/annals-of-a-warming-planet/a-syrian-seed-banks-fight-to-survive',
    syndicatedArticle: null
  },
  id: 'RecommendationAPI/3460049565',
  curatedInfo: {
    title: 'A Syrian Seed Bank’s Fight to Survive',
    excerpt:
      'Scientists have raced to safeguard a newly precious resource: plants that can thrive in a changing climate.',
    imageSrc:
      'https://media.newyorker.com/photos/616d9640a3e83f834a643513/16:9/w_1280,c_limit/SullivanSeedBank_lennardkok_final%20(1).jpg'
  }
}

describe('Discover', () => {
  const expectedItemOpen = 'http://newyorker.com/news/annals-of-a-warming-planet/a-syrian-seed-banks-fight-to-survive?utm_source=pocket_mylist' //prettier-ignore
  const expectedSaveUrl = 'http://newyorker.com/news/annals-of-a-warming-planet/a-syrian-seed-banks-fight-to-survive' //prettier-ignore
  const expectedExternalUrl = 'http://newyorker.com/news/annals-of-a-warming-planet/a-syrian-seed-banks-fight-to-survive?utm_source=pocket_mylist' //prettier-ignore
  const expectedReadUrl = false //prettier-ignore
  const expectedPermanentUrl = 'https://getpocket.com/library/?pl_i=3460049565'

  it('should derive clientAPI as expected', () => {
    const item = deriveRecommendation(discoverItemFromSlate)

    // User driven data points
    expect(item._createdAt).toBeFalsy()
    expect(item._updatedAt).toBeFalsy()
    expect(item.status).toBeFalsy()
    expect(item.isFavorite).toBeFalsy()
    expect(item.isArchived).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toBeFalsy()

    // UnDerived content should come from the server
    expect(item.itemId).toBe('3460049565')
    expect(item.resolvedId).toBe('3460049565')
    expect(item.isSyndicated).toBe(false)
    expect(item.isReadable).toBe(true)
    expect(item.isCollection).toBe(false)
    expect(item.isArticle).toBeTruthy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('HAS_IMAGES')

    expect(item.language).toBeFalsy()

    // Derived content
    expect(item.title).toBe('A Syrian Seed Bank’s Fight to Survive')
    expect(item.thumbnail).toBe(
      'https://media.newyorker.com/photos/616d9640a3e83f834a643513/16:9/w_1280,c_limit/SullivanSeedBank_lennardkok_final%20(1).jpg'
    )
    expect(item.publisher).toBe('The New Yorker')
    expect(item.excerpt).toBe(
      'Scientists have raced to safeguard a newly precious resource: plants that can thrive in a changing climate.'
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(false)
    expect(item.timeToRead).toBe(14)
    expect(item.authors).toBeFalsy()
  })
})
