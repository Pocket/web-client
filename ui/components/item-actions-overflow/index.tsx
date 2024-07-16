'use client'

import style from './style.module.css'

// Libraries
import { t } from '@common/localization'
import {
  FloatingFocusManager,
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
import { CrossCircledIcon } from '@ui/icons/CrossCircledIcon'
import { DiscoverIcon } from '@ui/icons/DiscoverIcon'
import { IosShareIcon } from '@ui/icons/IosShareIcon'
import { ListAddIcon } from '@ui/icons/ListAddIcon'
import { ListenIcon } from '@ui/icons/ListenIcon'
import { OverflowMenuIcon } from '@ui/icons/OverflowMenuIcon'
import { ReportIcon } from '@ui/icons/ReportIcon'
import { SimilarIcon } from '@ui/icons/SimilarIcon'
import { useState } from 'react'

import { useItemStatus } from '@common/state/item-status'
/**
 * ItemActionsMenuOverflow
 * ---
 * The menu to allow secondary actions that a user may wish to take on an item
 */
export function ItemActionsOverflow({ id }: { id: string }) {
  // Connect shared state actions
  const isSaved = useItemStatus((state) => state.isSaved(id))

  // Local state
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
    <>
      <button
        className="action tiny"
        {...getReferenceProps()}
        ref={refs.setReference}
        type="button">
        <OverflowMenuIcon />
      </button>

      {isOpen ? (
        <FloatingPortal>
          <FloatingFocusManager context={context} visuallyHiddenDismiss={true}>
            <div
              ref={refs.setFloating}
              data-testid="menu-dropdown"
              style={floatingStyles}
              onClick={handleClick}
              {...getFloatingProps()}>
              <OverflowMenu id={id} isSaved={isSaved} />
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      ) : null}
    </>
  )
}

/**
 *
 */
function OverflowMenu({ id, isSaved }: { id: string; isSaved: boolean }) {
  const removeSave = useItemStatus((state) => state.removeSave)
  const handleUnSaveClick = () => removeSave(id)

  return (
    <div className={style.base} data-testid="item-actions-menu">
      {isSaved ? (
        <button className="menu" type="button" onClick={handleUnSaveClick}>
          <CrossCircledIcon /> <span>{t('item-action:un-save', 'Un-Save Item')}</span>
        </button>
      ) : (
        <button className="menu" type="button">
          <ReportIcon /> <span>{t('item-action:report', 'Report this Item')}</span>
        </button>
      )}

      <hr />
      <button className="menu" type="button">
        <DiscoverIcon /> <span>{t('item-action:summary', 'Get Summary')}</span>
      </button>
      <button className="menu" type="button">
        <ListenIcon /> <span>{t('item-action:listen', 'Listen')}</span>
      </button>
      <button className="menu" type="button">
        <SimilarIcon /> <span>{t('item-action:show-similar', 'Show Similar')}</span>
      </button>

      <hr />
      <button className="menu" type="button">
        <ListAddIcon /> <span>{t('item-action:add-to-collection', 'Add to Collection')}</span>
      </button>

      <hr />
      <button className="menu" type="button">
        <IosShareIcon /> <span>{t('item-action:share', 'Share')}</span>
      </button>
    </div>
  )
}
