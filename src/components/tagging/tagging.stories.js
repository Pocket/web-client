import React from 'react'
import { TagList } from './tag.list'
import { TagError } from './tag.error'
import { TagUpsell } from './tag.upsell'
import { TagSuggestions } from './tag.suggestions'
import { Tagging } from './tagging'
import { TagModal } from './tag.modal'
import { COLORS } from 'mock/colors'

export default {
  title: 'Components/Tagging'
}

// https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
function _getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    return arr
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
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

export const tagModal = () => (
  <TagModal
    suggestedTags={_getRandom(COLORS, 3)}
    typeahead={COLORS} />
)
export const tagModalHasTags = () => (
  <TagModal
    currentTags={_getRandom(COLORS, 2)}
    suggestedTags={_getRandom(COLORS, 3)}
    typeahead={COLORS} />
)
export const tagModalSuggestions = () => (
  <TagModal
    isPremium
    currentTags={_getRandom(COLORS, 2)}
    suggestedTags={_getRandom(COLORS, 3)}
    typeahead={COLORS} />
)
export const tagModalSuggestionsLoading = () => (
  <TagModal
    isPremium
    currentTags={_getRandom(COLORS, 2)}
    typeahead={COLORS} />
)
export const tagModalNoSuggestions = () => (
  <TagModal
    isPremium
    currentTags={_getRandom(COLORS, 2)}
    suggestedTags={[]}
    typeahead={COLORS} />
)

/* Tagging Story
------------------------------------------------------- */
class MockState extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tags: _getRandom(COLORS, 5) }
  }

  addTag = tag => {
    if (this.state.tags.includes(tag)) return
    this.setState({ tags: [...this.state.tags, tag] })
  }

  removeTag = tag => {
    if (!this.state.tags.includes(tag)) return
    this.setState({ tags: this.state.tags.filter(current => current !== tag) })
  }

  setTags = tags => {
    this.setState({ tags })
  }

  render() {
    return (
      <React.Fragment>
        <Tagging
          addTag={this.addTag}
          removeTag={this.removeTag}
          setTags={this.setTags}
          tags={this.state.tags}
          typeahead={COLORS}
        />
      </React.Fragment>
    )
  }
}

export const tagging = () => <MockState />
