import React from 'react'
import { AvatarButton } from './avatar-button'

export default {
  title: 'Components/AvatarButton',
  component: AvatarButton
}

export const defaultAvatar = () => <AvatarButton size="40px" label="Your Account" />

export const imageAvatar = () => (
  <AvatarButton src="http://placekitten.com/150/150" size="40px" label="Your Account" />
)
