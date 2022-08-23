import { GET_ITEMS_UNREAD } from 'actions'
import { GET_ITEMS_ARCHIVED } from 'actions'

import { GET_ITEMS_FAVORITES } from 'actions'
import { GET_ITEMS_FAVORITES_UNREAD } from 'actions'
import { GET_ITEMS_FAVORITES_ARCHIVED } from 'actions'

import { GET_ITEMS_ANNOTATED } from 'actions'
import { GET_ITEMS_ANNOTATED_UNREAD } from 'actions'
import { GET_ITEMS_ANNOTATED_ARCHIVED } from 'actions'
import { GET_ITEMS_ANNOTATED_FAVORITES } from 'actions'

import { GET_ITEMS_ARTICLES } from 'actions'
import { GET_ITEMS_ARTICLES_UNREAD } from 'actions'
import { GET_ITEMS_ARTICLES_ARCHIVED } from 'actions'
import { GET_ITEMS_ARTICLES_FAVORITES } from 'actions'

import { GET_ITEMS_VIDEOS } from 'actions'
import { GET_ITEMS_VIDEOS_UNREAD } from 'actions'
import { GET_ITEMS_VIDEOS_ARCHIVED } from 'actions'
import { GET_ITEMS_VIDEOS_FAVORITES } from 'actions'

import { GET_ITEMS_TAGS } from 'actions'
import { GET_ITEMS_TAGS_UNREAD } from 'actions'
import { GET_ITEMS_TAGS_ARCHIVED } from 'actions'
import { GET_ITEMS_TAGS_FAVORITES } from 'actions'

import { SEARCH_SAVED_ITEMS } from 'actions'
import { SEARCH_SAVED_ITEMS_UNREAD } from 'actions'
import { SEARCH_SAVED_ITEMS_ARCHIVED } from 'actions'
import { SEARCH_SAVED_ITEMS_FAVORITES } from 'actions'

/** FILTERS
 --------------------------------------------------------------- */
const UNREAD = { statuses: ['UNREAD'] }
const ARCHIVED = { statuses: ['ARCHIVED'] }
const ALL = { statuses: ['UNREAD', 'ARCHIVED'] }
const FAVORITED = { isFavorite: true }
const ANNOTATATED = { isHighlighted: true }
const ARTICLE = { contentType: 'IS_READABLE' }
const VIDEOS = { contentType: 'IS_VIDEO' }
const SORT_DEFAULT = { sortBy: 'CREATED_AT' }
const SORT_ARCHIVE = { sortBy: 'ARCHIVED_AT' }
const SORT_FAVORITE = { sortBy: 'FAVORITED_AT' }

/** FILTERS
 --------------------------------------------------------------- */


export const itemFiltersFromGraph = {
  [GET_ITEMS_UNREAD]: { filter: { ...UNREAD }, sort: SORT_DEFAULT },
  [GET_ITEMS_ARCHIVED]: { filter: { ...ARCHIVED }, sort: SORT_ARCHIVE },
  [GET_ITEMS_FAVORITES]: { filter: { ...FAVORITED, ...ALL }, sort: SORT_FAVORITE },
  [GET_ITEMS_FAVORITES_UNREAD]: { filter: { ...FAVORITED, ...UNREAD }, sort: SORT_FAVORITE },
  [GET_ITEMS_FAVORITES_ARCHIVED]: { filter: { ...FAVORITED, ...ARCHIVED }, sort: SORT_FAVORITE },
  [GET_ITEMS_ANNOTATED]: { filter: { ...ANNOTATATED, ...ALL }, sort: SORT_DEFAULT },
  [GET_ITEMS_ANNOTATED_UNREAD]: { filter: { ...ANNOTATATED, ...UNREAD }, sort: SORT_DEFAULT },
  [GET_ITEMS_ANNOTATED_ARCHIVED]: { filter: { ...ANNOTATATED, ...ARCHIVED }, sort: SORT_DEFAULT },
  [GET_ITEMS_ANNOTATED_FAVORITES]: { filter: { ...ANNOTATATED, ...FAVORITED, ...ALL }, sort: SORT_DEFAULT }, // prettier-ignore
  [GET_ITEMS_ARTICLES]: { filter: { ...ARTICLE, ...ALL }, sort: SORT_DEFAULT },
  [GET_ITEMS_ARTICLES_UNREAD]: { filter: { ...ARTICLE, ...UNREAD }, sort: SORT_DEFAULT },
  [GET_ITEMS_ARTICLES_ARCHIVED]: { filter: { ...ARTICLE, ...ARCHIVED }, sort: SORT_DEFAULT },
  [GET_ITEMS_ARTICLES_FAVORITES]: { filter: { ...ARTICLE, ...FAVORITED, ...ALL }, sort: SORT_DEFAULT }, // prettier-ignore
  [GET_ITEMS_VIDEOS]: { filter: { ...VIDEOS, ...ALL }, sort: SORT_DEFAULT },
  [GET_ITEMS_VIDEOS_UNREAD]: { filter: { ...VIDEOS, ...UNREAD }, sort: SORT_DEFAULT },
  [GET_ITEMS_VIDEOS_ARCHIVED]: { filter: { ...VIDEOS, ...ARCHIVED }, sort: SORT_DEFAULT },
  [GET_ITEMS_VIDEOS_FAVORITES]: { filter: { ...VIDEOS, ...FAVORITED, ...ALL }, sort: SORT_DEFAULT },
  [GET_ITEMS_TAGS]: { filter: { ...ALL }, sort: SORT_DEFAULT },
  [GET_ITEMS_TAGS_UNREAD]: { filter: { ...UNREAD }, sort: SORT_DEFAULT },
  [GET_ITEMS_TAGS_ARCHIVED]: { filter: { ...ARCHIVED }, sort: SORT_DEFAULT },
  [GET_ITEMS_TAGS_FAVORITES]: { filter: { ...FAVORITED, ...ALL }, sort: SORT_DEFAULT },
  [SEARCH_SAVED_ITEMS]: { sort: SORT_DEFAULT }, // Omit filter for all
  [SEARCH_SAVED_ITEMS_UNREAD]: { filter: { status: 'UNREAD' }, sort: SORT_DEFAULT },
  [SEARCH_SAVED_ITEMS_ARCHIVED]: { filter: { status: 'ARCHIVED' }, sort: SORT_DEFAULT },
  [SEARCH_SAVED_ITEMS_FAVORITES]: { filter: { ...FAVORITED }, sort: SORT_DEFAULT }
}
