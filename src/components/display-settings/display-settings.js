import React, { useRef, useState } from 'react'
import {
  PopupMenu, PopupMenuGroup, PopupMenuItem,
  TextSizeIcon, ChevronDownIcon, ChevronRightIcon, PremiumIcon, ChevronLeftIcon,
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

const FONT_RANGE = [16, 19, 22, 25, 28, 32, 37]
const LINE_HEIGHT = [1.2, 1.3, 1.4, 1.5, 1.65, 1.9, 2.5]
const COLUMN_WIDTH = [531, 574, 632, 718, 826, 933, 1041]

const displayStyles = css`
  & > span { background: transparent; }

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
  forceShow
}) => {
  const [displayFonts, setDisplayFonts] = useState(false)

  const displayMenuTriggerRef = useRef(null)

  const decreaseFontSize = () => {
    setFontSize(fontSize - 1)
  }
  const increaseFontSize = () => {
    setFontSize(fontSize + 1)
  }

  const decreaseLineHeight = () => {
    setLineHeight(lineHeight - 1)
  }
  const increaseLineHeight = () => {
    setLineHeight(lineHeight + 1)
  }

  const decreaseColumnWidth = () => {
    setColumnWidth(columnWidth - 1)
  }
  const increaseColumnWidth = () => {
    setColumnWidth(columnWidth + 1)
  }

  const toggleDisplayFonts = () => {
    setDisplayFonts(!displayFonts)
  }
  const updateFontFamily = (family) => {
    setFontFamily(family)
  }

  const handleOnClose = () => {
    setDisplayFonts(false)
  }

  return (
    <div className={displayStyles}>
      <WithTooltip label="Display Settings">
        <button
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
        title="Display Settings"
        screenReaderLabel="Display Settings"
        appRootSelector={appRootSelector}
        popperOptions={{
          placement: 'bottom-end',
          modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          }]
        }}
      >
        <PopupMenuGroup>
          { displayFonts ? (
            <PopupMenuItem
              onClick={toggleDisplayFonts}
              icon={<ChevronLeftIcon />}>
              Font Options {/*reader.displaySettings.fontOptions*/}
            </PopupMenuItem>
          ):(
            <PopupMenuItem
              className={fontFamilyButton}
              onClick={toggleDisplayFonts}>
              {FONT_TYPES[fontFamily].name}
              <ChevronRightIcon />
            </PopupMenuItem>
          )}
        </PopupMenuGroup>
        { displayFonts ? (
          <FontSettings
            closeMenu={toggleDisplayFonts}
            updateFontFamily={updateFontFamily}
            isPremium={isPremium}
            currentFont={fontFamily}
          />
        ):(
          <>
            <ThemeSettings />
            <FontSizeSettings
              clickDecrease={decreaseFontSize}
              clickIncrease={increaseFontSize}
              range={FONT_RANGE}
              current={fontSize}
              setCurrent={setFontSize}
            />
            { isPremium ? (
              <>
                <LineHeightSettings
                  clickDecrease={decreaseLineHeight}
                  clickIncrease={increaseLineHeight}
                  range={LINE_HEIGHT}
                  current={lineHeight}
                  setCurrent={setLineHeight}
                />
                <ColumnWidthSettings
                  clickDecrease={decreaseColumnWidth}
                  clickIncrease={increaseColumnWidth}
                  range={COLUMN_WIDTH}
                  current={columnWidth}
                  setCurrent={setColumnWidth}
                />
              </>
            ):(
              <PopupMenuGroup>
                <PopupMenuItem
                  href="https://getpocket.com/premium?ep=3"
                  target="_premium"
                  icon={<PremiumIcon />}>
                  Unlock more options
                </PopupMenuItem>
              </PopupMenuGroup>
            )}
          </>
        )}
      </PopupMenu>
    </div>
  )
}
