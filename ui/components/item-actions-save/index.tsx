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
import {
  AddIcon,
  BookmarkIcon,
  LikeIcon,
  PinIcon,
  ReadingIcon,
  SaveFilledIcon,
  SaveIcon
} from '@ui/icons'
import { ChevronDownIcon } from '@ui/icons/ChevronDownIcon'
import { CrossCircledIcon } from '@ui/icons/CrossCircledIcon'
import { DiscoverIcon } from '@ui/icons/DiscoverIcon'
import { ListAddIcon } from '@ui/icons/ListAddIcon'
import { ListenIcon } from '@ui/icons/ListenIcon'
import { PermanentCopyIcon } from '@ui/icons/PermanentCopyIcon'
import { ReportIcon } from '@ui/icons/ReportIcon'
import { SimilarIcon } from '@ui/icons/SimilarIcon'
import { TagIcon } from '@ui/icons/TagIcon'
import { ThumbsDownIcon } from '@ui/icons/ThumbsDownIcon'
import { ThumbsUpIcon } from '@ui/icons/ThumbsUpIcon'
import { useState } from 'react'

import { useItemStatus } from '@common/state/item-status'
/**
 * ItemActionsMenuOverflow
 * ---
 * The menu to allow secondary actions that a user may wish to take on an item
 */
export function ItemActionsSave({ id }: { id: string }) {
  // Connect shared state actions
  const isSaved = useItemStatus((state) => state.isSaved(id))
  const removeSave = useItemStatus((state) => state.removeSave)

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

  const handleOverflowClick = () => setIsOpen(false)
  const handleSavedClick = () => removeSave(id)

  return (
    <>
      {isSaved ? (
        <button
          className="saved tiny"
          data-testid="item-actions-saved"
          type="button"
          onClick={handleSavedClick}>
          <SaveFilledIcon /> <span>{t('item-action:saved', 'Saved')}</span>
        </button>
      ) : (
        <button
          className={`save tiny ${isOpen ? 'saving' : ''}`}
          data-testid="item-actions-save"
          type="button"
          {...getReferenceProps()}
          ref={refs.setReference}>
          <SaveIcon /> <span>{t('item-action:save', 'Save')}</span>
        </button>
      )}
      {isOpen ? (
        <FloatingPortal>
          <FloatingFocusManager context={context} visuallyHiddenDismiss={true}>
            <div
              ref={refs.setFloating}
              data-testid="menu-dropdown"
              style={floatingStyles}
              {...getFloatingProps()}>
              <SaveMenu handleOverflowClick={handleOverflowClick} id={id} />
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
function SaveMenu({ id, handleOverflowClick }: { id: string; handleOverflowClick: () => void }) {
  const addSave = useItemStatus((state) => state.addSave)
  const handleAddSaveClick = () => {
    addSave(id)
    handleOverflowClick()
  }

  const lastSavedCollections = ['camping', 'nature', 'outdoors']
  return (
    <div className={style.base} data-testid="item-actions-save-menu">
      <div className={style.header}>{t('item-action:save-to', 'Save to:')}</div>
      <hr />
      <button className="menu" type="button" onClick={handleAddSaveClick}>
        <ReadingIcon /> <span>{t('item-action:reading-list', 'reading list')}</span>
      </button>
      <hr />
      <button className="menu" type="button">
        <AddIcon /> {t('item-action:new-collection', 'new collection')}
      </button>
      <hr />
      {lastSavedCollections.map((collection) => (
        <SaveCollection
          key={collection}
          collection={collection}
          handleOverflowClick={handleOverflowClick}
          id={id}
        />
      ))}
      <div className={style.typeahead}>
        <input type="text" />
      </div>
    </div>
  )
}

/**
 *
 */
function SaveCollection({
  collection,
  id,
  handleOverflowClick
}: {
  collection: string
  id: string
  handleOverflowClick: () => void
}) {
  const addSave = useItemStatus((state) => state.addSave)
  const handleAddSaveClick = () => {
    addSave(id)
    handleOverflowClick()
  }

  return (
    <button className="menu" type="button" onClick={handleAddSaveClick}>
      {collection}
    </button>
  )
}
