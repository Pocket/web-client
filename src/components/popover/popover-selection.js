import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import classNames from 'classnames'
import { buttonReset } from 'components/buttons/button-reset'
import { overlayBase } from 'components/overlay/overlay'
import { HighlightIcon, IosShareIcon } from '@pocket/web-ui'

const popupContainer = css`
  position: absolute;
  left: 0;
  top: 0;
`

const popupWrapper = css`
  background-color: var(--color-popoverCanvas);
  position: relative;
  top: -60px;
  transform: translateX(-50%);
  font-family: 'Graphik Web';
  font-size: 16px;
  font-weight: 500;
  &:before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 0;
    height: 0;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid var(--color-popoverCanvas);
  }
  &.hideArrow:before {
    border-top: 8px solid transparent;
  }
`

const buttonWrapper = css`
  font-family: 'Graphik Web';
  padding: 13px 15px 15px !important;
  cursor: pointer;
  margin: 0;
  &:hover {
    color: var(--color-actionPrimaryHover);
    background-color: transparent;
  }
`

const iconWrapper = css`
  display: inline-block;
  margin-right: 6px;
`

class SelectionPopoverClass extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.containerRef = React.createRef()
  }

  onHighlight = () => {
    this.props.addAnnotation()
    this.props.disablePopup()
  }

  onShare = () => {
    this.props.shareItem({ quote: this.props.anchor?.toString() })
    this.props.disablePopup()
  }

  isClickOutside = (e) => {
    if (e.button !== 0) return // only process left-click
    if (
      !this.containerRef.current ||
      !this.containerRef.current.contains(e.target)
    ) {
      this.props.disablePopup()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.isClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.isClickOutside)
  }

  render() {
    const { anchor } = this.props
    if (!anchor || anchor.rangeCount === 0) return null

    const position = anchor.getRangeAt(0).getBoundingClientRect()

    const { right, left, top } = position
    let center = (right - left) / 2 + left

    return (
      <div
        className={popupContainer}
        style={{
          transform: `translate(${Math.round(center)}px, ${Math.round(
            top + window.scrollY
          )}px)`
        }}>
        <div
          className={classNames(overlayBase, popupWrapper, {
            hideArrow: this.state.share
          })}
          ref={this.containerRef}>
            <button
              className={classNames(buttonReset, buttonWrapper)}
              // aria-label={'shareExcerpt.highlight.aria'}
              onClick={this.onHighlight}>
              <span className={iconWrapper}>
                <HighlightIcon />
              </span>
              Highlight {/*"shareExcerpt.highlight.copy"*/}
            </button>
            <button
              className={classNames(buttonReset, buttonWrapper)}
              // aria-label={translate('shareExcerpt.highlight.aria')}
              onClick={this.onShare}>
              <span className={iconWrapper}>
                <IosShareIcon />
              </span>
              Share {/*"shareExcerpt.shareExcerpt.copy*/}
            </button>
        </div>
      </div>
    )
  }
}

SelectionPopoverClass.propTypes = {
  addAnnotation: PropTypes.func,
  shareItem: PropTypes.func,
  disablePopup: PropTypes.func
}

export const SelectionPopover = SelectionPopoverClass
