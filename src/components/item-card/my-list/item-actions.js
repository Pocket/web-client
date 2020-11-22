import { css } from 'linaria'
import { WithTooltip } from '@pocket/web-ui'

const itemActionStyle = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 5px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`

const menuItemStyle = css`
  color: var(--color-textSecondary);
  height: 24px;
  background-color: var(--color-canvas);
  border: medium none;
  padding: 0 var(--size075);

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
    border: medium none;
    cursor: pointer;
  }
`

const MenuItem = ({ label, icon, onClick }) => {
  return (
    <WithTooltip label={label}>
      <button className={menuItemStyle} onClick={onClick}>
        {icon ? icon : null}
      </button>
    </WithTooltip>
  )
}

export function ItemActions({ menuItems, showActions }) {
  return showActions ? (
    <div className={itemActionStyle}>
      {menuItems.map((props) => (
        <MenuItem key="key" {...props} />
      ))}
    </div>
  ) : (
    <div></div>
  )
}
