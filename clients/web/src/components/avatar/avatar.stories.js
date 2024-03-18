import React from 'react'
import Avatar from './avatar'

export default {
  title: 'Components/Avatar',
  component: Avatar
}

export const defaultAvatar = () => <Avatar size="100px" />

export const imageAvatar = () => <Avatar src="http://placekitten.com/150/150" size="100px" />
