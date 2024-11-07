import style from './style.module.css'

import type { Meta } from '@storybook/react'

const meta: Meta = {
  title: 'UI/Colors'
}

export default meta

/**
 * Shows all the color variables that are used.  We could do something similar for the others
 * semantic variables, but they are less valuable without context
 */
export function Colors() {
  const semanticColors = getSemanticColors()

  return (
    <div className={style.colorGrid}>
      {semanticColors.map((colorName) => {
        const colorStyle = { backgroundColor: `var(${colorName})` }
        return (
          <div key={colorName} className={style.colorBlock}>
            <div style={colorStyle} />
            {colorName.substring(8)}
          </div>
        )
      })}
    </div>
  )
}

/**
 * Retrieves all relevant stylesheets from the document.
 * Only includes stylesheets that are either inline or from the same origin.
 * @returns Array of relevant stylesheets.
 */
function getRelevantStyleSheets(): CSSStyleSheet[] {
  return Array.from(document.styleSheets).filter(
    (sheet) => !sheet.href || sheet.href.startsWith(window.location.origin)
  )
}

/**
 * Extracts all `:root` selector rules from a given stylesheet.
 * These rules typically contain CSS variables.
 * @param sheet - The stylesheet to extract `:root` rules from.
 * @returns Array of CSS rules that match the `:root` selector.
 */
function getRootSelectorRules(sheet: CSSStyleSheet): CSSStyleRule[] {
  return Array.from(sheet.cssRules).filter(
    (rule) => (rule as CSSStyleRule).selectorText === ':root'
  ) as CSSStyleRule[]
}

/**
 * Filters and returns the CSS variable names that start with `--color`.
 * @param rule - The CSS rule to extract color variables from.
 * @returns Array of CSS variable names starting with `--color`.
 */
function extractColorVariables(rule: CSSStyleRule): string[] {
  return Array.from(rule.style).filter((name) => name.startsWith('--color'))
}

/**
 * Aggregates all semantic color variables from the relevant stylesheets in the document.
 * @returns Array of all semantic color variables found.
 */
function getSemanticColors(): string[] {
  const relevantStyleSheets = getRelevantStyleSheets()

  return relevantStyleSheets.reduce<string[]>((acc, sheet) => {
    const rootRules = getRootSelectorRules(sheet)

    const colorVariables = rootRules.reduce<string[]>((def, rule) => {
      return [...def, ...extractColorVariables(rule)]
    }, [])

    return [...acc, ...colorVariables]
  }, [])
}
