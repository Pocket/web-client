import React from 'react'
import { TagList } from './tag.list'
import { TagError } from './tag.error'
import { TagUpsell } from './tag.upsell'
import { TagSuggestions } from './tag.suggestions'

export default {
  title: 'Components/Tagging'
}

const TAG_LIST = ['business', 'art', 'family', 'school', 'health']
const SUGGESTED_TAG_LIST = ['elephants', 'tigers', 'family', 'health']

export const tagList = () => <TagList tags={TAG_LIST} />

export const tagListActive = () => <TagList tags={TAG_LIST} activeTags={['art', 'family']} />

export const errorTag = () => <TagError />

export const errorEmail = () => <TagError email />

export const tagUpsell = () => <TagUpsell onVisible={() => {}} />

export const tagSuggestionsLoading = () => <TagSuggestions />

export const tagSuggestions = () => (
  <TagSuggestions tags={TAG_LIST} suggestedTags={SUGGESTED_TAG_LIST} since={true} />
)
