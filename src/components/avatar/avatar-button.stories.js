import React from 'react'
import { text } from '@storybook/addon-knobs'
import defineKnobs from 'helpers/define-knobs'
import { AvatarButton } from './avatar-button'

const avatarKnobs = defineKnobs((props) => {
  return {
    src: text('src', props.src),
    size: text('size', props.size),
    label: text('label', props.label),
  }
})

export default {
  title: 'Components/Avatar/AvatarButton',
  component: AvatarButton,
  decorators: [avatarKnobs],
}

export const defaultAvatar = () => (
  <AvatarButton size="40px" label="Your Account" />
)

export const imageAvatar = () => (
  <AvatarButton
    src="http://placekitten.com/150/150"
    size="40px"
    label="Your Account"
  />
)
