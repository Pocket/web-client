import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'containers/_error/error'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListContent } from 'containers/lists/list-individual/content'
import { ReorderList } from 'containers/lists/list-individual/reorder'
import { getIndividualListAction } from 'containers/lists/lists.state'
import { ListSettingsModal } from 'connectors/confirm/list-settings'
import { CreateListModal } from 'connectors/confirm/create-list'
import { ConfirmShare } from 'connectors/confirm/share-list'
import { Toasts } from 'connectors/toasts/toast-list'

export const ListIndividual = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug: id } = router.query

  const [reorder, setReorder] = useState(false)

  const enrolled = useSelector((state) => state.pageListsInfo.enrolled)
  const enrolledFetched = useSelector((state) => state.pageListsInfo.enrolledFetched)

  useEffect(() => {
    if (enrolled) dispatch(getIndividualListAction(id))
  }, [dispatch, id, enrolled])

  const toggleSort = () => setReorder(!reorder)

  const Content = reorder ? ReorderList : ListContent

  if (!enrolledFetched) return null
  if (enrolledFetched && !enrolled) return <ErrorPage statusCode={404} />

  return (
    <>
      <Layout>
        <SideNav type="saves" tag={id} />
        <Content id={id} toggleSort={toggleSort} />
      </Layout>

      <ListSettingsModal id={id} />
      <CreateListModal />
      <ConfirmShare snowplowId="shareable-list" />
      <Toasts />
    </>
  )
}
