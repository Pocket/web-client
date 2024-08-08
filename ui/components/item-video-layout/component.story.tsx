// Components
import { ItemVideoLayout as Component } from '.'
import { ItemVideo } from '../item-video'

// Mock Data
import itemData from '@common/mock-data/in-state/videosById.json'

// Types
import { Item } from '@common/types'
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item - Video / Layout',
  component: Component
}
export default meta

// Stories
const itemsById: Record<string, Item> = itemData

export const Layout: StoryObj<typeof Component> = {
  render: (args) => {
    return (
      <div className="page-container">
        <Component {...args}>
          {Object.keys(itemsById).map((id) => (
            <ItemVideo key={id} item={itemsById[id] as Item} />
          ))}
        </Component>
      </div>
    )
  }
}
