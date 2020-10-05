import React, { Component } from 'react'
import { css } from 'linaria'
import { SuggestedTag } from 'components/tags/tags'
import { Loader } from 'components/loader/loader'
import { TagUpsell } from './tag.upsell'

const suggestedWrapper = css`
  padding: 10px 0;
  min-height: 50px;
  font-family: "Graphik Web";
`

const CantFindSuggestions = () => {
  //"tagging.errors.noSuggestedTags"
  return "We were unable to find any suggested tags for this item"
}

export class TagSuggestions extends Component {
  prevent = event => {
    event.preventDefault()
  }

  get usedTags() {
    return this.props.tags || []
  }

  get suggestedTags() {
    const tags = this.props.suggestedTags || []
    return tags
      .filter(item => !this.usedTags.includes(item))
      .map((tag, index) => {
        return (
          <SuggestedTag
            margin="0 10px 10px 0"
            key={tag + index}
            onClick={() => {
              this.props.addTag(tag)
            }}>
            {tag}
          </SuggestedTag>
        )
      })
  }

  get suggestionsLoader() {
    return (
      <div className={suggestedWrapper}>
        {
          (this.props.suggestedTags === undefined)
            ? <Loader isVisible />
            : this.suggestedTags.length
              ? this.suggestedTags
              : <CantFindSuggestions />
        }
      </div>
    )
  }

  render() {
    return this.props.isPremium
      ? this.suggestionsLoader
      : <TagUpsell trackClick={this.props.trackClick} />
  }
}
