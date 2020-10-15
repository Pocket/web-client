import React from 'react'
import { css } from 'linaria'
import { Tagging } from './tagging'
import { TagSuggestions } from './tag.suggestions'
import {
  Button,
  breakpointLargeTablet,
  breakpointTinyTablet,
  Modal,
  ModalBody,
  ModalFooter
} from '@pocket/web-ui'
import { buttonReset } from 'components/buttons/button-reset'
import { overlayBase } from 'components/overlay/overlay'
import classNames from 'classnames'

const panelWrapper = css`
  position: relative;
  box-sizing: border-box;
  padding: 20px 0 0;
  width: 500px;

  > div {
    padding-right: 20px;
    padding-left: 20px;
  }

  ${breakpointLargeTablet} {
    width: 400px;
  }

  ${breakpointTinyTablet} {
    width: 500px;
  }
`

const panelTagging = css`
  display: flex;
  align-content: flex-end;
  align-items: center;
  width: 100%;
`

const buttonStyles = css`
  margin-left: 10px;
  padding: 14px;
`

export class TagModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      actionable: false,
      tags: props.currentTags ? props.currentTags : []
    }
  }

  setInputRef = input => {
    this.inputRef = input
  }

  setValue = value => {
    this.setState({ value })
  }

  addTag = tag => {
    this.setState({ value: '' })
    if (this.inputRef) this.inputRef.focus()
    if (this.state.tags.includes(tag)) return
    this.setState({ actionable: true, tags: [...this.state.tags, tag] })
  }

  removeTag = tag => {
    if (!this.state.tags.includes(tag)) return
    this.setState({
      actionable: true,
      tags: this.state.tags.filter(current => current !== tag)
    })
  }

  setTags = tags => {
    this.setState({ actionable: true, tags })
  }

  onSubmit = () => {
    const tag = this.state.value
    if (tag) {
      const tags = [...this.state.tags, tag]
      return this.props.confirmModal({ tags })
    }

    // send tags to State here
    // this.props.confirmModal({ tags: this.state.tags })
    this.props.setModalOpen(false)
  }

  render() {
    const { isOpen, setModalOpen, appRootSelector } = this.props
    const isActive = this.state.value || this.state.actionable
    return (
      <Modal
        appRootSelector={appRootSelector}
        title="Edit Tags"
        screenReaderLabel="Edit Article Tags"
        isOpen={isOpen}
        handleClose={() => setModalOpen(false)}>
        <ModalBody className={panelTagging}>
            <Tagging
              setInputRef={this.setInputRef}
              value={this.state.value}
              setValue={this.setValue}
              addTag={this.addTag}
              removeTag={this.removeTag}
              setTags={this.setTags}
              tags={this.state.tags}
              typeahead={this.props.typeahead}
            />

            <Button
              onClick={this.onSubmit}
              className={buttonStyles}
              disabled={!isActive}>
              Save {/*'tagging.modal.save'*/}
            </Button>
        </ModalBody>
        <ModalFooter>
          <TagSuggestions
            suggestedTags={this.props.suggestedTags}
            tags={this.state.tags}
            addTag={this.addTag}
            isPremium={this.props.isPremium}
            trackClick={this.props.trackClick}
          />
        </ModalFooter>
      </Modal>
    )
  }
}
