import { css } from 'linaria'
import { Avatar } from './avatar'
import { Button } from '@pocket/web-ui'

const profileStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const Profile = ({
  avatarSrc,
  onChangePhoto,
  onChangeFirstName,
  onChangeLastName,
  onChangeBio,
  firstName,
  lastName,
  userName,
  bio
}) => {
  return (
    <section className={profileStyle}>
      <h2>Profile Information</h2>

      <div className="sectionBody profileBody">
        <Avatar avatarSrc={avatarSrc} onChangePhoto={onChangePhoto} />
        <label htmlFor="firstname">First name</label>
        <input type="text" name="firstname" value={firstName} onChange={onChangeFirstName} />
        <label htmlFor="lastname">Last name</label>
        <input type="text" name="lastname" value={lastName} onChange={onChangeLastName} />
        <label htmlFor="bio">Profile bio</label>
        <input
          type="text"
          name="bio"
          value={bio}
          onChange={onChangeBio}
          placeholder="There is only one you..."
        />
        <label htmlFor="username">Username</label>
        <div className="contentDisplay">@{userName}</div>

        <div className="actionBlock">
          <Button variant="primary" className="action">
            Change Username
          </Button>
          <Button variant="primary" className="action">
            Change Password
          </Button>
        </div>
      </div>
    </section>
  )
}
