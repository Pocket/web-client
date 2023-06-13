import React, { useEffect, useCallback, useState } from 'react'
import DumbToast from 'components/toast/toast'

import { useDispatch } from 'react-redux'
import { clearToast } from './toast.state'
import { mutationUnDelete } from 'connectors/items/mutation-delete.state'

import { MUTATION_DELETE_SUCCESS } from 'actions'

export function Toast({
  stamp,
  type,
  ids,
  actionType,
  deletedItemPosition,
  itemCount: count = 1,
  previousStatus
}) {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const mount = () => setShow(true)
  const unmount = () => setShow(false)

  const remove = useCallback(() => dispatch(clearToast(stamp)), [stamp, dispatch])

  const showUndo = type === MUTATION_DELETE_SUCCESS && deletedItemPosition !== undefined

  useEffect(() => {
    if (!show) return () => {}
    const removeTime = showUndo ? 5000 : 3500
    const removeTimer = setTimeout(unmount, removeTime)
    return () => clearTimeout(removeTimer)
  }, [show, showUndo, remove])

  useEffect(() => {
    mount()
  }, [])

  const handleUndo = () => {
    dispatch(mutationUnDelete(ids, deletedItemPosition, previousStatus))
    remove()
  }

  return (
    <DumbToast
      actionType={actionType}
      count={count}
      type={type}
      show={show}
      remove={remove}
      showUndo={showUndo}
      handleUndo={handleUndo}
    />
  )
}
