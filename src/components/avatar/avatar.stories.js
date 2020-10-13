import React from 'react'
import { text } from '@storybook/addon-knobs'
import defineKnobs from 'helpers/define-knobs'
import Avatar from './avatar'

const avatarKnobs = defineKnobs((props) => {
  return {
    src: text('src', props.src),
    size: text('size', props.size),
  }
})

export default {
  title: 'Components/Avatar/Avatar',
  component: Avatar,
  decorators: [avatarKnobs],
}

export const defaultAvatar = () => <Avatar size="100px" />

export const imageAvatar = () => (
  <Avatar src="http://placekitten.com/150/150" size="100px" />
)
