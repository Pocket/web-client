// Components
import { ItemShortLayout as Component } from '.'
import { ItemShort } from '../item-short'

// Mock Data
import itemData from '@common/mock-data/in-state/shortsById.json'

import type { Item } from '@common/types'
// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item - Short / Layout',
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
          <ItemShort key={id} item={itemsById[id] as Item} />
        ))}
      </Component>
    )
  }
}
