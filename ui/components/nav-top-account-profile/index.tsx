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
import { CollectionsIcon } from '@ui/icons/CollectionsIcon'
import { LockIcon } from '@ui/icons/LockIcon'
import { SaveIcon } from '@ui/icons/SaveIcon'
import { SettingsIcon } from '@ui/icons/SettingsIcon'
import { useState } from 'react'

import { useUserInfo } from '@common/state/user-info'

/**
 * NavTopAccountProfile
 * ---
 * The profile menu available for authenticated users
 */
export function NavTopAccountProfile() {
  const avatarUrl = useUserInfo((state) => state.avatarUrl)

  // Local state
  const [isOpen, setIsOpen] = useState(false)

  const { refs, context, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({
        mainAxis: 16,
        crossAxis: 0
      }),
      autoPlacement({
        allowedPlacements: ['bottom-end']
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
      <div className={style.base} data-testid="nav-top-account-profile">
        <button
          className={`${style.avatar} text`}
          {...getReferenceProps()}
          ref={refs.setReference}
          type="button">
          <img alt="" src={avatarUrl as string} />
        </button>
      </div>

      {isOpen ? (
        <FloatingPortal>
          <FloatingFocusManager context={context} initialFocus={5} visuallyHiddenDismiss={true}>
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, zIndex: 'var(--z-index-menu)' }}
              onClick={handleClick}
              {...getFloatingProps()}>
              <ProfilePanel />
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
function ProfilePanel() {
  // Connect state info
  const firstName = useUserInfo((state) => state.firstName)
  const lastName = useUserInfo((state) => state.lastName)
  const email = useUserInfo((state) => state.email)
  const logout = useUserInfo((state) => state.actions.removeUserData)

  return (
    <div className={style.panel}>
      <div className={style.details}>
        <div className={style.name}>
          {firstName} {lastName}
        </div>
        <div className={style.email}>{email}</div>
      </div>
      <hr />
      <button className={`menu ${style.menuTop}`} type="button">
        <SaveIcon /> {t('profile:saves', 'Saves')}
      </button>
      <button className="menu" type="button">
        <CollectionsIcon /> {t('profile:collections', 'Collections')}
      </button>
      <hr />
      <button className="menu" type="button">
        <SettingsIcon /> {t('profile:settings', 'Settings')}
      </button>
      <hr />
      <button className="menu" type="button" onClick={logout}>
        <LockIcon /> {t('profile:log-out', 'Log Out')}
      </button>
    </div>
  )
}
