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

function UpSell({ trackClick }) {
  return (
    <div className={suggestedWrapper}>
      <TagUpsell trackClick={trackClick} />
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
      <Trans i18nKey="tags:could-not-find-suggested">
        We didn't find any tag suggestions
      </Trans>
    </div>
  )
}

export function TagSuggestions({
  suggestedTags,
  tags,
  addTag,
  isPremium,
  trackClick
}) {
  // UpSell if user is not premium
  if (!isPremium) return <UpSell trackClick={trackClick} />

  // Loading if we don't have suggestedTags
  if (!suggestedTags) return <Loading />

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
