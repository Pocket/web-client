/* Cleaned up vesion of https://github.com/JedWatson/react-input-autosize */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const sizerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre'
}

const INPUT_PROPS_BLACKLIST = [
  'extraWidth',
  'injectStyles',
  'inputClassName',
  'inputRef',
  'inputStyle',
  'minWidth',
  'onAutosize',
  'placeholderIsMinWidth'
]

const cleanInputProps = (inputProps) => {
  INPUT_PROPS_BLACKLIST.forEach((field) => delete inputProps[field])
  return inputProps
}

const copyStyles = (styles, node) => {
  node.style.fontSize = styles.fontSize
  node.style.fontFamily = styles.fontFamily
  node.style.fontWeight = styles.fontWeight
  node.style.fontStyle = styles.fontStyle
  node.style.letterSpacing = styles.letterSpacing
  node.style.textTransform = styles.textTransform
}

class AutosizeInput extends Component {
  static getDerivedStateFromProps(props, state) {
    const { id } = props
    return id !== state.prevId ? { inputId: id, prevId: id } : null
  }
  constructor(props) {
    super(props)
    const { id, minWidth = 1 } = props

    this.state = {
      inputWidth: minWidth,
      inputId: id,
      prevId: id
    }
  }
  componentDidMount() {
    this.mounted = true
    this.copyInputStyles()
    this.updateInputWidth()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputWidth !== this.state.inputWidth) {
      if (typeof this.props.onAutosize === 'function') {
        this.props.onAutosize(this.state.inputWidth)
      }
    }
    this.updateInputWidth()
  }
  componentWillUnmount() {
    this.mounted = false
  }
  inputRef = (el) => {
    this.input = el
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(el)
    }
  }
  placeHolderSizerRef = (el) => {
    this.placeHolderSizer = el
  }
  sizerRef = (el) => {
    this.sizer = el
  }
  copyInputStyles() {
    if (!this.mounted || !window.getComputedStyle) {
      return
    }
    const inputStyles = this.input && window.getComputedStyle(this.input)
    if (!inputStyles) {
      return
    }
    copyStyles(inputStyles, this.sizer)
    if (this.placeHolderSizer) {
      copyStyles(inputStyles, this.placeHolderSizer)
    }
  }
  updateInputWidth() {
    if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
      return
    }
    let newInputWidth
    if (
      this.props.placeholder &&
      (!this.props.value || (this.props.value && this.props.placeholderIsMinWidth))
    ) {
      newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2
    } else {
      newInputWidth = this.sizer.scrollWidth + 2
    }
    // add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
    const extraWidth =
      this.props.type === 'number' && this.props.extraWidth === undefined
        ? 16
        : parseInt(this.props.extraWidth) || 0
    newInputWidth += extraWidth
    if (newInputWidth < this.props.minWidth) {
      newInputWidth = this.props.minWidth
    }
    if (newInputWidth !== this.state.inputWidth) {
      this.setState({
        inputWidth: newInputWidth
      })
    }
  }
  getInput() {
    return this.input
  }
  focus() {
    this.input.focus()
  }
  blur() {
    this.input.blur()
  }
  select() {
    this.input.select()
  }

  render() {
    const sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(
      (previousValue, currentValue) => {
        if (previousValue !== null && previousValue !== undefined) {
          return previousValue
        }
        return currentValue
      }
    )

    const wrapperStyle = { ...this.props.style }
    if (!wrapperStyle.display) wrapperStyle.display = 'inline-block'

    const inputStyle = {
      boxSizing: 'content-box',
      width: `${this.state.inputWidth}px`,
      ...this.props.inputStyle
    }

    const { ...inputProps } = this.props
    cleanInputProps(inputProps)
    inputProps.className = this.props.inputClassName
    inputProps.id = this.state.inputId
    inputProps.style = inputStyle

    return (
      <div className={this.props.className} style={wrapperStyle}>
        <input {...inputProps} ref={this.inputRef} />
        <div ref={this.sizerRef} style={sizerStyle}>
          {sizerValue}
        </div>
        {this.props.placeholder ? (
          <div ref={this.placeHolderSizerRef} style={sizerStyle}>
            {this.props.placeholder}
          </div>
        ) : null}
      </div>
    )
  }
}

AutosizeInput.propTypes = {
  className: PropTypes.string, // className for the outer element
  defaultValue: PropTypes.any, // default field value
  extraWidth: PropTypes.oneOfType([
    // additional width for input element
    PropTypes.number,
    PropTypes.string
  ]),
  id: PropTypes.string, // id to use for the input, can be set for consistent snapshots
  injectStyles: PropTypes.bool, // inject the custom stylesheet to hide clear UI, defaults to true
  inputClassName: PropTypes.string, // className for the input element
  inputRef: PropTypes.func, // ref callback for the input element
  inputStyle: PropTypes.object, // css styles for the input element
  minWidth: PropTypes.oneOfType([
    // minimum width for input element
    PropTypes.number,
    PropTypes.string
  ]),
  onAutosize: PropTypes.func, // onAutosize handler: function(newWidth) {}
  onChange: PropTypes.func, // onChange handler: function(event) {}
  placeholder: PropTypes.string, // placeholder text
  placeholderIsMinWidth: PropTypes.bool, // don't collapse size to less than the placeholder
  style: PropTypes.object, // css styles for the outer element
  value: PropTypes.any // field value
}


export default AutosizeInput
