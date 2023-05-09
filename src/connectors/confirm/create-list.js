import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CreateEditShareableList } from 'components/shareable-lists/create-edit-modal'
import { mutateListConfirm } from 'connectors/lists/mutation-create.state'
import { mutateListCancel } from 'connectors/lists/mutation-create.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { existsInArray } from 'common/utilities/object-array/object-array'
import { useTranslation } from 'next-i18next'

export const CreateListModal = () => {
  const { t } = useTranslation()
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
    const errorText = t('list:dupe-error', 'List name has already been used.')
    if (existsInArray(titleList, title)) return setError(errorText)

    dispatch(mutateListConfirm({ title, description }))
    dispatch(sendSnowplowEvent('shareable-list.create.submit'))
    setError(null)
  }

  const createList = id
    ? t('list:create-list-with-item', 'Create list with item')
    : t('list:create-list', 'Create list')

  return showModal ? (
    <CreateEditShareableList
      showModal={showModal}
      modalTitle={createList}
      modalSubmit={t('list:create-list', 'Create List')}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      error={error}
    />
  ) : null
}
