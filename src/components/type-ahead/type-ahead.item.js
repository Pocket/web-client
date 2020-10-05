import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from 'linaria'
import classNames from 'classnames'

const itemWrapper = css`
  font-family: "Graphik Web";
  position: relative;
  cursor: pointer;
  display: block;
  border: none;
  height: auto;
  text-align: left;
  border-top: none;
  line-height: 1em;
  color: var(--color-textSecondary);
  font-size: 1rem;
  text-transform: none;
  font-weight: 400;
  box-shadow: none;
  box-sizing: border-box;
  padding: 0.3rem 1.1rem;
  white-space: normal;
  word-wrap: normal;
  &:hover, &.isActive {
    background: var(--color-actionPrimarySubdued);
  }
`

export class TypeAheadItem extends Component {
  constructor(props) {
    super(props)
    this.element = React.createRef()
  }

  clickAction = () => {
    this.props.action(this.props.index)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isActive) return
    if (this.props.isActive)
      this.element.current.scrollIntoView({ block: 'center' })
  }

  render() {
    const { isActive, item } = this.props
    return (
      <div className={classNames(itemWrapper, { isActive })} onClick={this.clickAction}>
        <span ref={this.element}>{item}</span>
      </div>
    )
  }
}
