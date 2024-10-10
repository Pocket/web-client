'use client'

import style from './style.module.css'

// Libraries
import { useTranslation } from '@common/localization'

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
  const { t } = useTranslation()

  // Connect shared state actions
  const isSaved = useItemStatus((state) => state.isSaved(id))
  const removeSave = useItemStatus((state) => state.removeSave)
  const addSave = useItemStatus((state) => state.addSave)

  const handleOverflowClick = () => setIsOpen(false)
  const handleRemoveSaveClick = () => removeSave(id)
  const handleSaveClick = () => addSave(id)

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

  return (
    <>
      <div ref={refs.setReference}>
        {isSaved ? (
          <button
            className={`saved tiny ${isOpen ? 'active' : ''}`}
            data-testid="trigger-saved"
            type="button"
            onClick={handleRemoveSaveClick}>
            <SaveFilledIcon /> <span>{t('item-action:saved', 'Saved')}</span>
          </button>
        ) : (
          <button
            className={`save tiny ${isOpen ? 'active' : ''}`}
            data-testid="trigger-save"
            type="button"
            {...getReferenceProps({ onClick: handleSaveClick })}>
            <SaveIcon />{' '}
            <span>
              {isOpen ? t('item-action:saving', 'Saving') : t('item-action:save', 'Save')}
            </span>
          </button>
        )}
      </div>
      {isOpen ? (
        <FloatingPortal>
          <FloatingFocusManager context={context} visuallyHiddenDismiss={true}>
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
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
  const { t } = useTranslation()

  const [categoryList, setCategoryList] = useState<string[]>(categories)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sortedList = matchSorter(categories, e.target.value, {
      threshold: matchSorter.rankings.CONTAINS
    })
    setCategoryList(sortedList)
  }

  return (
    <div className={style.base} data-testid="save-menu">
      <div className={style.header}>
        {t('item-action:save-to-collection', 'Save to collection:')}
      </div>
      {recent.length ? (
        <>
          <hr />
          {recent.map((recent) => (
            <SaveCollection
              key={recent}
              collection={recent}
              handleOverflowClick={handleOverflowClick}
              id={id}
            />
          ))}
        </>
      ) : null}

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
      <hr />
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
    <button
      className="menu"
      data-testid="save-menu-action-category"
      type="button"
      onClick={handleAddSaveClick}>
      {collection}
    </button>
  )
}

const recent = ['redwood', 'nature']

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
