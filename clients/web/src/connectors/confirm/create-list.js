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
  const ids = useSelector((state) => state.mutationListCreate.ids)
  const titleToIdList = useSelector((state) => state.pageListsInfo.titleToIdList)

  const titleList = titleToIdList ? Object.keys(titleToIdList) : []

  const handleClose = () => {
    dispatch(mutateListCancel())
    dispatch(sendSnowplowEvent('shareable-list.create.cancel'))
    setError(null)
  }

  const handleSubmit = (title, description) => {
    const errorText = t('list:dupe-collection-error', 'Collection name has already been used.')
    if (existsInArray(titleList, title)) return setError(errorText)

    const identifier = ids ? 'shareable-list.create.bulk.submit' : 'shareable-list.create.submit'

    dispatch(mutateListConfirm({ title, description }))
    dispatch(sendSnowplowEvent(identifier))
    setError(null)
  }

  const createList = id
    ? t('list:create-collection-with-item', 'Create collection with item')
    : t('list:create-collection', 'Create collection')

  return showModal ? (
    <CreateEditShareableList
      showModal={showModal}
      modalTitle={createList}
      modalSubmit={t('list:create-collection', 'Create Collection')}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      error={error}
    />
  ) : null
}
