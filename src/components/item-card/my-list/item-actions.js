import { css } from 'linaria'
import { WithTooltip } from '@pocket/web-ui'

const itemActionStyle = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  width: 100%;
`

const menuItemStyle = css`
  color: var(--color-textSecondary);
  height: 24px;
  background-color: transparent;
  border: medium none;
  padding: 0 var(--size050);
  cursor: pointer;

  .icon {
    height: 24px;
    margin: 0;
  }

  svg {
    fill: currentColor;
    margin: 0;
  }

  &:hover {
    color: var(--color-textLinkHover);
    background-color: transparent;
    border: medium none;
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
