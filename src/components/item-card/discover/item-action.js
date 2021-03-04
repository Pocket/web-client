import { css } from 'linaria'
import { usePopover, popoverBase } from 'components/popover/popover'
import { OverflowMenuIcon } from '@pocket/web-ui'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export const shareContainer = css`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--fontSize150);
  min-width: 3.913em;
  color: var(--color-textSecondary);
  cursor: pointer;
  padding-top: 8px;

  svg {
    transition: transform 200ms ease-out;
    display: block;
    margin-right: var(--size050);
    height: 1.1em;
  }

  .actionCopy {
    font-size: var(--fontSize100);
    height: var(--size150);
    line-height: var(--size150);
  }

  a {
    text-decoration: none;
  }

  &:hover {
    svg {
      color: var(--color-actionPrimary);
    }
  }

  &:active {
    svg {
      transform: scale(0.95);
      color: var(--color-actionPrimary);
    }
  }
`

export const popoverContainer = css`
  ${popoverBase};
  font-size: var(--fontSize100);
  line-height: 40px;
  .popoverLink {
    width: 100%;
    color: var(--color-textSecondary);
    text-decoration: none;

    button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      width: 100%;
      height: 40px;
      padding: 0 16px !important;
      cursor: pointer;
      justify-content: flex-start;
      &:focus {
        background-color: var(--color-actionPrimarySubdued);
        color: var(--color-actionPrimaryHover);
        outline: none;
      }
    }

    svg {
      fill: currentColor;
      height: 24px;
      margin: -2px 10px 0 0;
    }

    &:hover {
      background-color: var(--color-actionPrimarySubdued);
      color: var(--color-actionPrimaryHover);
    }
  }
`

const menuItemStyle = css`
  &,
  &:hover {
    background-color: transparent;
    border: medium none;
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
`

const MenuItem = ({ item: { label, icon, onClick } }) => {
  return (
    <div className="popoverLink menuItemStyle" onClick={onClick}>
      <button className={menuItemStyle}>
        <span>{icon ? icon : null}</span>
        {label}
      </button>
    </div>
  )
}

const MenuPopover = function ({ popoverRef, menuItems }) {
  return (
    <div className={popoverContainer} ref={popoverRef}>
      {menuItems.map((item) => (
        <MenuItem item={item} key={item.label} />
      ))}
    </div>
  )
}

const itemActions = css`
  min-width: unset;
  justify-content: end;
  margin-left: auto;
`

export const ItemAction = function ({
  toggleButton,
  toggleLabel,
  menuItems,
  placement,
  alignRight
}) {
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

  const shareClasses = classNames(shareContainer, 'card-actions', {
    [itemActions]: alignRight
  })

  return (
    <>
      <div
        aria-label="Open menu"
        className={shareClasses}
        onClick={handleClick}
        ref={popTrigger}>
        {toggleButton}
        {toggleLabel ? <div className="actionCopy">{toggleLabel}</div> : null}
      </div>
      {shown ? (
        <MenuPopover popoverRef={popBody} menuItems={menuItems} />
      ) : null}
    </>
  )
}

ItemAction.propTypes = {
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

ItemAction.defaultProps = {
  toggleButton: <OverflowMenuIcon />,
  toggleLabel: '',
  placement: 'top-start',
  alignRight: false
}
