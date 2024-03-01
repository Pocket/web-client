import { css, cx } from '@emotion/css'
import { useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { PopupMenu, PopupMenuItem } from 'components/popup-menu/popup-menu'
import { ChevronDownIcon } from 'components/icons/ChevronDownIcon'
import { LockIcon } from 'components/icons/LockIcon'
import { GlobeIcon } from 'components/icons/GlobeIcon'
import { EmptyCircledIcon } from 'components/icons/EmptyCircledIcon'
import { CheckCircledIcon } from 'components/icons/CheckCircledIcon'
import { ErrorIcon } from 'components/icons/ErrorIcon'

const VisibilityDropdown = ({ visibilityStatus }) => {
  const { t } = useTranslation()

  switch (visibilityStatus) {
    case 'isPrivate':
      return (
        <>
          <LockIcon /> {t('list:private-button-title', 'Private')}{' '}
        </>
      )
    case 'isMixed':
      return (
        <>
          <GlobeIcon /> {t('list:mixed-button-title', 'Public')}{' '}
        </>
      )
    case 'isPublic':
      return (
        <>
          <GlobeIcon /> {t('list:public-title', 'Public List & Notes')}{' '}
        </>
      )
    default:
      return (
        <>
          <ErrorIcon /> {t('list:loading', 'Loading')}{' '}
        </>
      )
  }
}

export const VisibilityOptions = ({ handleSetStatus, status, listItemNoteVisibility }) => {
  const appRootSelector = '#__next'
  const { t } = useTranslation()

  const statusRef = useRef(null)

  const handleSetPrivate = () => handleSetStatus({ status: 'PRIVATE' })

  const getVisbilityStatus = (status, listItemNoteVisibility) => {
    if (status === 'PRIVATE') return 'isPrivate'
    if (listItemNoteVisibility === 'PRIVATE') return 'isMixed'
    return 'isPublic'
  }

  const visibilityStatus = getVisbilityStatus(status, listItemNoteVisibility)

  const privateIcon =
    visibilityStatus === 'isPrivate' ? (
      <CheckCircledIcon className="active" />
    ) : (
      <EmptyCircledIcon />
    )
  const mixedIcon =
    visibilityStatus === 'isMixed' ? <CheckCircledIcon className="active" /> : <EmptyCircledIcon />
  const publicIcon =
    visibilityStatus === 'isPublic' ? <CheckCircledIcon className="active" /> : <EmptyCircledIcon />

  return (
    <>
      <button
        ref={statusRef}
        className={cx('tiny', 'outline', buttonStyles, status)}
        data-testid="sort-options">
        <VisibilityDropdown visibilityStatus={visibilityStatus} />
        <ChevronDownIcon />
      </button>
      <PopupMenu
        className={toggleStyles}
        trigger={statusRef}
        title="Update Status"
        screenReaderLabel="Update List Status"
        appRootSelector={appRootSelector}
        popperOptions={{
          placement: 'bottom-start',
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
          className={visibilityStatus === 'isPrivate' ? 'active' : null}
          helperText={t('list:private-description', 'Only you can view your list and notes.')}>
          <span className="label-title">
            <LockIcon />
            {t('list:private-title', 'Private List')}
          </span>
        </PopupMenuItem>
        <PopupMenuItem
          icon={mixedIcon}
          className={visibilityStatus === 'isMixed' ? 'active' : null}
          disabled={true}
          helperText={t(
            'list:mixed-description',
            'Publish your list to share via social media, email and messaging apps. Your notes will still be private.'
          )}>
          <span className="label-title">
            <GlobeIcon />
            {t('list:mixed-title', 'Public List')}
          </span>
        </PopupMenuItem>
        <PopupMenuItem
          icon={publicIcon}
          className={visibilityStatus === 'isPublic' ? 'active' : null}
          disabled={true}
          helperText={t(
            'list:public-description',
            'Publish your list of articles and notes to share via social media, email and messaging apps.'
          )}>
          <span className="label-title">
            <GlobeIcon />
            {t('list:public-title', 'Public List & Notes')}
          </span>
        </PopupMenuItem>
      </PopupMenu>
    </>
  )
}

const buttonStyles = css`
  &.PUBLIC {
    border-color: var(--color-teal100);
    background: var(--color-teal100);
    color: var(--color-actionPrimary);
  }
`

const toggleStyles = css`
  max-width: 412px;

  li {
    &:last-child button {
      border-bottom: 0;
    }

    &.active {
      .label,
      .label-secondary {
        color: var(--color-actionPrimary);
      }
    }
  }

  button {
    align-items: center;
    border-bottom: 1px solid var(--color-dividerTertiary);

    &:hover,
    &:hover .label-secondary {
      transition: background-color 0.1s ease-out;
      background-color: var(--color-teal100);
      color: var(--color-actionPrimary);
    }
  }

  .icon.active {
    color: var(--color-actionPrimary);
  }

  .label {
    white-space: normal;
  }

  .label-title {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;

    .icon {
      height: 1rem;
      line-height: 0.875rem;
      margin-top: 0;
      margin-right: 0.25rem;
    }
  }

  .label-secondary {
    color: var(--color-textPrimary);
  }
`
