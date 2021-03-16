import React from 'react'
import { PopupMenuGroup } from '@pocket/web-ui'
import { css } from 'linaria'
import { Trans } from 'next-i18next'

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
    label: <Trans i18nKey="settings:theme-light">Light</Trans>
  },
  {
    id: 'dark',
    label: <Trans i18nKey="settings:theme-dark">Dark</Trans>
  },
  {
    id: 'sepia',
    label: <Trans i18nKey="settings:theme-sepia">Sepia</Trans>
  }
]

export const ThemeSettings = ({ colorMode = 'light', setColorMode }) => {
  const handleChange = (event) => setColorMode(event?.target?.value)

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
              checked={colorMode === id}
            />
            <label htmlFor={id}>{label}</label>
          </span>
        ))}
      </div>
    </PopupMenuGroup>
  )
}
