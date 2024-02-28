import { useCallback, useEffect } from 'react'
import { PopupMenuGroup } from 'components/popup-menu/popup-menu'
import { breakpointSmallHandset } from 'common/constants'
import { css } from '@emotion/css'
import { Trans } from 'next-i18next'

const themeWrapper = css`
  display: flex;
  flex-direction: row;
  padding: 0 var(--spacing100);

  ${breakpointSmallHandset} {
    flex-direction: column;
  }
`

const themeRadioButtons = css`
  label {
    padding-right: 1rem;
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
  },
  {
    id: 'system',
    label: <Trans i18nKey="settings:theme-system">System</Trans>
  }
]

export const ThemeSettings = ({ colorMode = 'light', setColorMode }) => {
  const checkSystemTheme = useCallback(() => setColorMode(colorMode), [setColorMode, colorMode])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', checkSystemTheme)

    return () => {
      media.removeEventListener('change', checkSystemTheme)
    }
  }, [checkSystemTheme])

  const handleChange = (event) => setColorMode(event?.target?.value)

  return (
    <PopupMenuGroup>
      <div className={themeWrapper}>
        {Themes.map(({ id, label }) => (
          <span key={id} className={themeRadioButtons}>
            <label htmlFor={id}>
              <input
                type="radio"
                name="theme"
                value={id}
                id={id}
                data-cy={`display-theme-${id}`}
                onChange={handleChange}
                checked={colorMode === id}
              />
              {label}
            </label>
          </span>
        ))}
      </div>
    </PopupMenuGroup>
  )
}
