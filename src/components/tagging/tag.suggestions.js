import { css } from 'linaria'
import { SuggestedTag } from 'components/tags/tags'
import { TagUpsell } from './tag.upsell'
import { Trans } from 'next-i18next'

const suggestedWrapper = css`
  display: block;
  padding: var(--size125) 0 0;
  min-height: 50px;
  font-family: 'Graphik Web';
  width: 100%;
  &.subtext {
    color: var(--color-textTertiary);
  }
`

const suggestionStyle = css`
  margin: 0 10px 10px 0;
`

function Loading() {
  return (
    <div className={`${suggestedWrapper} subtext`}>
      <Trans i18nKey="tags:loading-suggested">... loading suggested tags</Trans>
    </div>
  )
}

function StartTagging() {
  return (
    <div className={`${suggestedWrapper} subtext`}>
      <Trans i18nKey="tags:start-tagging">
        Start adding tags to your items in order to see them suggested here.
      </Trans>
    </div>
  )
}

function Suggestion({ tag, addTag }) {
  const onClick = () => addTag(tag)
  return (
    <SuggestedTag
      className={suggestionStyle}
      data-cy={`tag-suggestion-${tag}`}
      onClick={onClick}>
      {tag}
    </SuggestedTag>
  )
}

function NoSuggestions() {
  return (
    <div className={`${suggestedWrapper} subtext`}>
      <Trans i18nKey="tags:unable-to-find-suggested">
        We were unable to find any tags to suggest for this item.
      </Trans>
    </div>
  )
}

export function TagSuggestions({
  suggestedTags,
  tags,
  addTag,
  allTags
}) {
  // Loading if we don't have suggestedTags
  if (!suggestedTags) return <Loading />

  // No suggestions and no user tags
  if (suggestedTags?.length === 0 && allTags.length === 0) return <StartTagging />

  // No suggestions?
  if (suggestedTags?.length === 0) return <NoSuggestions />

  // We have tags, let's render them
  const tagList = suggestedTags.filter((tag) => !tags.includes(tag))
  return (
    <div className={suggestedWrapper}>
      {tagList.map((tag) => (
        <Suggestion tag={tag} addTag={addTag} key={tag} />
      ))}
    </div>
  )
}
