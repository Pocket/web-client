import { css, cx } from 'linaria'
import { WithTooltip } from '@pocket/web-ui'

const itemActionStyle = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  background-color: var(--color-canvas);
  border-radius: 0 0 4px 4px;
  padding-bottom: var(--size025);
  position: relative;
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: 0;
    width: 100%;
    height: 10px;
    display: block;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
`

const menuItemStyle = css`
  color: var(--color-textTertiary);
  height: 24px;
  background-color: transparent;
  border: medium none;
  padding: var(--size025) var(--size050);
  box-sizing: content-box;
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

const MenuItem = ({ label, icon, onClick, active }) => {
  const itemStyle = cx(menuItemStyle, active && 'active')
  return (
    <WithTooltip label={label} placement="top" delay={true}>
      <button className={itemStyle} onClick={onClick}>
        {icon ? icon : null}
      </button>
    </WithTooltip>
  )
}

export function ItemActions({ menuItems }) {
  return (
    <div className={`${itemActionStyle} item-actions`}>
      {menuItems.map((props) => (
        <MenuItem key="key" {...props} />
      ))}
    </div>
  )
}
