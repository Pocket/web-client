import { css, cx } from 'linaria'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SortByNewestIcon } from '@pocket/web-ui'
import { SortByOldestIcon } from '@pocket/web-ui'
import { RelevanceIcon } from '@pocket/web-ui'
import { useCorrectEffect } from 'common/utilities/hooks/use-correct-effect'
import { buttonReset } from 'components/buttons/button-reset'
import { useTranslation } from 'next-i18next'
import { PopupMenu, PopupMenuItem } from '@pocket/web-ui'
import { sortOrderSetNew, sortOrderSetOld, sortOrderSetRelevance } from 'connectors/app/app.state'
import { KEYS } from 'common/constants'

const sortStyles = css`
  display: inline-block;
  margin-left: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--borderRadius);
  border: 2px solid var(--color-canvas);

  &:hover {
    color: var(--color-textLinkHover);
  }

  .icon {
    height: 1.5rem;
    width: 1.5rem;
  }
`

export const ListSort = ({ sortOrder, showRelevance }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const appRootSelector = '#__next'

  const sortOptionsRef = useRef(null)
  const menuRef = useRef(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const [focus, setFocus] = useState(false)

  useCorrectEffect(() => {
    if (!focus || !menuOpen) return

    console.log('i made it here')
    menuRef.current.querySelector('li button').focus()
    menuRef.current.addEventListener('focusout', checkInnerFocus)

    return () => {
      menuRef.current.removeEventListener('focusout', checkInnerFocus)
    }
  }, [focus, menuOpen])

  const checkInnerFocus = () => {
    if (menuRef.current.querySelectorAll(':focus-within').length === 0) {
      handleClose()
      sortOptionsRef.current.click()
    }
  }

  const updateFocus = (e) => {
    if (e.charCode === KEYS.SPACE || e.charCode === KEYS.ENTER) setFocus(true)
  }

  const handleOpen = () => setMenuOpen(true)

  const handleClose = () => {
    setMenuOpen(false)
    setFocus(false)
  }
  
  const handleNewest = () => dispatch(sortOrderSetNew())
  const handleOldest = () => dispatch(sortOrderSetOld())
  const handleRelevance = () => dispatch(sortOrderSetRelevance())

  const sortIcon = {
    'newest': <SortByNewestIcon />,
    'oldest': <SortByOldestIcon />,
  }

  const sortIconWithRelevance = {
    ...sortIcon,
    'relevance': <RelevanceIcon />
  }

  return (
    <div ref={menuRef}>
      <button
        ref={sortOptionsRef}
        className={cx(buttonReset, sortStyles)}
        onClick={handleOpen}
        onKeyPress={updateFocus}>
        {showRelevance ? (sortIconWithRelevance[sortOrder]) : (sortIcon[sortOrder])}
      </button>
      <PopupMenu
        trigger={sortOptionsRef}
        title={t('settings:sort-options', 'Sorting options')}
        screenReaderLabel={t('settings:sort-options', 'Sorting options')}
        appRootSelector={appRootSelector}
        data-cy='sort-options'
        popperOptions={{
          placement: 'bottom-end',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 4]
              }
            }
          ]
        }}>
        <PopupMenuItem
          data-cy="sort-oldest"
          onClick={handleOldest}>
            <SortByOldestIcon />
            {t('settings:sort-oldest', 'Oldest first')}
        </PopupMenuItem>
        <PopupMenuItem
          data-cy="sort-newest"
          onClick={handleNewest}>
            <SortByNewestIcon />
            {t('settings:sort-newest', 'Newest first')}
        </PopupMenuItem>
        { showRelevance ? (
          <PopupMenuItem
            data-cy="sort-relevance"
            onClick={handleRelevance}>
              <RelevanceIcon />
              {t('settings:sort-relevance', 'By relevance')}
          </PopupMenuItem>
        ) : null }
      </PopupMenu>
    </div>
  )
}
