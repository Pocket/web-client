import React, { Component } from 'react'
import AutosizeInput from 'react-input-autosize'
import { KEYS } from 'common/constants'
import { css } from 'linaria'
import { validateEmail } from 'common/utilities'

const inputWrapper = css`
  max-width: 100%;
  display: inline-block;
  margin-bottom: 0.6em;
  input {
    font-family: 'Graphik Web';
    background-color: transparent;
    line-height: 22px;
    padding: 0;
    font-size: 16px;
    color: var(--color-formFieldTextPrimary);
    border: none;
    &:focus {
      outline: none;
    }
  }
`
// NOTE: AutosizeInput requires pure strings as className
const autoWrapper = css`
  overflow: hidden;
  max-width: 100%;
`
const inputStyle = css`
  display: block;
  min-width: 1em;
  border: 0;
  line-height: 16px;
  padding: 2px 0;
`

export class TagInput extends Component {
  /* Input Events
  –––––––––––––––––––––––––––––––––––––––––––––––––––– */
  onFocus = (event) => {
    this.props.onFocus(event)
  }

  onBlur = (event) => {
    this.props.onBlur && this.props.onBlur(event)
  }

  onChange = (event) => {
    this.props.setValue(event.target.value)
  }

  onKeyUp = (event) => {
    switch (event.keyCode) {
      // Handle intent to remove
      case KEYS.BACKSPACE:
      case KEYS.DELETE: {
        this.clearError()
        if (!this.props.value.length) this.props.handleRemoveAction()
        return
      }

      // Handle intent to exit
      case KEYS.ESCAPE: {
        this.clearError()
        this.props.setValue('')
        if (this.props.hasActiveTags) this.props.deactivateTags()
        if (!this.props.value.length) this.props.setBlur()
        return
      }

      // How necessary is this on every keyup
      default:
        if (this.props.hasActiveTags) this.props.deactivateTags()
    }
  }

  onInput = (event) => {
    // Check email validation
    if (
      event.charCode === KEYS.COMMA ||
      event.keyCode === KEYS.TAB ||
      event.keyCode === KEYS.ENTER
    ) {
      if (this.props.email && !validateEmail(this.props.value)) {
        this.setError()
        event.preventDefault()
        event.stopPropagation()
        return
      }
    }

    // Add Tag on comma or tab
    if (event.charCode === KEYS.COMMA || event.keyCode === KEYS.TAB) {
      event.preventDefault()
      event.stopPropagation()
      this.props.addTag(`${this.props.value}`)
      return
    }

    // Close on double enter
    if (event.keyCode === KEYS.ENTER) {
      event.preventDefault()
      event.stopPropagation()

      if (this.props.value.trim()) {
        this.props.addTag(`${this.props.value}`)
      } else {
        this.props.submitForm()
      }
      return
    }

    // Set error on tag length limit
    if (
      this.props.value &&
      this.props.value.length > this.props.characterLimit &&
      event.keyCode !== KEYS.BACKSPACE &&
      event.keyCode !== KEYS.DELETE &&
      event.keyCode !== KEYS.LEFT &&
      event.keyCode !== KEYS.UP &&
      event.keyCode !== KEYS.RIGHT &&
      event.keyCode !== KEYS.DOWN &&
      event.keyCode !== KEYS.ENTER
    ) {
      this.setError()
      event.preventDefault()
      return
    }
  }

  setError = () => {
    if (!this.props.hasError) this.props.setError()
  }

  clearError = () => {
    if (this.props.hasError) this.props.clearError()
  }

  render() {
    return (
      <div className={inputWrapper}>
        <AutosizeInput
          data-cy="tagging-input"
          autoFocus={true} //eslint-disable-line
          className={autoWrapper}
          inputRef={this.props.inputRef}
          inputClassName={inputStyle}
          value={this.props.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onInput}
          onKeyPress={this.onInput}
        />
      </div>
    )
  }
}
