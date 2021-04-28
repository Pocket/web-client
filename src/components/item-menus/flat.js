import { cx } from 'linaria'
import { WithTooltip } from '@pocket/web-ui'
import { itemActionStyle } from './base'
import { menuItemStyle } from './base'
import { OverflowAction } from './overflow'

export const MenuItem = ({
  label,
  icon,
  onClick,
  active,
  actionText,
  className
}) => {
  const itemStyle = cx(menuItemStyle, active && 'active')
  return (
    <span className={className}>
      <WithTooltip label={label} placement="top" delay={true}>
        <button className={itemStyle} onClick={onClick}>
          {icon ? icon : null}
          {actionText ? <span className="actionText">{actionText}</span> : null}
        </button>
      </WithTooltip>
    </span>
  )
}

/**
 * Card Action Menus
 */
export function ItemActions({ menuItems, overflowItems }) {
  return (
    <>
      {/* Menu items sit to the left of the card footer */}
      {menuItems ? (
        <div className={`${itemActionStyle} item-actions`}>
          {menuItems.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </div>
      ) : null}

      {/* Overflow items sit to the right.  Any items added to this array will sit behind the overflow menu */}
      {overflowItems ? (
        <div className={`${itemActionStyle} item-actions`}>
          <OverflowAction menuItems={overflowItems} />
        </div>
      ) : null}
    </>
  )
}
