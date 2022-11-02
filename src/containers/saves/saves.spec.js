import { sortByNewest } from './saves.sorters'
import { sortByOldest } from './saves.sorters'
import { sortByNewestArchive } from './saves.sorters'
import { sortByOldestArchive } from './saves.sorters'
import { sortByNewestFavorite } from './saves.sorters'
import { sortByOldestFavorite } from './saves.sorters'

import { filterByUnread } from './saves.filters'
import { filterByArchived } from './saves.filters'
import { filterByFavorites } from './saves.filters'
import { filterByHighlights } from './saves.filters'
import { filterByArticles } from './saves.filters'
import { filterByVideos } from './saves.filters'
import { filterByTags } from './saves.filters'

/** Node data
 * _createdAt
 * _updatedAt
 * url
 * status
 * isFavorite
 * favoritedAt
 * isArchived
 * archivedAt
 **/

const listToSort = [
  {
    hero: 'Spider-Man',
    name: 'Peter Benjamin Parker',
    _createdAt: '1',
    favoritedAt: '100000',
    archivedAt: '10',
    isArticle: true,
    hasVideo: 'NO_VIDEOS',
    isFavorite: true,
    status: 'ARCHIVED',
    hasAnnotations: false,
    tags: [{ name: 'hero' }]
  },
  {
    hero: 'CAPTAIN MARVEL',
    name: 'Carol Danvers',
    _createdAt: '2',
    favoritedAt: '99874',
    archivedAt: '20',
    isArticle: true,
    hasVideo: 'HAS_VIDEOS',
    isFavorite: true,
    status: 'ARCHIVED',
    hasAnnotations: false,
    tags: [{ name: 'hero' }]
  },
  {
    hero: 'Black Widow',
    name: "Natalia 'Natasha' Alianovna Romanova",
    _createdAt: '4',
    favoritedAt: '99622',
    archivedAt: '0',
    isArticle: true,
    hasVideo: 'IS_VIDEO',
    isFavorite: true,
    status: 'UNREAD',
    hasAnnotations: false
  },
  {
    hero: 'Wolverine',
    name: 'James Howlett',
    _createdAt: '6',
    favoritedAt: '0',
    archivedAt: '60',
    isArticle: true,
    hasVideo: 'NO_VIDEOS',
    favorite: '0',
    status: 'ARCHIVED',
    hasAnnotations: true,
    tags: [{ name: 'hero' }]
  },
  {
    hero: 'Captain America',
    name: 'Steven Rogers',
    _createdAt: '7',
    favoritedAt: '99244',
    archivedAt: '0',
    isArticle: true,
    hasVideo: 'NO_VIDEOS',
    isFavorite: true,
    status: 'UNREAD',
    hasAnnotations: false
  },
  {
    hero: 'Magneto',
    name: 'Max Eisenhardt',
    _createdAt: '14',
    favoritedAt: '0',
    archivedAt: '0',
    isArticle: true,
    hasVideo: 'HAS_VIDEOS',
    favorite: '0',
    status: 'UNREAD',
    hasAnnotations: false
  },
  {
    hero: 'Thanos',
    name: 'Thanos',
    _createdAt: '15',
    favoritedAt: '0',
    archivedAt: '150',
    isArticle: false,
    hasVideo: 'IS_VIDEO',
    isFavorite: false,
    status: 'ARCHIVED',
    hasAnnotations: true
  },
  {
    hero: 'Black Cat',
    name: 'Felicia Hardy',
    _createdAt: '16',
    favoritedAt: '98110',
    archivedAt: '0',
    isArticle: true,
    hasVideo: 'NO_VIDEOS',
    isFavorite: true,
    status: 'UNREAD',
    hasAnnotations: false,
    tags: [{ name: 'villan' }]
  }
]

