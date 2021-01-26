import React, { useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  PopupMenu,
  PopupMenuGroup,
  PopupMenuItem,
  TextSizeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PremiumIcon,
  ChevronLeftIcon,
  WithTooltip
} from '@pocket/web-ui'
import { css } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import classNames from 'classnames'
import { FontSettings } from './fonts'
import { FontSizeSettings } from './font-size'
import { LineHeightSettings } from './line-height'
import { ColumnWidthSettings } from './column-width'
import { ThemeSettings } from './theme'
import { FONT_TYPES } from 'components/fonts/fonts'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'

const FONT_RANGE = [16, 19, 22, 25, 28, 32, 37]
const LINE_HEIGHT = [1.2, 1.3, 1.4, 1.5, 1.65, 1.9, 2.5]
const COLUMN_WIDTH = [531, 574, 632, 718, 826, 933, 1041]

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

  .icon {
    background-color: transparent;
    color: var(--color-textSecondary);
    font-size: var(--size150);
    &:hover {
      color: var(--color-textPrimary);
      background-color: transparent;
    }
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
  forceShow,
  onVisible
}) => {
  const { t } = useTranslation()

  const [displayFonts, setDisplayFonts] = useState(false)

  const displayMenuTriggerRef = useRef(null)

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

  const handleOnClose = () => {
    setDisplayFonts(false)
  }

  const handleVisible = () => {
    onVisible('reader.display-settings')
  }

  return (
    <div className={displayStyles}>
      <WithTooltip
        label={t('settings:open-display-settings', 'Open Display Settings')}>
        <button
          aria-label={t(
            'settings:open-display-settings',
            'Open Display Settings'
          )}
          className={classNames(buttonReset, buttonStyles)}
          ref={displayMenuTriggerRef}>
          <TextSizeIcon />
          <ChevronDownIcon />
        </button>
      </WithTooltip>
      <PopupMenu
        forceShow={forceShow}
        id="display-settings"
        onClose={handleOnClose}
        trigger={displayMenuTriggerRef}
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
              onClick={toggleDisplayFonts}
              icon={<ChevronLeftIcon />}>
              <Trans i18nKey="settings:font-options">Font Options</Trans>
            </PopupMenuItem>
          ) : (
            <PopupMenuItem
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
            <ThemeSettings />
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
                    href="https://getpocket.com/premium?ep=3"
                    target="_premium"
                    icon={<PremiumIcon />}>
                    <Trans i18nKey="settings:unlock-more-options">
                      Unlock more options
                    </Trans>
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
