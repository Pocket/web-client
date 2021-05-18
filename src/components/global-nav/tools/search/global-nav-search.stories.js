import React from 'react'
import GlobalNavSearch from './global-nav-search'

export default {
  title: 'GlobalNav/GlobalNavSearch',
  component: GlobalNavSearch
}

const baseProps = {
  onSubmit: () => {}
}

export const globalNavSearch = () => <GlobalNavSearch {...baseProps} />
export const globalNavSearchNoCloseIcon = () => <GlobalNavSearch {...baseProps} onClose={null} />
