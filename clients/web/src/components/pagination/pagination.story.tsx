// Dependencies
import { Pagination as Component } from './pagination'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Components/Pagination',
  component: Component,
  argTypes: {}
}
export default meta

// Stories
type ComponentPropsAndCustomArgs = React.ComponentProps<typeof Component> & {
  page: number
}
export const Pagination: StoryObj<ComponentPropsAndCustomArgs> = {
  render: (args) => {
    return <Component {...args} />
  },
  argTypes: {
    page: {
      control: { type: 'range', min: 1, max: 100, step: 1 }
    },
    currentPage: { table: { disable: true } }
  },
  args: {
    pagePattern: '/collections',
    totalResults: 222,
    totalLinksShown: 9,
    page: 1,
    perPageCount: 16
  }
}
