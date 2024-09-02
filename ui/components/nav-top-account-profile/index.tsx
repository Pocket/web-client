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
import { AddCircledIcon } from '@ui/icons/AddCircledIcon'
import { CollectionsIcon } from '@ui/icons/CollectionsIcon'
import { HomeIcon } from '@ui/icons/HomeIcon'
import { LockIcon } from '@ui/icons/LockIcon'
import { SaveIcon } from '@ui/icons/SaveIcon'
import { SettingsIcon } from '@ui/icons/SettingsIcon'
import { useState } from 'react'

import { SettingTheme } from '../setting-theme'

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
        allowedPlacements: ['bottom-end', 'bottom-start']
      })
    ],
    whileElementsMounted: autoUpdate
  })

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    ancestorScroll: true
  })
  const focus = useFocus(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, focus])

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
          <FloatingFocusManager context={context} modal={false} visuallyHiddenDismiss={true}>
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, zIndex: 'var(--z-index-menu)' }}
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
  const logout = useUserInfo((state) => state.removeUserData)

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
        <HomeIcon /> {t('profile:home', 'Home')}
      </button>
      <button className="menu" type="button">
        <SaveIcon /> {t('profile:saves', 'Saves')}
      </button>
      <button className="menu" type="button">
        <CollectionsIcon /> {t('profile:collections', 'Collections')}
      </button>
      <button className="menu" type="button">
        <AddCircledIcon /> {t('profile:add', 'Add')}
      </button>
      <button className="menu" type="button">
        <SettingsIcon /> {t('profile:settings', 'Settings')}
      </button>
      <hr />
      <div className={style.themeSelect}>
        <SettingTheme buttonClass={style.themeButton} />
      </div>

      <hr />
      <button className="menu" type="button" onClick={logout}>
        <LockIcon /> {t('profile:log-out', 'Log Out')}
      </button>
    </div>
  )
}
