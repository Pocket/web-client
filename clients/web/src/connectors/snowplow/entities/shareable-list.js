import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/7b895f09809942a835587b02a58b7a835f92e16a726f5d224a43b90d219ae9c4
 */
const SHAREABLE_LIST_SCHEMA_URL = getSchemaUri('shareable_list', '1-0-6')

/**
 * Entity that describes the concept list that can be created then shared with other users regardless of logged-in status
 *
 * @param shareableListExternalId {string} @required - The unique backend identifier for a shared list
 * @param listItemNoteVisibility {string} @required - Indication of whether the list's notes are private or public.
 * @param slug {string} - The slug for the shareable list
 * @param title {string} @required - The title of the shareable list
 * @param description {string} - The description of the shareable list (filled in by the user creating the list)
 * @param status {["PUBLIC", "PRIVATE"]} @required - Indication of whether the list is private (default) or public (after publishing)
 * @param moderationStatus {["VISIBLE", "HIDDEN"]} @required - Indication of whether the list is viewable vs. has been deleted by being (1) reported by a user, (2) reviewed by the moderation team, (3) reviewed by legal, and (4) deleted for violating Terms of Service
 * @param moderatedBy {string} - The name of the moderator that reviewed the reported list. NULL by default
 * @param moderationReason {string} - The reason that the shareable list was reviewed & moderated. NULL by default
 * @param createdAt {integer} @required - The UTC unix timestamp (in seconds) for when the shareable list was created
 * @param updatedAt {integer} - The UTC unix timestamp (in seconds) for when the shareable list was last updated
 *
 * @returns {{schema: *, data: {
 *  shareable_list_external_id: string,
 *  list_item_note_visibility: string,
 *  slug: string,
 *  title: string,
 *  description: string,
 *  status: enum,
 *  moderation_status: enum,
 *  moderated_by: string,
 *  moderation_reason: string,
 *  created_at: integer,
 *  updated_at: integer
 * }}}
 */

export const createShareableListEntity = ({
  shareableListExternalId,
  listItemNoteVisibility = 'PRIVATE',
  slug,
  title,
  description,
  status,
  moderationStatus,
  moderatedBy,
  moderationReason,
  createdAt,
  updatedAt
}) => ({
  schema: SHAREABLE_LIST_SCHEMA_URL,
  data: getObjectWithValidKeysOnly({
    shareable_list_external_id: shareableListExternalId,
    list_item_note_visibility: listItemNoteVisibility,
    slug: slug,
    title: title,
    description: description,
    status: status,
    moderation_status: moderationStatus,
    moderated_by: moderatedBy,
    moderation_reason: moderationReason,
    created_at: createdAt,
    updated_at: updatedAt
  })
})

export default createShareableListEntity
