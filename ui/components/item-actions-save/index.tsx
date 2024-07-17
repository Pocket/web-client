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
// Icons
import { AddIcon } from '@ui/icons/AddIcon'
import { ReadingIcon } from '@ui/icons/ReadingIcon'
import { SaveFilledIcon } from '@ui/icons/SaveFilledIcon'
import { SaveIcon } from '@ui/icons/SaveIcon'
import { matchSorter } from 'match-sorter'
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
  const [categoryList, setCategoryList] = useState<string[]>(categories)
  const addSave = useItemStatus((state) => state.addSave)
  const handleAddSaveClick = () => {
    addSave(id)
    handleOverflowClick()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sortedList = matchSorter(categories, e.target.value, {
      threshold: matchSorter.rankings.CONTAINS
    })
    setCategoryList(sortedList)
  }

  return (
    <div className={style.base} data-testid="item-actions-save-menu">
      <div className={style.header}>{t('item-action:save-to', 'Save to:')}</div>
      <hr />
      <button className="menu" type="button" onClick={handleAddSaveClick}>
        <ReadingIcon /> <span>{t('item-action:reading-list', 'default reading list')}</span>
      </button>
      <hr />

      <div className={style.categories}>
        {categoryList.length ? (
          categoryList.map((collection) => (
            <SaveCollection
              key={collection}
              collection={collection}
              handleOverflowClick={handleOverflowClick}
              id={id}
            />
          ))
        ) : (
          <button className="menu" type="button">
            <AddIcon /> {t('item-action:new-collection', 'new collection')}
          </button>
        )}
      </div>
      <div className={style.typeahead}>
        <input type="text" onChange={handleInputChange} />
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

const categories = [
  'Adventure',
  'Animation',
  'Architecture',
  'Art',
  'Artificial Intelligence',
  'Astronomy',
  'Augmented Reality',
  'Automotive',
  'Baking',
  'Beauty',
  'Biology',
  'Blockchain',
  'Books',
  'Business',
  'Career',
  'Chemistry',
  'Coding',
  'Comics',
  'Cooking',
  'Crafts',
  'Cryptocurrency',
  'Culture',
  'Customer Service',
  'Data Science',
  'Digital Art',
  'DIY',
  'E-commerce',
  'Economy',
  'Education',
  'Engineering',
  'Entertainment',
  'Environment',
  'Event Planning',
  'Fashion',
  'Finance',
  'Fitness',
  'Food',
  'Gaming',
  'Gardening',
  'Geography',
  'Graphic Design',
  'Health',
  'History',
  'Home Improvement',
  'Human Resources',
  'Interior Design',
  'Investing',
  'Language Learning',
  'Law',
  'Leadership',
  'Lifestyle',
  'Machine Learning',
  'Marketing',
  'Mathematics',
  'Mental Health',
  'Mindfulness',
  'Movies',
  'Music',
  'Nature',
  'Nutrition',
  'Parenting',
  'Personal Finance',
  'Pets',
  'Philosophy',
  'Photo Editing',
  'Photography',
  'Physics',
  'Podcasting',
  'Poetry',
  'Politics',
  'Productivity',
  'Project Management',
  'Public Speaking',
  'Real Estate',
  'Recipes',
  'Relationships',
  'Religion',
  'Robotics',
  'Science Fiction',
  'Science',
  'Sculpture',
  'Self-Improvement',
  'Social Media',
  'Spirituality',
  'Sports',
  'Startups',
  'Statistics',
  'Street Photography',
  'Sustainability',
  'Technology',
  'Traditional Art',
  'Travel Photography',
  'Travel Tips',
  'Travel',
  'Video Production',
  'Virtual Reality',
  'Web Development',
  'Wedding Photography',
  'Wildlife Photography',
  'Writing'
]
