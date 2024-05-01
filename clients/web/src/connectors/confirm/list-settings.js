import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CreateEditShareableList } from 'components/shareable-lists/create-edit-modal'
import { mutateListUpdateCancel } from 'connectors/lists/mutation-update.state'
import { mutateListUpdateConfirm } from 'connectors/lists/mutation-update.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { existsInArray } from 'common/utilities/object-array/object-array'
import { useTranslation } from 'next-i18next'

export const ListSettingsModal = ({ id }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const [error, setError] = useState(null)

  const list = useSelector((state) => state.listsDisplay[id])
  const showModal = useSelector((state) => state.mutationListUpdate.listSettingsOpen)
  const titleToIdList = useSelector((state) => state.pageListsInfo.titleToIdList)

  const titleList = titleToIdList ? Object.keys(titleToIdList) : []

  if (!list) return null
  const { title, description, analyticsData: passedAnalytics, listItemNoteVisibility } = list
  const analyticsData = {
    ...passedAnalytics,
    listItemNoteVisibility
  }

  const handleClose = () => {
    dispatch(mutateListUpdateCancel())
    dispatch(sendSnowplowEvent('shareable-list.edit-settings.cancel', analyticsData))
    setError(null)
  }

  const handleSubmit = (listNameValue, descriptionValue) => {
    if (existsInArray(titleList, listNameValue) && listNameValue !== title) {
      const errorText = t('list:dupe-error', 'List name has already been used.')
      return setError(errorText)
    }

    const data = {
      title: listNameValue,
      description: descriptionValue
    }
    dispatch(mutateListUpdateConfirm(data))
    dispatch(
      sendSnowplowEvent('shareable-list.edit-settings.submit', { ...analyticsData, ...data })
    )
  }

  return showModal ? (
    <CreateEditShareableList
      showModal={showModal}
      modalTitle={t('list:collection-settings', 'Collection Settings')}
      modalSubmit={t('list:save-changes', 'Save Changes')}
      listName={title}
      listDescription={description}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      error={error}
    />
  ) : null
}
