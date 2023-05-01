import { css, cx } from 'linaria'
import { useRef } from 'react'
import { PopupMenu, PopupMenuItem } from 'components/popup-menu/popup-menu'
import { ChevronDownIcon } from 'components/icons/ChevronDownIcon'
import { LockIcon } from 'components/icons/LockIcon'
import { GlobeIcon } from 'components/icons/GlobeIcon'
import { EmptyCircledIcon } from 'components/icons/EmptyCircledIcon'
import { CheckCircledIcon } from 'components/icons/CheckCircledIcon'

const buttonStyles = css`
  &.PUBLIC {
    border-color: var(--color-teal100);
    background: var(--color-teal100);
    color: var(--color-actionPrimary);
  }
`

const toggleStyles = css`
  button {
    align-items: center;
    border-bottom: 1px solid var(--color-dividerTertiary);

    &:hover, &:hover .label-secondary {
      background: var(--color-teal100);
      color: var(--color-actionPrimary);
    }
  }

  .icon.active {
    color: var(--color-actionPrimary);
  }

  .label {
    white-space: normal;
  }
`

export const ListStatusToggle = ({ handleSetStatus, status, listItemNoteVisibility }) => {
  const appRootSelector = '#__next'

  const statusRef = useRef(null)

  const handleSetPrivate = () => handleSetStatus({status: 'PRIVATE'})
  const handleSetPublic = () => handleSetStatus({status: 'PUBLIC', listItemNoteVisibility: 'PUBLIC'})
  const handleSetMixed = () => handleSetStatus({status: 'PUBLIC', listItemNoteVisibility: 'PRIVATE'})

  const visibilityStatus =
    (status === 'PRIVATE') ? 'isPrivate'
    : (status === 'PUBLIC' && listItemNoteVisibility === 'PRIVATE') ? 'isMixed'
    : (status === 'PUBLIC' && listItemNoteVisibility === 'PUBLIC' ) ? 'isPublic'
    : null

  const privateIcon = visibilityStatus === 'isPrivate' ? <CheckCircledIcon className="active" /> : <EmptyCircledIcon />
  const mixedIcon = visibilityStatus === 'isMixed' ? <CheckCircledIcon className="active" /> : <EmptyCircledIcon />
  const publicIcon = visibilityStatus === 'isPublic' ? <CheckCircledIcon className="active" /> : <EmptyCircledIcon />

  const Dropdown = () => {
    switch(visibilityStatus) {
      case 'isPrivate':
        return <><LockIcon /> Private </>
      case 'isMixed': 
        return <><LockIcon /> Public </>
      case 'isPublic': 
        return <><GlobeIcon /> Public List & Notes </>
      default:
        return <span>Visibility Status</span>
    }
  }

  return (
    <div>
      <button
        ref={statusRef}
        className={cx("tiny", "outline", buttonStyles, visibilityStatus)}
        data-cy="sort-options">
        <Dropdown />
        <ChevronDownIcon />
      </button>
      <PopupMenu
        className={toggleStyles}
        trigger={statusRef}
        title="Update Status"
        screenReaderLabel="Update List Status"
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
        <PopupMenuItem
          onClick={handleSetPrivate}
          icon={privateIcon}
          helperText="Only you can view your list and notes.">
          Private List
        </PopupMenuItem>
        <PopupMenuItem
          onClick={handleSetMixed}
          icon={mixedIcon}
          helperText="Publish your list to share via social media, email and messaging apps. Your notes will still be private.">
          Public List
        </PopupMenuItem>
        <PopupMenuItem
          onClick={handleSetPublic}
          icon={publicIcon}
          helperText="Publish your list of articles and notes to share via social media, email and messaging apps.">
          Public List & Notes
        </PopupMenuItem>
      </PopupMenu>
    </div>
  )
}
