import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListContent } from 'containers/lists/list-individual/content'
import { ListReorder } from 'containers/lists/list-individual/reorder'
import { getIndividualListAction } from 'containers/lists/lists.state'
import { ListSettingsModal } from 'connectors/confirm/list-settings'
import { CreateListModal } from 'connectors/confirm/create-list'
import { AddListItemNote } from 'connectors/confirm/list-item-note-add'
import { EditListItemNote } from 'connectors/confirm/list-item-note-edit'
import { ConfirmNoteDelete } from 'connectors/confirm/delete-note'
import { ConfirmShare } from 'connectors/confirm/share-list'
import { Toasts } from 'connectors/toasts/toast-list'
import { appSetMode } from 'connectors/app/app.state'

export const ListIndividual = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug: id } = router.query

  const [reorder, setReorder] = useState(false)

  const enrolledFetched = useSelector((state) => state.pageListsInfo.enrolledFetched)

  useEffect(() => {
    dispatch(getIndividualListAction(id))
  }, [dispatch, id])

  const toggleSort = (shouldReorder) => {
    const mode = shouldReorder ? 'reorder' : 'default'
    setReorder(shouldReorder)
    dispatch(appSetMode(mode))
  }

  const Content = reorder ? ListReorder : ListContent

  if (!enrolledFetched) return null

  return (
    <>
      <Layout>
        <SideNav type="saves" tag={id} />
        <Content id={id} toggleSort={toggleSort} />
      </Layout>

      <ListSettingsModal id={id} />
      <AddListItemNote />
      <EditListItemNote />
      <CreateListModal />
      <ConfirmNoteDelete />
      <ConfirmShare snowplowId="shareable-list" />
      <Toasts />
    </>
  )
}
