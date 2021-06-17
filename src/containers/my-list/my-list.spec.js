import { sortByNewest } from './my-list.sorters'
import { sortByOldest } from './my-list.sorters'
import { sortByNewestArchive } from './my-list.sorters'
import { sortByOldestArchive } from './my-list.sorters'
import { sortByNewestFavorite } from './my-list.sorters'
import { sortByOldestFavorite } from './my-list.sorters'

import { filterByUnread } from './my-list.filters'
import { filterByArchived } from './my-list.filters'
import { filterByFavorites } from './my-list.filters'
import { filterByHighlights } from './my-list.filters'
import { filterByArticles } from './my-list.filters'
import { filterByVideos } from './my-list.filters'
import { filterByTags } from './my-list.filters'

const listToSort = [
  {
    hero: 'Spider-Man',
    name: 'Peter Benjamin Parker',
    time_added: '1',
    time_favorited: '100000',
    time_read: '10',
    is_article: '1',
    has_video: '0',
    favorite: '1',
    status: '1',
    tags: { hero: '' }
  },
  {
    hero: 'CAPTAIN MARVEL',
    name: 'Carol Danvers',
    time_added: '2',
    time_favorited: '99874',
    time_read: '20',
    is_article: '1',
    has_video: '1',
    favorite: '1',
    status: '1',
    tags: { hero: '' }
  },
  {
    hero: 'Black Widow',
    name: "Natalia 'Natasha' Alianovna Romanova",
    time_added: '4',
    time_favorited: '99622',
    time_read: '0',
    is_article: '1',
    has_video: '2',
    favorite: '1',
    status: '0'
  },
  {
    hero: 'Wolverine',
    name: 'James Howlett',
    time_added: '6',
    time_favorited: '0',
    time_read: '60',
    is_article: '1',
    has_video: '0',
    favorite: '0',
    status: '1',
    tags: { hero: '' },
    annotations: {}
  },
  {
    hero: 'Captain America',
    name: 'Steven Rogers',
    time_added: '7',
    time_favorited: '99244',
    time_read: '0',
    is_article: '1',
    has_video: '0',
    favorite: '1',
    status: '0'
  },
  {
    hero: 'Magneto',
    name: 'Max Eisenhardt',
    time_added: '14',
    time_favorited: '0',
    time_read: '0',
    is_article: '1',
    has_video: '1',
    favorite: '0',
    status: '0'
  },
  {
    hero: 'Thanos',
    name: 'Thanos',
    time_added: '15',
    time_favorited: '0',
    time_read: '150',
    is_article: '0',
    has_video: '2',
    favorite: '0',
    status: '1',
    annotations: {}
  },
  {
    hero: 'Black Cat',
    name: 'Felicia Hardy',
    time_added: '16',
    time_favorited: '98110',
    time_read: '0',
    is_article: '1',
    has_video: '0',
    favorite: '1',
    status: '0',
    tags: { villan: '' }
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
