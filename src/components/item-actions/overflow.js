import { css } from 'linaria'
import { usePopover, popoverBase } from 'components/popover/popover'
import { OverflowMenuIcon } from '@pocket/web-ui'
import PropTypes from 'prop-types'
import { menuItemStyle } from './base'

export const popoverContainer = css`
  ${popoverBase};
  font-size: var(--fontSize100);
`

const popoverMenuItem = css`
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  align-items: center;
  align-content: center;
  height: 40px;
  padding: 0 1rem;
  color: var(--color-textSecondary);
  text-decoration: none;

  svg {
    fill: currentColor;
  }
  span {
    margin-bottom: -5px;
    width: 24px;
    height: 24px;
    margin-right: 0.5em;
  }
  &:focus {
    background-color: var(--color-actionPrimarySubdued);
    color: var(--color-actionPrimaryHover);
    outline: none;
  }
  &:hover {
    background-color: var(--color-actionPrimarySubdued);
    color: var(--color-actionPrimaryHover);
  }
`

const PopoverMenuItem = ({ item: { label, icon, onClick } }) => {
  return (
    <div className={popoverMenuItem} onClick={onClick}>
      {icon ? icon : null}
      {label}
    </div>
  )
}

const MenuPopover = function ({ popoverRef, menuItems }) {
  return (
    <div className={popoverContainer} ref={popoverRef}>
      {menuItems.map((item) => (
        <PopoverMenuItem item={item} key={item.label} />
      ))}
    </div>
  )
}

export const OverflowAction = function ({ toggleLabel, menuItems, placement }) {
  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  // Popover Effect
  const { popTrigger, popBody, shown } = usePopover({
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 0]
        }
      }
    ]
  })

  return (
    <>
      <button className={menuItemStyle} onClick={handleClick} ref={popTrigger}>
        <OverflowMenuIcon />
        {toggleLabel ? <div className="actionCopy">{toggleLabel}</div> : null}
      </button>
      {shown ? (
        <MenuPopover popoverRef={popBody} menuItems={menuItems} />
      ) : null}
    </>
  )
}

OverflowAction.propTypes = {
  toggleButton: PropTypes.object,
  toggleLabel: PropTypes.string,
  // https://popper.js.org/docs/v2/constructors/#placement
  placement: PropTypes.oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end'
  ]),
  alignRight: PropTypes.bool
}

OverflowAction.defaultProps = {
  toggleLabel: '',
  placement: 'top-end',
  alignRight: false
}
