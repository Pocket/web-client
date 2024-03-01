import { css, cx } from '@emotion/css'
import { useRef, useState } from 'react'
import { SortByNewestIcon } from 'components/icons/SortByNewestIcon'
import { SortByOldestIcon } from 'components/icons/SortByOldestIcon'
import { RelevanceIcon } from 'components/icons/RelevanceIcon'
import { useCorrectEffect } from 'common/utilities/hooks/use-correct-effect'
import { buttonReset } from 'components/buttons/button-reset'
import { useTranslation } from 'next-i18next'
import { PopupMenu, PopupMenuItem } from 'components/popup-menu/popup-menu'
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

export const ListSort = ({
  sortOrder,
  showRelevance,
  handleNewest,
  handleOldest,
  handleRelevance
}) => {
  const { t } = useTranslation()
  const appRootSelector = '#__next'

  const sortOptionsRef = useRef(null)
  const menuRef = useRef(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const [focus, setFocus] = useState(false)

  useCorrectEffect(() => {
    if (!focus || !menuOpen) return

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

  const sortIcon = {
    ASC: <SortByOldestIcon />,
    DESC: <SortByNewestIcon />,
    RELEVANCE: <RelevanceIcon />,
    newest: <SortByNewestIcon />,
    oldest: <SortByOldestIcon />,
    relevance: <RelevanceIcon />
  }

  const sortAscDisabled = sortOrder === 'ASC' || sortOrder === 'oldest'
  const sortDescDisabled = sortOrder === 'DESC' || sortOrder === 'newest'
  const relevanceDisabled = sortOrder === 'RELEVANCE' || sortOrder == 'relevance'

  return (
    <div ref={menuRef}>
      <button
        ref={sortOptionsRef}
        className={cx(buttonReset, sortStyles)}
        onClick={handleOpen}
        data-testid="sort-options"
        onKeyPress={updateFocus}>
        {sortIcon[sortOrder]}
      </button>
      <PopupMenu
        trigger={sortOptionsRef}
        title={t('settings:sort-options', 'Sorting options')}
        screenReaderLabel={t('settings:sort-options', 'Sorting options')}
        appRootSelector={appRootSelector}
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
        <PopupMenuItem data-testid="sort-oldest" onClick={handleOldest} disabled={sortAscDisabled}>
          <SortByOldestIcon />
          {t('settings:sort-oldest', 'Oldest first')}
        </PopupMenuItem>
        <PopupMenuItem data-testid="sort-newest" onClick={handleNewest} disabled={sortDescDisabled}>
          <SortByNewestIcon />
          {t('settings:sort-newest', 'Newest first')}
        </PopupMenuItem>
        {showRelevance ? (
          <PopupMenuItem
            data-testid="sort-relevance"
            onClick={handleRelevance}
            disabled={relevanceDisabled}>
            <RelevanceIcon />
            {t('settings:sort-relevance', 'By relevance')}
          </PopupMenuItem>
        ) : null}
      </PopupMenu>
    </div>
  )
}
