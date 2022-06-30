import React from 'react'
import { TypeAhead } from './type-ahead'
import { KEYS } from 'common/constants'
import { COLORS } from 'mocks/_data/colors'

export default {
  title: 'Forms/TypeAhead'
}

class TypeAheadStory extends React.Component {
  constructor(props) {
    super(props)
    this.state = { inputValue: '' }
  }

  setTextInputRef = (element) => (this.textInput = element)
  setValue = (value) => {
    this.setState({ inputValue: value })
  }
  onChange = (event) => this.setValue(event.target.value)
  reFocus = () => this.textInput.current.focus()

  keyDown = (event) => {
    if (event.keyCode === KEYS.ESCAPE) this.setValue('')
  }

  componentDidMount() {
    this.setState({ inputReady: true })
  }

  render() {
    return (
      <div style={{ width: '300px', position: 'relative' }}>
        <input
          style={{ width: '100%', boxSizing: 'border-box' }}
          ref={this.setTextInputRef}
          type="text"
          value={this.state.inputValue}
          onChange={this.onChange}
          onKeyDown={this.keyDown}
        />

        <TypeAhead
          // inputReady={this.state.inputReady}
          reFocus={this.reFocus}
          setValue={this.setValue}
          inputValue={this.state.inputValue}
          textInput={this.textInput}
          items={COLORS}
        />
      </div>
    )
  }
}

export const typeAhead = () => <TypeAheadStory />
