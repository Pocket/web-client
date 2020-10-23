import React, { Component } from 'react'
import { css } from 'linaria'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { buttonReset } from 'components/buttons/button-reset'

export const cardStyles = css`
  font-family: 'Graphik Web';
  position: relative;
  margin: 10px 20px;
  padding: 20px;
  border-top: 4px solid var(--color-amber);
  border-radius: 4px;
  background-color: var(--color-popoverCanvas);
  &.arrow:before {
    content: '';
    position: absolute;
    left: -8px;
    width: 0;
    height: 0;
    border-bottom: 8px solid transparent;
    border-right: 8px solid var(--color-popoverCanvas);
    border-top: 8px solid transparent;
    filter: drop-shadow(-6px 0 4px rgba(0, 0, 0, 0.12));
  }
`

const quoteStyles = css`
  line-height: 25px;
  font-size: 18px;
  margin: 0;
  cursor: pointer;
  &:hover {
    background: transparent;
  }
`
export const Quote = ({ children, ...args }) => (
  <button className={classNames(buttonReset, quoteStyles)} {...args}>
    {children}
  </button>
)

const styledDate = css`
  font-family: 'Graphik Web';
  line-height: 16px;
  font-size: 12px;
  color: var(--color-grey55);
  margin: 24px 0 0;
`

export class CreatedDate extends Component {
  getValue(val) {
    if (!val) {
      return 'Just now' //"time.now"
    }

    const now = dayjs()
    const ts = dayjs(val)
    const diff = now.diff(ts, 'day')

    if (diff < 1) {
      return 'Added Today' //"time.addedtoday"
    } else if (diff === 1) {
      let date = diff
      return `Added ${date} day ago` //"time.addeddayago"
    } else if (diff < 7) {
      let date = diff
      return `Added ${date} days ago` //"time.addeddaysago"
    }

    let date = ts.format('MMM D, YYYY')
    return `Added ${date}` //"time.added"
  }

  render() {
    const { children } = this.props
    return <p className={styledDate}>{this.getValue(children)}</p>
  }
}

export class CardPositioning extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topAdj: null
    }
  }

  componentDidMount() {
    if (this.props.show) {
      this.setTopAdjustment()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.show !== this.props.show &&
      this.props.show &&
      !this.state.topAdj
    ) {
      this.setTopAdjustment()
    }
  }

  setTopAdjustment() {
    if (this.contentNode) {
      let docHeight =
        window.innerHeight || document.documentElement.clientHeight
      let { top, bottom } = this.contentNode.getBoundingClientRect()

      const topAdj =
        top < 63
          ? Math.abs(63 - top)
          : bottom > docHeight
          ? -Math.abs(bottom - docHeight)
          : 0

      this.setState({ topAdj })
    }
  }

  render() {
    const { addedStyles, arrow } = this.props

    return (
      <div
        className={classNames(cardStyles, addedStyles, { arrow })}
        style={{ top: this.state.topAdj }}
        ref={(node) => (this.contentNode = node)}>
        {this.props.children}
      </div>
    )
  }
}