describe('Filtering', () => {
  it('should filterUnread', () => {
    const filteredList = listToSort.filter(filterByUnread)
    expect(filteredList.map((item) => item.hero)).toStrictEqual([
      'Black Widow',
      'Captain America',
      'Magneto',
      'Black Cat'
    ])
  })

  it('should filterArchived', () => {
    const filteredList = listToSort.filter(filterByArchived)
    expect(filteredList.map((item) => item.hero)).toStrictEqual([
      'Spider-Man',
      'CAPTAIN MARVEL',
      'Wolverine',
      'Thanos'
    ])
  })

  it('should filterByFavorited', () => {
    const filteredList = listToSort.filter(filterByFavorites)
    expect(filteredList.map((item) => item.hero)).toStrictEqual([
      'Spider-Man',
      'CAPTAIN MARVEL',
      'Black Widow',
      'Captain America',
      'Black Cat'
    ])
  })

  it('should filterByHighlights', () => {
    const filteredList = listToSort.filter(filterByHighlights)
    expect(filteredList.map((item) => item.hero)).toStrictEqual(['Wolverine', 'Thanos'])
  })

  it('should filterByArticles', () => {
    const filteredList = listToSort.filter(filterByArticles)
    expect(filteredList.map((item) => item.hero)).toStrictEqual([
      'Spider-Man',
      'CAPTAIN MARVEL',
      'Black Widow',
      'Wolverine',
      'Captain America',
      'Magneto',
      'Black Cat'
    ])
  })

  it('should filterByVideos', () => {
    const filteredList = listToSort.filter(filterByVideos)
    expect(filteredList.map((item) => item.hero)).toStrictEqual(['Black Widow', 'Thanos'])
  })

  it('should filterByTags', () => {
    const tag = 'hero'

    const filteredList = listToSort.filter((item) => filterByTags(item, tag))
    expect(filteredList.map((item) => item.hero)).toStrictEqual([
      'Spider-Man',
      'CAPTAIN MARVEL',
      'Wolverine'
    ])
  })
})

describe('Sorting', () => {
  it('should sortByNewest', () => {
    const sortedList = listToSort.sort(sortByNewest)
    const totalItems = sortedList.length - 1
    expect(sortedList[0].name).toBe('Felicia Hardy')
    expect(sortedList[totalItems].name).toBe('Peter Benjamin Parker')
  })

  it('should sortByOldest', () => {
    const sortedList = listToSort.sort(sortByOldest)
    const totalItems = sortedList.length - 1
    expect(sortedList[totalItems].name).toBe('Felicia Hardy')
    expect(sortedList[0].name).toBe('Peter Benjamin Parker')
  })

  it('should sortByNewestArchive', () => {
    const sortedList = listToSort.filter(filterByArchived).sort(sortByNewestArchive)
    const totalItems = sortedList.length - 1
    expect(sortedList[0].name).toBe('Thanos')
    expect(sortedList[totalItems].name).toBe('Peter Benjamin Parker')
  })

  it('should sortByOldestArchive', () => {
    const sortedList = listToSort.filter(filterByArchived).sort(sortByOldestArchive)
    const totalItems = sortedList.length - 1
    expect(sortedList[0].name).toBe('Peter Benjamin Parker')
    expect(sortedList[totalItems].name).toBe('Thanos')
  })

  it('should sortByNewestFavorite', () => {
    const sortedList = listToSort.filter(filterByFavorites).sort(sortByNewestFavorite)
    const totalItems = sortedList.length - 1
    expect(sortedList[0].name).toBe('Peter Benjamin Parker')
    expect(sortedList[totalItems].name).toBe('Felicia Hardy')
  })

  it('should sortByOldestFavorite', () => {
    const sortedList = listToSort.filter(filterByFavorites).sort(sortByOldestFavorite)
    const totalItems = sortedList.length - 1
    expect(sortedList[0].name).toBe('Felicia Hardy')
    expect(sortedList[totalItems].name).toBe('Peter Benjamin Parker')
  })
})
