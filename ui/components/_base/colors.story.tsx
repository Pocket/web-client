import style from './style.module.css'

import type { Meta } from '@storybook/react'

const meta: Meta = {
  title: 'UI/Colors'
}

export default meta

export function Colors() {
  return (
    <div className={style.colorGrid}>
      {semanticColors.map((colorName) => {
        const colorStyle = { backgroundColor: `var(--${colorName})` }
        return (
          <div className={style.colorBlock} key={colorName}>
            <div style={colorStyle} />
            {colorName}
          </div>
        )
      })}
    </div>
  )
}

const semanticColors = [
  'color-canvas',
  'color-textPrimary',
  'color-textSecondary',
  'color-textTertiary',
  'color-textLinkHover',
  'color-textLinkPressed',
  'color-textAccent',
  'color-actionPrimary',
  'color-actionPrimaryHover',
  'color-actionPrimarySubdued',
  'color-actionPrimaryText',
  'color-actionSecondary',
  'color-actionSecondaryHover',
  'color-actionSecondaryHoverText',
  'color-actionSecondaryText',
  'color-actionBrand',
  'color-actionBrandHover',
  'color-actionBrandSubdued',
  'color-actionBrandText',
  'color-actionFocus',
  'color-formFieldFocusLabel',
  'color-formFieldTextPrimary',
  'color-formFieldTextSecondary',
  'color-formFieldBorder',
  'color-formFieldBorderHover',
  'color-error',
  'color-toggleOff',
  'color-toggleOffHover',
  'color-activeCanvas',
  'color-popoverCanvas',
  'color-popoverBorder',
  'color-menuItemHover',
  'color-menuItemHoverText',
  'color-menuItemActive',
  'color-navCurrentTab',
  'color-navCurrentTabText',
  'color-tooltipCanvas',
  'color-tooltipText',
  'color-drawerCanvas',
  'color-emptyCanvas',
  'color-dividerPrimary',
  'color-dividerSecondary',
  'color-dividerTertiary',
  'color-calloutBackgroundPrimary',
  'color-calloutBackgroundSecondary',
  'color-calloutAccent',
  'color-newsroomBackgroundPrimary',
  'color-newsroomBackgroundSecondary',
  'color-newsroomBackgroundText',
  'color-checkboxLabel',
  'color-checkboxBorder',
  'color-checkboxBackground',
  'color-checkboxInputBorder',
  'color-checkboxInputBackground',
  'color-checkboxHighlight',
  'color-checkboxLabelSelected',
  'color-checkboxBorderSelected',
  'color-checkboxBackgroundSelected',
  'color-checkboxInputBorderSelected',
  'color-checkboxInputBackgroundSelected',
  'color-paginationText',
  'color-paginationHover',
  'color-paginationHoverText',
  'color-paginationActive',
  'color-paginationActiveText'
]
