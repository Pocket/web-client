import { css } from '@emotion/css'
import { Avatar } from './avatar'
import { useTranslation } from 'next-i18next'

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
  isFxa,
  onChangeUsername,
  onChangePassword,
  firstName,
  lastName,
  userName,
  bio
}) => {
  const { t } = useTranslation()
  return (
    <section className={profileStyle}>
      <h2 id="profile">{t('account:profile-header', 'Profile Information')}</h2>

      <div className="sectionBody profileBody">
        <Avatar avatarSrc={avatarSrc} onChangePhoto={onChangePhoto} />
        <label htmlFor="firstname">{t('account:profile-first-name', 'First name')}</label>
        <input type="text" name="firstname" value={firstName} onChange={onChangeFirstName} />
        <label htmlFor="lastname">{t('account:profile-last-name', 'Last name')}</label>
        <input type="text" name="lastname" value={lastName} onChange={onChangeLastName} />
        <label htmlFor="bio">{t('account:profile-bio', 'Profile bio')}</label>
        <input
          type="text"
          name="bio"
          value={bio}
          onChange={onChangeBio}
          placeholder={t('account:profile-bio-placeholder', 'There is only one you...')}
        />
        <label htmlFor="username">{t('account:profile-username', 'Username')}</label>
        <div className="contentDisplay">@{userName}</div>
        {isFxa ? null : (
          <div className="actionBlock">
            <button className="primary action" onClick={onChangeUsername}>
              {t('account:profile-change-username', 'Change Username')}
            </button>
            <button className="primary action" onClick={onChangePassword}>
              {t('account:profile-chage-password', 'Change Password')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
