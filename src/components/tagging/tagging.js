import React, { Component } from 'react'
import { css } from 'linaria'
import { TagList } from './tag.list'
import { TagInput } from './tag.input'
import { TagError } from './tag.error'
import { TypeAhead } from 'components/type-ahead/type-ahead'

const tagBox = css`
  font-size: 12px;
  border-radius: 4px;
  display: block;
  border: 1px solid var(--color-formFieldBorder);
  padding: 0.7em 0.7em 0;
  min-height: 2em;
  width: 100%;
  position: relative;
`

export class Tagging extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      tags: props.tags,
      activeTags: [],
      inputReady: false
    }
  }

  componentDidMount() {
    this.setState({ inputReady: true })
  }

  setInputRef = input => {
    if (this.props.setInputRef) this.props.setInputRef(input)
    this.inputReference = input
  }
  setBlur = () => this.inputReference.blur()
  setFocus = () => this.inputReference.focus()

  onFocus = () => {}

  setValue = value => {
    this.props.setValue({ value })
  }

  setError = () => {
    this.setState({ hasError: true })
  }
  clearError = () => {
    this.setState({ hasError: false })
  }

  // Tag Handling
  selectClick = tag => {
    const tagActive = this.state.activeTags.includes(tag)
    tagActive ? this.makeTagInactive(tag) : this.makeTagActive(tag)
  }

  removeClick = tag => {
    this.props.removeTag(tag)
  }

  addTag = tag => {
    this.props.addTag(tag)
  }

  handleRemoveAction = () => {
    if (this.state.activeTags.length) return this.removeActiveTags()
    this.makeTagActive(this.props.tags.slice(-1)[0])
  }

  removeActiveTags = () => {
    const { activeTags } = this.state
    const { tags, setTags } = this.props
    setTags(tags.filter(tag => !activeTags.includes(tag)))
    this.setState({ activeTags: [] })
  }

  makeTagActive = tag => {
    this.setState({ activeTags: [...this.state.activeTags, tag] })
  }

  makeTagInactive = tag => {
    this.setState({
      activeTags: this.state.activeTags.filter(activeTag => activeTag !== tag)
    })
  }

  deactivateTags = () => {
    this.setState({ activeTags: [] })
  }

  render() {
    return (
      <div className={tagBox} onClick={this.setFocus}>
        {this.props.tags && (
          <TagList
            activeTags={this.state.activeTags}
            tags={this.props.tags}
            selectClick={this.selectClick}
            removeClick={this.removeClick}
          />
        )}
        <TagInput
          // Set Reference
          inputRef={this.setInputRef}
          setBlur={this.setBlur}
          // Value Handling
          value={this.props.value}
          setValue={this.props.setValue}
          characterLimit={!this.props.email ? 25 : 254}
          // Error Handling
          clearError={this.clearError}
          setError={this.setError}
          hasError={this.state.hasError}
          // Tags Active
          hasActiveTags={this.state.activeTags.length}
          deactivateTags={this.deactivateTags}
          handleRemoveAction={this.handleRemoveAction}
          // Passed Props
          addTag={this.addTag}
          onFocus={this.onFocus}
          email={this.props.email}
        />
        {this.props.typeahead && (
          <TypeAhead
            inputReady={this.state.inputReady}
            reFocus={this.setFocus}
            setValue={this.addTag}
            inputValue={this.props.value}
            textInput={this.inputReference}
            items={this.props.typeahead}
          />
        )}
        {this.state.hasError && (
          <TagError characterLimit={25} email={this.props.email} />
        )}
      </div>
    )
  }
}
