// Components
import { ItemSoundLayout as Component } from '.'
import { ItemSound } from '../item-sound'

// Mock Data
import itemData from '@common/mock-data/in-state/soundById.json'

// Types
import type { Item } from '@common/types'
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item - Sound / Layout',
  component: Component
}
export default meta

// Stories
const itemsById: Record<string, Item> = itemData

export const Layout: StoryObj<typeof Component> = {
  render: (args) => {
    return (
      <Component {...args}>
        {Object.keys(itemsById).map((id) => (
          <ItemSound key={id} item={itemsById[id]!} />
        ))}
      </Component>
    )
  }
}
