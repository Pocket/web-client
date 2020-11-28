// @refresh reset
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'components/side-nav/side-nav'
import { MyListHeader } from 'components/headers/my-list-header'

export default function TagsPage(props) {
  const { metaData = {}, subset = 'active', filter } = props
  // const dispatch = useDispatch()
  const router = useRouter()
  const { slug: tag } = router.query

  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset={subset} isLoggedIn={isLoggedIn} />

      {shouldRender ? (
        <main className="main">
          <MyListHeader subset={tag} filter={filter} />
        </main>
      ) : null}
    </Layout>
  )
}
