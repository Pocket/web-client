import style from './style.module.css'

import * as AllIcons from '@ui/icons'

import type { Meta } from '@storybook/react'
import type { IconType } from '@ui/icons'

const meta: Meta<IconType> = {
  title: 'UI/Icon'
}

export default meta

/**
 *
 */
export function Icon() {
  const iconList = Object.keys(AllIcons).sort()
  return (
    <div className={style.iconGrid}>
      {iconList.map((iconName) => {
        const IconToRender = AllIcons[iconName]
        return (
          <div key={iconName} className={style.iconBlock}>
            <IconToRender /> {iconName}
          </div>
        )
      })}
    </div>
  )
}
