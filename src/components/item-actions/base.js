import { css } from '@emotion/css'

export const itemActionStyle = css`
  display: flex;
  padding: var(--size100) 0 var(--size025);
  justify-content: space-between;
  .item-actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    position: relative;
    transform: translateX(-0.25rem);
  }
`

export const menuItemStyle = css`
  color: var(--color-textTertiary);
  height: 24px;
  background-color: transparent;
  border: medium none;
  padding: var(--size025);
  margin-right: var(--size025);
  box-sizing: content-box;
  white-space: nowrap;
  display: flex;
  border-radius: var(--borderRadius);
  transition: all 0.15s ease-out;

  &.active {
    color: var(--color-amber);
    &:hover,
    &:active,
    &:focus {
      color: var(--color-amber);
    }
  }

  .icon {
    height: 24px;
    margin: 0;
  }

  .actionText {
    display: inline-block;
    margin-left: var(--size050);
  }

  svg {
    fill: currentColor;
    margin: 0;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: var(--color-canvas);
    color: var(--color-textLinkHover);
    cursor: pointer;
  }

  &:active,
  &:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
  }
`
