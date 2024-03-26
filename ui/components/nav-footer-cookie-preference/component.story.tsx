// Components
import { NavFooterCookiePreference as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Nav - Footer/ Cookie Preference',
  component: Component
}
export default meta

// Stories
export const CookiePreference: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
