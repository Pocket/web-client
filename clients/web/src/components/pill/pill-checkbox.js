import React from 'react'
import { css, cx } from '@emotion/css'
import { EmptyCircledIcon, CheckFilledIcon } from '../icons/icons'
import { darkMode } from '../../constants/constants'
const pillStyle = css`
  display: inline-flex;
  justify-content: flex-start;
  padding: 6px;
  padding-right: var(--spacing100);
  background: none;
  color: var(--color-textPrimary);
  font-size: var(--fontSize085);
  font-family: var(--fontSansSerif);
  font-weight: 400;
  line-height: 18px;
  text-decoration: none;
  border: 1px solid var(--color-formFieldBorder);
  border-radius: 18px;
  transition: all 0.15s ease-out;
  transition-property: border, color, background;
  cursor: pointer;

  .checkIcon {
    display: inline-block;
    margin-right: 8px;
    .icon {
      height: 18px;
    }
    svg path {
      fill: var(--color-dividerTertiary);
    }
    input[type='checkbox'] {
      border: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }
  }

  &:focus-within,
  &:hover {
    border-color: var(--color-actionFocus);
    color: var(--color-actionPrimary);
  }
  &.active {
    svg path {
      fill: var(--color-actionFocus);
    }
    color: var(--color-actionPrimary);
    border-color: var(--color-actionPrimary);
    background: var(--color-actionPrimarySubdued);

    ${darkMode} {
      svg path {
        fill: var(--color-actionPrimary);
      }
      color: var(--color-actionPrimaryHover);
      border-color: var(--color-actionPrimaryHover);
      background: var(--color-teal100);
    }
  }
`
/**
 * A pill component for rendering things like selectable lists of topics or categories.
 * Pass in an `onClick` callback to handle selection
 */

export const PillCheckbox = ({ name, isChecked, onClick, ...remaining }) => {
  const Indicator = isChecked ? CheckFilledIcon : EmptyCircledIcon

  const onChange = () => onClick(name)

  return (
    <label className={cx(pillStyle, isChecked && 'active')} {...remaining}>
      <span className="checkIcon">
        <Indicator />
        <input
          tabIndex="0"
          type="checkbox"
          className="inputCheck"
          checked={isChecked}
          onChange={onChange}
        />
      </span>
      {name}
    </label>
  )
}
export default PillCheckbox
