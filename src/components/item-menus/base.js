import { css } from 'linaria'

export const itemActionStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  background-color: var(--color-canvas);
  border-radius: 0 0 4px 4px;
  position: relative;
  transform: translateX(-0.5rem);
`

export const menuItemStyle = css`
  color: var(--color-textTertiary);
  height: 24px;
  background-color: transparent;
  border: medium none;
  padding: var(--size025) var(--size050);
  box-sizing: content-box;
  white-space: nowrap;

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
