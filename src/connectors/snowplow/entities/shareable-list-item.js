import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/5c6a2540cd75d3baef34f659a7902732616502c996e513770d7e2c8bad926fc6
 */
const SHAREABLE_LIST_ITEM_SCHEMA_URL = getSchemaUri('shareable_list_item', '1-0-3')

/**
 * Entity that describes the concept of an item within a shareable list. This item must be added by a logged-in user to the shareable list, which also saves the item to the user's Saves (For the time being, any item that is able to be added to the shareable list must already have been saved to the user's list).
 *
 * @param shareableListItemExternalId {string} @required - The unique backend identifier for a shared list item
 * @param shareableListExternalId {string} @required - The backend identifier for the parent shareable list of which the item belongs to. May be not unique.
 * @param givenUrl {string} @required - The full URL of the content. Warning, this is a unique URL and does NOT uniquely identify the same piece of content across multiple users. For that, use content_id.
 * @param title {string} - The title of the shareable list item.
 * @param excerpt {string} - The excerpt of the shareable list item.
 * @param imageUrl {string} - The url of the main image of the shareable list item.
 * @param authors {array} - The list of the author(s) for the shareable list item.
 * @param publisher {string} - The publisher for the shareable list item.
 * @param note {string} - An optional note that the list owner may add to a list item.
 * @param sortOrder {integer} @required - The zero-based index of the story within the shareable list.
 * @param createdAt {integer} @required - The UTC unix timestamp (in seconds) for when the shareable list item was created.
 * @param updatedAt {integer} - The UTC unix timestamp (in seconds) for when the shareable list item was last updated.
 *
 * @returns {{schema: *, data: {
 *  shareable_list_item_external_id: string,
 *  shareable_list_external_id: string,
 *  given_url: string,
 *  title: string,
 *  excerpt: string,
 *  image_url: string,
 *  authors: array,
 *  publisher: string,
 *  note: string,
 *  sort_order: integer,
 *  created_at: integer,
 *  updated_at: integer
 * }}}
 */

export const createShareableListItemEntity = ({
  shareableListItemExternalId,
  shareableListExternalId,
  givenUrl,
  title,
  excerpt,
  imageUrl,
  authors,
  publisher,
  note,
  sortOrder = 0,
  createdAt,
  updatedAt
}) => ({
  schema: SHAREABLE_LIST_ITEM_SCHEMA_URL,
  data: getObjectWithValidKeysOnly({
    shareable_list_item_external_id: shareableListItemExternalId,
    shareable_list_external_id: shareableListExternalId,
    given_url: givenUrl,
    title: title,
    excerpt: excerpt,
    image_url: imageUrl,
    authors: authors,
    publisher: publisher,
    note: note,
    sort_order: sortOrder,
    created_at: createdAt,
    updated_at: updatedAt
  })
})

export default createShareableListItemEntity
