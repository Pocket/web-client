import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from 'containers/profile/profile.state'
import { getProfileItems } from 'connectors/items-by-id/profile/items.state'
import Layout from 'layouts/main'
import { Loader, LoaderCentered } from 'components/loader/loader'
import { ProfileHeader } from './header'
import { ProfileFeed } from './feed'

export default function Profile() {
  const dispatch = useDispatch()

  const router = useRouter()
  const { slug: id } = router.query

  const profileName = useSelector((state) => state.userProfile.name)
  const items = useSelector((state) => state.profileItemsByIds.items)

  useEffect(() => {
    dispatch(getProfile(id))
    dispatch(getProfileItems(id))
  }, [dispatch, id])

  return !profileName || items.length === 0 ? (
    <LoaderCentered>
      <Loader isVisible />
    </LoaderCentered>
  ) : (
    <Layout title={`${profileName} on Pocket`}>
      <ProfileHeader />
      <ProfileFeed items={items} />
    </Layout>
  )
}
