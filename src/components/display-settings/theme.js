import React, { useState, useEffect } from 'react'
import { PopupMenuGroup } from '@pocket/web-ui'
import classnames from 'classnames'
import { css } from 'linaria'

const COLOR_MODE_CACHE_KEY = 'pocket-color-mode'

const themeWrapper = css`
  padding: 0 var(--spacing100);
`

const themeRadioButtons = css`
  input[type='radio'] + label:before {
    top: 3px;
    left: -9px;
  }

  input[type='radio'] + label:after {
    top: 8px;
    left: -4px;
  }
`

const Themes = [
  {
    id: 'light',
    label: 'Light'
  },
  {
    id: 'dark',
    label: 'Dark'
  },
  {
    id: 'sepia',
    label: 'Sepia'
  }
]

/**
 * Helper function to format a color mode into a CSS class name.
 * @param   {String}  mode  Name of the color mode
 * @return  {String}        Formatted CSS class name
 */
function getModeStyleClass(mode) {
  return `colormode-${mode}`
}

/**
 * Helper function to figure out what the CSS class name should be based on the
 * mode name that maps to the current OS color mode.
 * @return  {String}  Formatted CSS class name
 */
function getOSModeClass() {
  if (!global.matchMedia) return

  const isDarkMode = global.matchMedia('(prefers-color-scheme: dark)').matches
  const isLightMode = global.matchMedia('(prefers-color-scheme: light)').matches
  const isNotSpecified = global.matchMedia(
    '(prefers-color-scheme: no-preference)'
  ).matches
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified
  let mode
  let modeClass

  if (isLightMode) {
    mode = 'light'
  }
  if (isDarkMode) {
    mode = 'dark'
  }
  if (isNotSpecified || hasNoSupport) {
    mode = undefined
  }

  if (mode) {
    modeClass = getModeStyleClass(mode)
  }

  return modeClass
}

/**
 * Store the user's mode selection in localStorage so that we can use it as the
 * default selection on the next page reload.
 * @param   {String}  mode  Name of the color mode
 */
function setCachedModeSelection(mode) {
  if (global.localStorage) {
    global.localStorage.setItem(COLOR_MODE_CACHE_KEY, mode)
  }
}

/**
 * Retrieve the last color mode setting from localStorage, so that we can use it
 * as our default selection
 * @return  {String}  Name of the color mode
 */
function getCachedModeSelection() {
  if (global.localStorage) {
    return global.localStorage.getItem(COLOR_MODE_CACHE_KEY)
  }
}

/**
 * This is our *beta* color mode picker that can control what color mode gets
 * applied to a web page. Not intended for production use at this time, but can
 * be used to toggle color mode to help with development of other components.
 *
 * Color modes are applied by adding a special color theme CSS class to the <html>
 * tag. The `darkMode` constant value (css selector) within this component library
 * will pick up on the html class and can be used to define dark mode styles.
 * In the future we may have support for additional color modes.
 *
 * The user's color theme choice is cached with localStorage so that on successive
 * page refreshes, the theme remains the same. If the user chooses the "System Default"
 * option, we detect which supported theme the OS mode matches with (i.e. dark or
 * light) and apply the correct theme.
 */
export const ThemeSettings = () => {
  const htmlTag = global.document && global.document.documentElement
  // current mode will be read from local storage and updated on component did mount
  // if the user had previously chosen a selection
  const [currentMode, setCurrentMode] = useState('light')
  const [currentModeClass, setCurrentModeClass] = useState('colormode-light') // default page theme
  const [isPickerExpanded, setIsPickerExpanded] = useState(false)

  function addOSModeListeners() {
    if (!global.matchMedia) return

    // Feb 2020 note: there are only two color modes available on most Operating Systems,
    // "light" and "dark" - adding an event listener for "light" covers both change events,
    // since if the mode is not light, it is dark. If more color modes get added,
    // this may need to be updated to include listeners for all variants of color modes.
    global
      .matchMedia('(prefers-color-scheme: light)')
      .addListener(handleOSModeChange)
  }

  function removeOSModeListeners() {
    if (!global.matchMedia) return

    // Feb 2020 note: there are only two color modes available on most Operating Systems,
    // "light" and "dark" - adding an event listener for "light" covers both change events,
    // since if the mode is not light, it is dark. If more color modes get added,
    // this may need to be updated to include listeners for all variants of color modes.
    global
      .matchMedia('(prefers-color-scheme: light)')
      .removeListener(handleOSModeChange)
  }

  /**
   * Update the CSS class name applied to the <html> element by removing the
   * previous mode class if applicable, and adding the new mode class. We do
   * this directly through the DOM API since the <html> element is outside of
   * the React context.
   * @param   {String}  oldClass  CSS class for the previous mode
   * @param   {String}  newClass  CSS class for the new mode
   */
  function updateHtmlTag(oldClass, newClass) {
    if (htmlTag) {
      if (oldClass) {
        htmlTag.classList.remove(oldClass)
      }
      if (newClass) {
        htmlTag.classList.add(newClass)
      }
    }
  }

  /**
   * Called when the Operating System color mode is changed. The change listener
   * is only applied when the user has selected "System Default" as their color
   * mode option.
   */
  function handleOSModeChange() {
    const newClass = getOSModeClass()
    updateHtmlTag(currentModeClass, newClass)
    setCurrentModeClass(newClass)
  }

  /**
   * Called when the color mode option <select> changes. Updates the color mode
   * setting based on the user's selection.
   * @param   {Event}  event  Select element event
   */
  function handleChange(event) {
    const mode = event.target.value
    updateCurrentMode(mode)
  }

  function handleToggleClick(event) {
    setIsPickerExpanded(!isPickerExpanded)
  }

  function updateCurrentMode(mode) {
    let modeClass

    if (mode === 'os') {
      modeClass = getOSModeClass()
      addOSModeListeners()
    } else {
      modeClass = getModeStyleClass(mode)
      removeOSModeListeners()
    }

    setCurrentMode(mode)
    setCachedModeSelection(mode)
    updateHtmlTag(currentModeClass, modeClass)
    setCurrentModeClass(modeClass)
  }

  useEffect(() => {
    // componentDidMount
    const mode = getCachedModeSelection() || 'light'
    if (mode) {
      updateCurrentMode(mode)
    }

    // componentWillUnmount
    return () => {
      removeOSModeListeners()
    }
  }, [])

  return (
    <PopupMenuGroup>
      <div className={themeWrapper}>
        {Themes.map(({ id, label }) => (
          <span key={id} className={themeRadioButtons}>
            <input
              type="radio"
              name="theme"
              value={id}
              id={id}
              onChange={handleChange}
              checked={currentMode === id}
            />
            <label htmlFor={id}>{label}</label>
          </span>
        ))}
      </div>
    </PopupMenuGroup>
  )
}
