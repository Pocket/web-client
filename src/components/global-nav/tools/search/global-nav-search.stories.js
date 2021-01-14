import React from 'react'
import { text } from '@storybook/addon-knobs'
import defineKnobs from 'helpers/define-knobs'
import GlobalNavSearch from './global-nav-search'

const globalNavSearchKnobs = defineKnobs((props) => {
  return {
    placeholder: text('placeholder', props.placeholder)
  }
})

export default {
  title: 'GlobalNav/GlobalNavSearch',
  component: GlobalNavSearch,
  decorators: [globalNavSearchKnobs]
}

const baseProps = {
  onSubmit: () => {}
}

export const globalNavSearch = () => <GlobalNavSearch {...baseProps} />
export const globalNavSearchNoCloseIcon = () => (
  <GlobalNavSearch {...baseProps} onClose={null} />
)
