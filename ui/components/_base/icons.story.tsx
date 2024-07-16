import style from './style.module.css'

import * as AllIcons from '@ui/icons/all'

// Types
import type { Meta, StoryObj } from '@storybook/react'
import type { IconType } from '@ui/icons'

const meta: Meta<IconType> = {
  title: 'UI/Icons'
}

export default meta

export const Icons: StoryObj<typeof IconDisplayComponent> = {
  render: (args) => {
    return <IconDisplayComponent {...args} />
  },
  args: {
    fontSize: 16
  }
}

/**
 * IconDisplayComponent
 * ---
 * Display all the icons with the ability to change font sizes
 */
function IconDisplayComponent({ fontSize }: { fontSize?: number }) {
  const iconList: string[] = Object.keys(AllIcons).sort()
  return (
    <div className={style.iconContainer} style={{ fontSize: `${fontSize}px` }}>
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
    </div>
  )
}
