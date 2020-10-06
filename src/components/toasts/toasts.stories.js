import React, { Component } from 'react'
import { ToastList } from './toast-list'
import { Toast } from './toast'
import Lorem from 'react-lorem-component'

import { API_ACTION_ADD } from 'actions'
import { API_ACTION_ARCHIVE } from 'actions'
import { API_ACTION_READD } from 'actions'
import { API_ACTION_DELETE } from 'actions'
import { API_ACTION_REPLACE_TAGS } from 'actions'
import { API_ACTION_ADD_TAGS } from 'actions'
import { API_ACTION_RECOMMEND } from 'actions'
import { API_ACTION_SHARE } from 'actions'
import { TOAST_ITEM_NOT_IN_LIST } from 'actions'

export default {
  title: 'Components/Toasts'
}


const types = ['neutral', 'success', 'warn']
const actions = [
  API_ACTION_ADD,
  API_ACTION_ARCHIVE,
  API_ACTION_READD,
  API_ACTION_DELETE,
  API_ACTION_REPLACE_TAGS,
  API_ACTION_ADD_TAGS,
  API_ACTION_RECOMMEND,
  API_ACTION_SHARE,
  TOAST_ITEM_NOT_IN_LIST
]

class ToastStories extends Component {
  state = { toasts: {} }

  componentDidMount = () => {
    this.addToast()
    this.interval = setInterval(this.addToast, 3500)
  }

  componentWillUnmount = () => {
    window.clearInterval(this.interval)
  }

  addToast = () => {
    this.setState(state => {
      const randToast = {
        type: types[Math.floor(Math.random() * types.length)],
        apiAction: actions[Math.floor(Math.random() * actions.length)]
      }

      return {
        toasts: {
          ...state.toasts,
          [Date.now()]: randToast
        }
      }
    })
  }

  removeToast = key => {
    this.setState(state => {
      // eslint-disable-next-line no-unused-vars
      const { [key]: deletedKey, ...toasts } = state.toasts
      return { ...state, toasts }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Lorem count={45} paragraphLowerBound={8} paragraphUpperBound={20} />

        <ToastList
          delay="5000"
          list={this.state.toasts}
          removeToast={this.removeToast}
        />
      </React.Fragment>
    )
  }
}

export const toastList = () => <ToastStories />

export const toastNuetral = () => (
  <Toast type={'nuetral'} delay={99999999}>
    Added to List
  </Toast>
)

export const toastWarn = () => (
  <Toast type={'warn'} delay={99999999}>
    Added to List
  </Toast>
)

export const toastSuccess = () => (
  <Toast type={'success'} delay={99999999}>
    Added to List
  </Toast>
)
