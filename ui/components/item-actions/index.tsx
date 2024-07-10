import style from './style.module.css'

// Libraries
import { t } from '@common/localization'
import {
  FloatingPortal,
  autoPlacement,
  autoUpdate,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions
} from '@floating-ui/react'
import { IosShareIcon, SaveIcon } from '@ui/icons'
import { OverflowMenuIcon } from '@ui/icons/OverflowMenuIcon'
import { useState } from 'react'

// Components
import { ItemActionsMenu } from '../item-actions-menu'

/**
 * ItemActions
 * ---
 * Actions that can be taken on an item. Should be ubiquitous if we are leaning into
 * a better organization.
 */
export function ItemActions() {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, context, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({
        mainAxis: 0,
        crossAxis: 0
      }),
      autoPlacement({
        allowedPlacements: ['top-end']
      })
    ],
    whileElementsMounted: autoUpdate
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const focus = useFocus(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, focus])

  const handleClick = () => {
    setIsOpen(false)
  }

  return (
    <div className={style.base} data-testid="item-actions">
      <button className="action" type="button">
        <IosShareIcon />
      </button>
      <button className="action" type="button">
        <SaveIcon />
        {t('item-actions:save', 'Save')}
      </button>

      {isOpen ? (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            data-testid="menu-dropdown"
            style={floatingStyles}
            onClick={handleClick}
            {...getFloatingProps()}>
            <ItemActionsMenu />
          </div>
        </FloatingPortal>
      ) : null}
    </div>
  )
}
