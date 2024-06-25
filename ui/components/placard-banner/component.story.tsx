// Components
import { PlacardBanner as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Placard / Banner',
  component: Component
}
export default meta

// Stories
export const Banner: StoryObj<typeof Component> = {
  render: () => {
    return <Component/>
  },
  args: {}
}
