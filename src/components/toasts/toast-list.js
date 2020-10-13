import React, { Component } from 'react'
import { css } from 'linaria'
import { Toast } from './toast'

import { ITEMS_ADD_SUCCESS } from 'actions'
import { ITEMS_ADD_FAILURE } from 'actions'
import { ITEMS_ARCHIVE_SUCCESS } from 'actions'
// import { API_ACTION_READD } from 'actions'
import { ITEMS_DELETE_SUCCESS } from 'actions'
import { ITEMS_TAG_SUCCESS } from 'actions'
// import { API_ACTION_RECOMMEND } from 'actions'
// import { API_ACTION_SHARE } from 'actions'
import { TOAST_ITEM_NOT_IN_LIST } from 'actions'

const toastContainer = css`
  position: fixed;
  bottom: 30px;
  left: 45px;
  right: 0;
  width: 100%;
  z-index: var(--zIndexModal);
`

export class ToastList extends Component {
  getToastMessage(action, count) {
    switch (action) {
      case ITEMS_ADD_SUCCESS: {
        return "Saved to Pocket" //"toasts.addUrl"
      }

      case ITEMS_ADD_FAILURE: {
        return "Unable to Save" //"toasts.addUrlFailed"
      }

      case ITEMS_ARCHIVE_SUCCESS: {
        return "Archived" //"toasts.archive"
      }

      // case API_ACTION_READD: {
      //   return "Added to List" //"toasts.reAdd"
      // }

      case ITEMS_DELETE_SUCCESS: {
        return "Deleted" //"toasts.delete"
      }

      case ITEMS_TAG_SUCCESS: {
        if (count > 1) {
          return "Tag updated" //"toasts.tagAdded"
        }
        return "Tags updated" //"toasts.tagsAdded"
      }

      // case API_ACTION_SHARE: {
      //   return "Sent" //"toasts.sent"
      // }

      // case API_ACTION_RECOMMEND: {
      //   return "Sent" //"toasts.recommended"
      // }

      case TOAST_ITEM_NOT_IN_LIST: {
        return "This item cannot be found in your list" //"toasts.notInList"
      }

      default:
        break
    }
  }

  buildToast = (list, key) => {
    const message = this.getToastMessage(list[key].apiAction, list[key].length)
    const { removeToast, delay } = this.props
    return message ? (
      <Toast
        type={list[key].type}
        toastKey={key}
        key={key}
        delay={delay}
        removeToast={removeToast}
        remove={list[key].remove}>
        {message}
      </Toast>
    ) : null
  }

  render() {
    const { list } = this.props

    return (
      <div className={toastContainer}>
        {Object.keys(list)
          .reverse()
          .map(key => this.buildToast(list, key))}
      </div>
    )
  }
}
