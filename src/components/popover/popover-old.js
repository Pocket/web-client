import React, { useCallback, useState, useRef, PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { css } from 'linaria'
import { overlayBase } from 'components/overlay/overlay'
import classNames from 'classnames'

const popoverContent = css`
  width: auto;
  position: absolute;
  padding: 0;
  z-index: var(--zIndexTooltip);
  top: 100%;
  bottom: 'initial';
  right: 0;
  left: 'initial';

  &.attachBottom {
    top: 'initial';
    bottom: '100%';
  }
  &.collisionLeft {
    right: 'initial';
    left: 0;
  }
  &.tooltip {
    padding: 5px 10px 6px;
  }
`

const nullWrapper = css`
  display: inline-flex;
  position: relative;
  line-height: inherit;
  align-items: center;
  align-content: center;
`

const triggerWrapper = css`
  cursor: pointer;
`

const inlineWrapper = css`
  display: inline-block;
`

export const PopoverContext = React.createContext()

export class Cancel extends PureComponent {
  render() {
    return (
      <PopoverContext.Consumer>
        {({ deActivate }) => (
          <div className={inlineWrapper} onClick={deActivate}>
            {this.props.children}
          </div>
        )}
      </PopoverContext.Consumer>
    )
  }
}

export class Trigger extends PureComponent {
  render() {
    return (
      <PopoverContext.Consumer>
        {({ toggle, activateOnClick, onHover, offHover, triggerRef }) =>
          activateOnClick ? (
            <div
              onClick={toggle}
              className={classNames(triggerWrapper, nullWrapper, 'trigger')}
              ref={triggerRef}>
              {this.props.children}
            </div>
          ) : (
            <div
              ref={triggerRef}
              className={classNames(triggerWrapper, nullWrapper, 'trigger')}
              onMouseOver={onHover}
              onMouseOut={offHover}>
              {this.props.children}
            </div>
          )
        }
      </PopoverContext.Consumer>
    )
  }
}

export class Content extends PureComponent {
  render() {
    return (
      <PopoverContext.Consumer>
        {({
          on,
          onHover,
          offHover,
          onClick,
          persist,
          collisionLeft,
          attachBottom
        }) => {
          return on ? (
            <div
              className={classNames(popoverContent, {
                attachBottom,
                collisionLeft
              })}
              onMouseOver={onHover}
              onMouseOut={persist ? null : offHover}
              onClick={onClick}
              data-positioned>
              {this.props.children}
            </div>
          ) : null
        }}
      </PopoverContext.Consumer>
    )
  }
}

export function TooltipContent({
  attachBottom,
  topOffset = 0,
  leftOffset = 0,
  children
}) {
  const [contentStyle, setContentStyle] = useState({})
  const tooltipTriggerRef = useRef()
  const contentRefCallback = useCallback(
    (node) => {
      if (node && tooltipTriggerRef.current) {
        const { scrollWidth } = node
        const {
          top,
          left,
          height
        } = tooltipTriggerRef.current.getBoundingClientRect()
        setContentStyle({
          top: top + topOffset + height + 10 + 'px',
          left: left + leftOffset,
          width: scrollWidth
        })
      }
    },
    [leftOffset, topOffset]
  )
  return ReactDOM.createPortal(
    <PopoverContext.Consumer>
      {({
        triggerRef,
        on,
        onHover,
        offHover,
        onClick,
        persist,
        collisionLeft
      }) => {
        tooltipTriggerRef.current = triggerRef.current
        return on ? (
          <div
            ref={contentRefCallback}
            className={classNames(popoverContent, 'tooltip', {
              attachBottom,
              collisionLeft
            })}
            style={contentStyle}
            onMouseOver={onHover}
            onMouseOut={persist ? null : offHover}
            onClick={onClick}
            data-positioned>
            {children}
          </div>
        ) : null
      }}
    </PopoverContext.Consumer>,
    document.body
  )
}

export class Popover extends PureComponent {
  constructor(props) {
    super(props)
    this.triggerRef = React.createRef()
    this.containerRef = React.createRef()
    this.state = { on: false }
  }

  toggle = () => (this.state.on ? this.deActivate() : this.activate())

  activate = () => {
    const rect = this.state.rect
      ? this.state.rect
      : this.containerRef.current.getBoundingClientRect()

    const collisionLeft = rect.left < 0
    this.setState({
      on: true,
      collisionLeft,
      rect
    })
  }

  deActivate = () => this.setState({ on: false })

  onHover = () => {
    clearTimeout(this.hoverTimer)
    this.activate()
  }

  offHover = () => {
    this.hoverTimer = setTimeout(() => {
      this.deActivate()
    }, 250)
  }

  onClick = () => {
    if (this.props.closeOnClick) this.deActivate()
  }

  isClickOutside = (e) => {
    const container = this.containerRef.current
    if (container && container.contains(e.target)) return

    this.setState({ on: false })
    if (this.props.onClose) this.props.onClose()
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.isClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.isClickOutside)
  }

  render() {
    return (
      <PopoverContext.Provider
        value={{
          triggerRef: this.triggerRef,
          on: this.state.on,
          toggle: this.toggle,
          onHover: this.onHover,
          offHover: this.offHover,
          onClick: this.onClick,
          deActivate: this.deActivate,
          persist: this.props.persist,
          collisionLeft: this.state.collisionLeft,
          activateOnClick: this.props.activateOnClick,
          attachBottom: this.props.attachBottom
        }}>
        <div className={nullWrapper} ref={this.containerRef}>
          {this.props.children}
        </div>
      </PopoverContext.Provider>
    )
  }
}

Popover.defaultProps = {
  activateOnClick: false,
  persist: false
}
