import React, { Component } from 'react'
import { css } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import { CrossIcon } from '@pocket/web-ui'
import classNames from 'classnames'

const toastWrapper = css`
  text-align: left;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  transform: translateZ(0.01);
`

const toastBlock = css`
  display: inline-grid;
  grid-template-columns: auto 16px;
  gap: 16px;
  align-content: center;
  align-items: center;
  font-weight: 500;
  line-height: 22px;
  font-size: 16px;
  font-family: 'Graphik Web';
  text-align: left;
  padding: 20px;
  border-radius: 4px;
  margin: 20px 0 0 0;
  min-width: 275px;
  border-radius: 4px;
  transition: all 400ms ease;
  opacity: 0;
  z-index: var(--zIndexModal);
  background-color: var(--color-navCurrentTab);
  color: var(--color-navCurrentTabText);

  &.success {
    background-color: var(--color-navCurrentTab);
    color: var(--color-navCurrentTabText);
  }
  &.neutral {
    background-color: var(--color-navCurrentTab);
    color: var(--color-navCurrentTabText);
  }
  &.warn {
    background-color: var(--color-error);
    color: var(--color-actionBrandText);
  }
`

const AnimateIn = {
  opacity: 1
}

const AnimateOut = {
  opacity: 0,
  transform: 'translateY(50%)'
}

const closeWrapper = css`
  cursor: pointer;
  justify-self: end;
  &:hover {
    background: transparent;
  }
`

export class Toast extends Component {
  constructor(props) {
    super(props)
    this.state = { mounted: true, toastStyle: null }
  }

  unMountStyle = () => {
    this.setState({ toastStyle: AnimateOut, mounted: false })
  }

  mountStyle = () => {
    this.setState({ toastStyle: AnimateIn })
  }

  transitionEnd = () => {
    if (!this.state.mounted) this.remove()
  }

  remove = () => {
    this.props.removeToast(this.props.toastKey)
  }

  componentDidMount() {
    const { delay = 5000 } = this.props
    this.mountTimeout = setTimeout(this.mountStyle, 20)
    this.unMountTimeout = setTimeout(this.unMountStyle, delay)
  }

  componentWillUnmount() {
    if (this.mountTimeout) clearTimeout(this.mountTimeout)
    if (this.unMountTimeout) clearTimeout(this.unMountTimeout)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.remove !== this.props.remove && nextProps.remove) {
      this.remove()
    }
  }

  render() {
    const { type, children } = this.props
    return (
      <div className={toastWrapper}>
        <div
          className={classNames(toastBlock, `${type}`)}
          style={this.state.toastStyle}
          onTransitionEnd={this.transitionEnd}>
          <div>{children}</div>
          <button
            className={classNames(buttonReset, closeWrapper)}
            onClick={this.unMountStyle}>
            <CrossIcon />
          </button>
        </div>
      </div>
    )
  }
}
