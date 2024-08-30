import { Suspense } from 'react'

// Components
import { NavTopAccountProfile as Component } from '.'

// State
import { HydrateUserInfo } from '@common/state/user-info/hydrate'

// Types
import type { UserInfoState } from '@common/state/user-info'
import type { Meta, StoryFn, StoryObj } from '@storybook/react'

// Setting up required state
const state: UserInfoState = {
  pending: false,
  firstName: 'Jason',
  lastName: 'Mendoza',
  avatarUrl: 'https://i.pravatar.cc/150?img=11',
  id: 'abc123'
}
const withState = (Story: StoryFn) => {
  return (
    <>
      <HydrateUserInfo state={state} />
      <Suspense>
        <Story />
      </Suspense>
    </>
  )
}

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Nav - Top / Account - Profile',
  component: Component,
  decorators: [withState]
}
export default meta

// Stories
export const AccountProfile: StoryObj<typeof Component> = {
  render: () => {
    return <Component />
  },
  args: {}
}
