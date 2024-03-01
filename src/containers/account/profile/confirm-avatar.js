import { useState } from 'react'
import { css } from '@emotion/css'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { confirmAvatarUpdate } from './profile.state'
import { cancelAvatarUpdate } from './profile.state'
import { updateAvatarError } from './profile.state'
import { ChevronRightIcon } from 'components/icons/ChevronRightIcon'
import { AvatarPreview } from 'components/account/profile/avatar'
import { useTranslation } from 'next-i18next'

const avatarSelector = css`
  .display {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    .icon {
      width: 48px;
      height: 48px;
      color: var(--color-dividerSecondary);
    }
  }
  .errorText {
    display: block;
    text-align: center;
    padding: 1rem 0 0;
    color: var(--color-error);
    font-family: var(--fontSansSerif);
    font-size: 0.75rem;
    line-height: 1;
  }
`

const uploadStyles = css`
  .actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .inputLabel {
    display: inline-block;
    position: relative;
    font-family: var(--fontSansSerif);
    font-size: 1rem;
    line-height: 1.1;
    border: none;
    border-radius: 0.25rem;
    padding: 1rem;
    transition: all 0.15s ease-out;
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: 2px solid var(--color-actionSecondary);
    color: var(--color-actionSecondaryText);
    margin: 0;

    &:hover {
      background-color: var(--color-actionSecondaryHover);
      color: var(--color-actionSecondaryHoverText);
    }
  }

  input[type='file'] {
    display: none;
  }
`

export const AvatarModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const appRootSelector = '#__next'
  const showModal = useSelector((state) => state.userProfile?.updatingAvatar)
  const avatarError = useSelector((state) => state.userProfile?.updatingAvatarError)
  const retrievedAvatar = useSelector((state) => state?.userProfile?.avatar_url)
  const [imagePreview, setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState(false)

  const confirmAvatar = () => {
    const formData = new FormData()
    formData.append('image', imageFile)
    dispatch(confirmAvatarUpdate(formData))
    setImagePreview('')
  }

  const cancelAvatar = () => {
    setImagePreview('')
    return dispatch(cancelAvatarUpdate())
  }

  const onChange = (e) => {
    const file = Array.from(e.target.files)[0]
    const types = ['image/png', 'image/jpeg', 'image/gif']

    // Make sure we support the file type
    if (!types.includes(file.type)) {
      const fileErrorCopy = t(
        'account:avatar-error-file',
        "We don't support that file type: {{fileType}}",
        { fileType: file.type }
      )
      return dispatch(updateAvatarError(fileErrorCopy))
    }

    // Make sure the file isn't ridiculously big
    if (file.size > 2000000) {
      const sizeErrorCopy = t(
        'account:avatar-error-size',
        'The file you chose is too large. Please keep files size under 2Mb'
      )
      return dispatch(dispatch(updateAvatarError(sizeErrorCopy)))
    }

    dispatch(updateAvatarError(false))
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  return (
    <Modal
      title={t('account:change-avatar', 'Change Avatar')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('account:change-avatar', 'Change Avatar')}
      handleClose={cancelAvatar}>
      <ModalBody className={avatarSelector}>
        <div className="display">
          <AvatarPreview avatarSrc={retrievedAvatar} />
          <ChevronRightIcon />
          <AvatarPreview avatarSrc={imagePreview} />
        </div>
        {avatarError ? <span className="errorText">{avatarError}</span> : null}
      </ModalBody>
      <ModalFooter className={uploadStyles}>
        <div className="actions">
          <label htmlFor="file-upload" className="inputLabel">
            {t('account:choose-file', 'Choose file')}
            <input id="file-upload" type="file" onChange={onChange} />
          </label>
          <button
            className="primary"
            type="submit"
            data-testid="avatar-confirm"
            onClick={confirmAvatar}
            autoFocus={true}
            disabled={!imagePreview}>
            {t('account:save', 'Save')}
          </button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
