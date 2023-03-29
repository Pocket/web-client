import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CreateEditShareableList } from 'components/shareable-lists/create-edit-modal'
import { mutateListUpdateCancel } from 'connectors/lists/mutation-update.state'
import { mutateListUpdateConfirm } from 'connectors/lists/mutation-update.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { getIndividualListAction } from 'containers/lists/list-individual/list-individual.state'

export const ListSettingsModal = ({ id }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)

  const enrolled = useSelector((state) => state.pageListsInfo.enrolled)
  const list = useSelector((state) => state.listsDisplay[id])
  const showModal = useSelector((state) => state.mutationlistUpdate.open)
  const titleToIdList = useSelector((state) => state.pageListsInfo.titleToIdList)

  const titleList = titleToIdList ? Object.keys(titleToIdList) : []

  const { title, description, analyticsData } = list

  useEffect(() => {
    if (enrolled) dispatch(getIndividualListAction(id))
  }, [dispatch, enrolled, id, title, description])

  const handleClose = () => {
    dispatch(mutateListUpdateCancel())
    dispatch(sendSnowplowEvent('shareable-list.edit-settings.cancel', analyticsData))
    setError(null)
  }

  const handleSubmit = (listNameValue, descriptionValue) => {
    if (titleList.includes(listNameValue) && listNameValue !== title) {
      return setError('List name has already been used.')
    }

    const data = {
      title: listNameValue,
      description: descriptionValue
    }
    dispatch(mutateListUpdateConfirm(data))
    dispatch(sendSnowplowEvent('shareable-list.edit-settings.submit', analyticsData))
  }

  return showModal ? (
    <CreateEditShareableList
      showModal={showModal}
      modalTitle="List Settings"
      modalSubmit="Save Changes"
      listName={title}
      listDescription={description}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      error={error}
    />
  ) : null
}
