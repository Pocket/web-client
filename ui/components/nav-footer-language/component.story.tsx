// Components
import { LanguageSelector as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Nav - Footer / Language Selector',
  component: Component
}
export default meta

// Stories
export const LanguageSelector: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
