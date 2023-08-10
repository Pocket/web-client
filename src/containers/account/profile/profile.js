import { useSelector, useDispatch } from 'react-redux'
import { enforceDefaultAvatar } from 'common/utilities/account/avatar'
import { updateFirstName } from './profile.state'
import { updateLastName } from './profile.state'
import { updateBio } from './profile.state'
import { updateAvatar } from './profile.state'
import { updatePassword } from './profile.state'
import { updateUsername } from './profile.state'
import { Profile as ProfileComponent } from 'components/account/profile/profile'

import { AvatarModal } from 'containers/account/profile/confirm-avatar'
import { PasswordModal } from 'containers/account/profile/confirm-password'
import { UsernameModal } from 'containers/account/profile/confirm-username'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Profile = () => {
  const dispatch = useDispatch()

  // Profile content
  const retrievedAvatar = useSelector((state) => state?.userProfile?.avatar_url)
  const firstName = useSelector((state) => state?.userProfile?.first_name)
  const lastName = useSelector((state) => state?.userProfile?.last_name)
  const userName = useSelector((state) => state?.userProfile?.username)
  const bio = useSelector((state) => state?.userProfile?.description) || ''
  const featureState = useSelector((state) => state.features)
  const avatarSrc = enforceDefaultAvatar(retrievedAvatar)

  const onChangePhoto = () => dispatch(updateAvatar())

  const onChangeFirstName = (event) => dispatch(updateFirstName(event.target.value))
  const onChangeLastName = (event) => dispatch(updateLastName(event.target.value))
  const onChangeBio = (event) => dispatch(updateBio(event.target.value))

  const onChangeUsername = () => dispatch(updateUsername())
  const onChangePassword = () => dispatch(updatePassword())

  const isFxa = featureFlagActive({ flag: 'fxa', featureState })
  return (
    <>
      <ProfileComponent
        onChangePhoto={onChangePhoto}
        onChangeFirstName={onChangeFirstName}
        onChangeLastName={onChangeLastName}
        onChangeBio={onChangeBio}
        onChangeUsername={onChangeUsername}
        onChangePassword={onChangePassword}
        avatarSrc={avatarSrc}
        firstName={firstName}
        lastName={lastName}
        userName={userName}
        bio={bio}
        isFxa={isFxa}
      />
      <AvatarModal />
      <PasswordModal />
      <UsernameModal />
    </>
  )
}
