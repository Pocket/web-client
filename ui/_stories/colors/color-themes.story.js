import { _themeGroups } from '../../styles/variables/colors'
import { colorGroups } from './helpers'
import { GroupHeading } from './helpers'
import { ColorBlock } from './helpers'
import { css, cx } from '@emotion/css'

export default {
  title: 'UI/ColorThemes'
}

const themedColors = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  margin-bottom: 2rem;
  .colorGrouping {
    padding: 1rem;
    border-radius: var(--borderRadius);
  }
`

const themeClass = {
  light: 'colormode-light',
  dark: 'colormode-dark',
  sepia: 'colormode-sepia'
}

export const ColorThemes = (Story, context) => {
  const themeKeys = Object.keys(_themeGroups)

  return (
    <div className={colorGroups}>
      {themeKeys.map((themeKey) => {
        const group = themeGroup(_themeGroups[themeKey])
        return (
          <>
            <GroupHeading key={themeKey} title={themeKey} />
            <ColorGroup key={themeKey} group={group} themeKey={themeKey} />
          </>
        )
      })}
    </div>
  )
}

const ColorGroup = ({ group, themeKey }) => {
  return (
    <div className={themedColors}>
      {Object.keys(group).map((colorName) => {
        return (
          <div
            className={cx(themeClass[colorName], 'colorGrouping')}
            style={{ backgroundColor: 'var(--color-canvas)' }}
            key={`${colorName}-${themeKey}`}>
            {Object.keys(group[colorName]).map((key) => {
              const color = group[colorName][key]
              return <ColorBlock hex={color} colorKey={key} key={`${colorName} — ${key}`} />
            })}
          </div>
        )
      })}
    </div>
  )
}

function themeGroup(themeObject) {
  const themeValues = Object.keys(themeObject)
  return themeValues.reduce((previous, current) => {
    const light = { [current]: themeObject[current].light }
    const dark = { [current]: themeObject[current].dark }
    const sepia = { [current]: themeObject[current].sepia }
    return {
      light: { ...previous.light, ...light },
      dark: { ...previous.dark, ...dark },
      sepia: { ...previous.sepia, ...sepia }
    }
  }, {})
}
