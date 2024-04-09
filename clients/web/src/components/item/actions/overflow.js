import { css } from '@emotion/css'
import { usePopover } from 'components/popover/popover'
import { OverflowMenuIcon } from '@ui/icons/OverflowMenuIcon'

const popoverContainer = css`
  background-color: var(--color-canvas);
  border-radius: 1rem;
  box-shadow: 0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.1);
  z-index: var(--zIndexTooltip);
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
`
const popoverTrigger = css`
  color: var(--color-textSecondary);
  font-size: 1.125rem;
`
const popoverMenuItem = css`
  color: var(--color-textTertiary);
  height: 2.5rem;
  background-color: transparent;
  border: medium none;
  padding: 0 1.25rem;
  box-sizing: content-box;
  white-space: nowrap;
  border-radius: var(--borderRadius);
  transition: all 0.15s ease-out;
  cursor: pointer;

  display: flex;
  align-items: center;
  align-content: center;
  color: var(--color-textSecondary);
  text-decoration: none;

  .icon {
    margin: 0 0.5rem 0 0;
    &.active {
      color: var(--color-amber);
    }
  }

  &:hover {
    background-color: var(--color-actionPrimarySubdued);
  }

  &:active,
  &:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
    background-color: var(--color-actionPrimarySubdued);
    outline: none;
  }
`

const MenuPopover = function ({ popoverRef, menuItems }) {
  return (
    <div className={popoverContainer} ref={popoverRef}>
      {menuItems.map(({ label, icon, onClick, url, hide }) => {
        if (hide) return null
        return url ? (
          <a
            href={url}
            key={label}
            data-testid={label}
            className={popoverMenuItem}
            onClick={onClick}
            target="_blank">
            {icon ? icon : null}
            {label}
          </a>
        ) : (
          <div key={label} data-testid={label} className={popoverMenuItem} onClick={onClick}>
            {icon ? icon : null}
            {label}
          </div>
        )
      })}
    </div>
  )
}

export const OverflowMenu = function ({ toggleLabel, menuItems }) {
  const handleClick = (event) => {
    event.preventDefault()
  }

  // Popover Effect
  const { popTrigger, popBody, shown } = usePopover({ placement: 'top-end', hover: true })

  return (
    <>
      <button
        data-testid="overflow"
        className={`${popoverTrigger} action`}
        onClick={handleClick}
        ref={popTrigger}
        aria-label="overflow-menu">
        <OverflowMenuIcon />
        {toggleLabel ? <div className="actionCopy">{toggleLabel}</div> : null}
      </button>
      {shown ? <MenuPopover popoverRef={popBody} menuItems={menuItems} /> : null}
    </>
  )
}
