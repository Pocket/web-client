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

export const ListStatusToggle = ({ status, handleSetStatus }) => {
  const appRootSelector = '#__next'

  const statusRef = useRef(null)

  const handleSetPrivate = () => handleSetStatus({status: 'PRIVATE'})
  const handleSetPublic = () => handleSetStatus({status: 'PUBLIC'})

  const publicIcon = (status === 'PUBLIC') ? <CheckCircledIcon className="active" /> : <EmptyCircledIcon />
  const privateIcon = (status === 'PRIVATE') ? <CheckCircledIcon className="active" /> : <EmptyCircledIcon />

  return (
    <>
      <button
        ref={statusRef}
        className={cx("tiny", "outline", buttonStyles, status)}
        data-cy="sort-options">
        {status === 'PRIVATE' ? (
          <><LockIcon /> Private</>
        ): (
          <><GlobeIcon /> Public</>
        )} <ChevronDownIcon />
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
          helperText="Only you can view your list.">
          Private List
        </PopupMenuItem>
        <PopupMenuItem
          onClick={handleSetPublic}
          icon={publicIcon}
          helperText="Publish your list to share via social media, email and messaging apps.">
          Public List
        </PopupMenuItem>
      </PopupMenu>
    </>
  )
}
