import React from 'react'
import { object, text } from '@storybook/addon-knobs'
import defineKnobs from 'helpers/define-knobs'
import GlobalNavLinks from './global-nav-links'

const globalNavLinksKnobs = defineKnobs((props) => {
  return {
    links: object('links', props.links),
    selectedLink: text('selectedLink', props.selectedLink || 'discover'),
  }
})

export default {
  title: 'Components/GlobalNav/GlobalNavLinks',
  component: GlobalNavLinks,
  decorators: [globalNavLinksKnobs],
}

export const standard = () => <GlobalNavLinks />
