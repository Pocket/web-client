import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CreateEditShareableList } from 'components/shareable-lists/create-edit-modal'
import { mutateListConfirm } from 'connectors/lists/mutation-create.state'
import { mutateListCancel } from 'connectors/lists/mutation-create.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { existsInArray } from 'common/utilities/object-array/object-array'

export const CreateListModal = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)

  const showModal = useSelector((state) => state.mutationListCreate.open)
  const id = useSelector((state) => state.mutationListCreate.id)
  const titleToIdList = useSelector((state) => state.pageListsInfo.titleToIdList)

  const titleList = titleToIdList ? Object.keys(titleToIdList) : []

  const handleClose = () => {
    dispatch(mutateListCancel())
    dispatch(sendSnowplowEvent('shareable-list.create.cancel'))
    setError(null)
  }

  const handleSubmit = (title, description) => {
    if (existsInArray(titleList, title)) return setError('List name has already been used.')

    dispatch(mutateListConfirm({ title, description }))
    dispatch(sendSnowplowEvent('shareable-list.create.submit'))
    setError(null)
  }

  const createList = (id) ? 'Create list with item' : 'Create list'

  return showModal ? (
    <CreateEditShareableList
      showModal={showModal}
      modalTitle={createList}
      modalSubmit={'Create List'}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      error={error}
    />
  ) : null
}
