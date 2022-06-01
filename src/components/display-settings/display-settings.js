import { cx } from 'linaria'
import React, { useRef, useState } from 'react'
import { useCorrectEffect } from 'common/utilities/hooks/use-correct-effect'
import { Trans, useTranslation } from 'next-i18next'
import { breakpointMediumHandset } from 'common/constants'
import { PopupMenu, PopupMenuGroup, PopupMenuItem } from 'components/popup-menu/popup-menu'

import { TextSizeIcon } from 'components/icons/TextSizeIcon'
import { ChevronDownIcon } from 'components/icons/ChevronDownIcon'
import { ChevronRightIcon } from 'components/icons/ChevronRightIcon'
import { PremiumIcon } from 'components/icons/PremiumIcon'
import { ChevronLeftIcon } from 'components/icons/ChevronLeftIcon'

import { css } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import { bottomTooltip } from 'components/tooltip/tooltip'
import { FontSettings } from './fonts'
import { FontSizeSettings } from './font-size'
import { LineHeightSettings } from './line-height'
import { ColumnWidthSettings } from './column-width'
import { ThemeSettings } from './theme'
import { FONT_TYPES } from 'components/fonts/fonts'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { FONT_RANGE } from 'common/constants'
import { LINE_HEIGHT } from 'common/constants'
import { COLUMN_WIDTH } from 'common/constants'
import { KEYS } from 'common/constants'
import { PREMIUM_URL } from 'common/constants'

const displayStyles = css`
  & > span {
    background: transparent;
  }

  #display-settings {
    min-width: 355px;
  }
`

const fontFamilyButton = css`
  .label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .icon {
      margin-right: 0;
    }
  }
`

const buttonStyles = css`
  background-color: transparent;
  color: var(--color-textSecondary);
  font-size: var(--size150);
  &:hover {
    color: var(--color-textPrimary);
    background-color: transparent;
  }
  &:active,
  &:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
  }

  .icon {
    background-color: transparent;
    color: var(--color-textSecondary);
    height: 1.5rem;

    &:hover {
      color: var(--color-textPrimary);
      background-color: transparent;
    }
  }

  .chevron-icon {
    ${breakpointMediumHandset} {
      display: none;
    }
  }
`

const mobileStyles = css`
  ${breakpointMediumHandset} {
    margin-left: 1rem;
  }
`

export const DisplaySettings = ({
  fontFamily,
  fontSize,
  columnWidth,
  lineHeight,
  appRootSelector,
  setFontFamily,
  setFontSize,
  setLineHeight,
  setColumnWidth,
  isPremium,
  forceShow = false,
  onVisible,
  colorMode,
  setColorMode
}) => {
  const { t } = useTranslation()

  const [menuOpen, setMenuOpen] = useState(forceShow)
  const [displayFonts, setDisplayFonts] = useState(false)
  const [focus, setFocus] = useState(false)

  const displayButtonRef = useRef(null)
  const menuRef = useRef(null)

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
      handleOnClose()
      displayButtonRef.current.click()
    }
  }

  const decreaseFontSize = () => {
    setFontSize(parseInt(fontSize) - 1)
  }
  const increaseFontSize = () => {
    setFontSize(parseInt(fontSize) + 1)
  }

  const decreaseLineHeight = () => {
    setLineHeight(parseInt(lineHeight) - 1)
  }
  const increaseLineHeight = () => {
    setLineHeight(parseInt(lineHeight) + 1)
  }

  const decreaseColumnWidth = () => {
    setColumnWidth(parseInt(columnWidth) - 1)
  }
  const increaseColumnWidth = () => {
    setColumnWidth(parseInt(columnWidth) + 1)
  }

  const toggleDisplayFonts = (e) => {
    e.stopPropagation()
    setDisplayFonts(!displayFonts)
  }
  const updateFontFamily = (family) => {
    setFontFamily(family)
  }

  const updateFocus = (e) => {
    if (e.charCode === KEYS.SPACE || e.charCode === KEYS.ENTER) setFocus(true)
  }

  const handleOpen = () => {
    setMenuOpen(true)
  }

  const handleOnClose = () => {
    setDisplayFonts(false)
    setMenuOpen(false)
    setFocus(false)
  }

  const handleVisible = () => {
    onVisible('reader.display-settings')
  }

  return (
    <div className={displayStyles} ref={menuRef}>
      <button
        aria-label={t('settings:open-display-settings', 'Open Display Settings')}
        data-tooltip={t('settings:open-display-settings', 'Open Display Settings')}
        data-cy="reader-nav-display-settings"
        className={cx(buttonReset, buttonStyles, bottomTooltip, mobileStyles)}
        ref={displayButtonRef}
        onClick={handleOpen}
        onKeyPress={updateFocus}>
        <TextSizeIcon />
        <ChevronDownIcon className="chevron-icon" />
      </button>
      <PopupMenu
        id="display-settings"
        onClose={handleOnClose}
        trigger={displayButtonRef}
        title={t('settings:display-settings', 'Display Settings')}
        screenReaderLabel={t('settings:display-settings', 'Display Settings')}
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
        <PopupMenuGroup>
          {displayFonts ? (
            <PopupMenuItem
              data-cy="display-font-back"
              onClick={toggleDisplayFonts}
              icon={<ChevronLeftIcon />}>
              <Trans i18nKey="settings:font-options">Font Options</Trans>
            </PopupMenuItem>
          ) : (
            <PopupMenuItem
              data-cy="display-select-font"
              className={fontFamilyButton}
              onClick={toggleDisplayFonts}>
              {FONT_TYPES[fontFamily].name}
              <ChevronRightIcon />
            </PopupMenuItem>
          )}
        </PopupMenuGroup>
        {displayFonts ? (
          <FontSettings
            closeMenu={toggleDisplayFonts}
            updateFontFamily={updateFontFamily}
            isPremium={isPremium}
            currentFont={fontFamily}
          />
        ) : (
          <>
            <ThemeSettings setColorMode={setColorMode} colorMode={colorMode} />
            <FontSizeSettings
              clickDecrease={decreaseFontSize}
              clickIncrease={increaseFontSize}
              range={FONT_RANGE}
              current={parseInt(fontSize)}
              setCurrent={setFontSize}
            />
            {isPremium ? (
              <>
                <LineHeightSettings
                  clickDecrease={decreaseLineHeight}
                  clickIncrease={increaseLineHeight}
                  range={LINE_HEIGHT}
                  current={parseInt(lineHeight)}
                  setCurrent={setLineHeight}
                />
                <ColumnWidthSettings
                  clickDecrease={decreaseColumnWidth}
                  clickIncrease={increaseColumnWidth}
                  range={COLUMN_WIDTH}
                  current={parseInt(columnWidth)}
                  setCurrent={setColumnWidth}
                />
              </>
            ) : (
              <VisibilitySensor onVisible={handleVisible}>
                <PopupMenuGroup>
                  <PopupMenuItem
                    id="reader.display-settings"
                    data-cy="display-premium-unlock"
                    href={`${PREMIUM_URL}&utm_campaign=reader-display-settings`}
                    target="_premium"
                    icon={<PremiumIcon />}>
                    <Trans i18nKey="settings:unlock-more-options">Unlock more options</Trans>
                  </PopupMenuItem>
                </PopupMenuGroup>
              </VisibilitySensor>
            )}
          </>
        )}
      </PopupMenu>
    </div>
  )
}
