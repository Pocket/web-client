import React from 'react'
import { TagList } from './tag.list'
import { TagError } from './tag.error'
import { TagUpsell } from './tag.upsell'
import { TagSuggestions } from './tag.suggestions'
import { COLORS } from 'mock/colors'

export default {
  title: 'Components/Tagging'
}

const TAG_LIST = ['business', 'art', 'family', 'school', 'health']

export const tagList = () => <TagList tags={TAG_LIST} />

export const tagListActive = () => (
  <TagList tags={TAG_LIST} activeTags={['art', 'family']} />
)

export const errorTag = () => <TagError />

export const errorEmail = () => <TagError email />

export const tagUpsell = () => <TagUpsell />

export const tagSuggestions = () => (
  <TagSuggestions isPremium suggestedTags={TAG_LIST} />
)

export const tagSuggestionsNoPremium = () => <TagSuggestions />

export const tagSuggestionsLoading = () => <TagSuggestions isPremium />
