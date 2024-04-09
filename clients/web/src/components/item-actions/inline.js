import { cx } from '@emotion/css'
import { itemActionStyle } from 'components/item-actions/base'
import { menuItemStyle } from 'components/item-actions/base'
import { OverflowAction } from 'components/item-actions/overflow'
import { topTooltipDelayed } from 'components/tooltip/tooltip'

export const MenuItem = ({
  label,
  icon,
  onClick,
  href,
  active,
  actionText,
  className,
  isPremium,
  onlyPremium
}) => {
  const itemStyle = cx(menuItemStyle, topTooltipDelayed, active && 'active')
  if (onlyPremium && !isPremium) return null
  return (
    <span className={className}>
      {href ? (
        // eslint-disable-next-line
        <a
          className={itemStyle}
          data-testid={label}
          onClick={onClick}
          href={href}
          aria-label={label}
          tabIndex={0}
          data-tooltip={label}>
          {icon ? icon : null}
          {actionText ? <span className="actionText">{actionText}</span> : null}
        </a>
      ) : (
        <button
          data-testid={label}
          className={itemStyle}
          onClick={onClick}
          aria-label={label}
          data-tooltip={label}>
          {icon ? icon : null}
          {actionText ? <span className="actionText">{actionText}</span> : null}
        </button>
      )}
    </span>
  )
}

/**
 * Card Action Menus
 */
export function ItemActions({ menuItems, overflowItems }) {
  return (
    <div className={`${itemActionStyle} actions`}>
      {/* Menu items sit to the left of the card footer */}
      {menuItems ? (
        <div className="item-actions">
          {menuItems.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </div>
      ) : null}

      {/* Overflow items sit to the right.  Any items added to this array will sit behind the overflow menu */}
      {overflowItems ? (
        <div className="item-actions">
          <OverflowAction menuItems={overflowItems} />
        </div>
      ) : null}
    </div>
  )
}
