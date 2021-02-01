import { css, cx } from 'linaria'
import { WithTooltip } from '@pocket/web-ui'

const itemActionStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  border-radius: 0 0 4px 4px;
  padding-bottom: var(--size025);
  position: relative;
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
      <button aria-label={label} className={itemStyle} onClick={onClick}>
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
