import React from 'react'
import { text, radios, boolean } from '@storybook/addon-knobs'
import defineKnobs from 'helpers/define-knobs'
import Button from './button'

const buttonKnobs = defineKnobs((props) => {
  return {
    variant: radios(
      'variant',
      {
        primary: 'primary',
        secondary: 'secondary',
        brand: 'brand',
        inline: 'inline',
      },
      props.variant
    ),
    size: radios(
      'size',
      {
        large: 'large',
        normal: 'normal',
        small: 'small',
      },
      props.size
    ),
    disabled: boolean('disabled', props.disabled),
    children: text('text', props.children),
    href: text('href', props.href),
  }
})

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [buttonKnobs],
}

export const primary = () => <Button>Primary Button</Button>

export const secondary = () => (
  <Button variant="secondary">Secondary Button</Button>
)

export const brand = () => <Button variant="brand">Brand Button</Button>

export const inline = () => (
  <Button variant="inline">Inline Buttons mimic text links.</Button>
)

export const large = () => <Button size="large">Large Button</Button>

export const small = () => <Button size="small">Small Button</Button>

export const disabled = () => <Button disabled>Disabled Button</Button>
