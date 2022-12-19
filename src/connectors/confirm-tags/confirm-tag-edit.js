import { css } from 'linaria'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Button } from 'components/buttons/button'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { cancelEditUserTag } from 'containers/saves/lists/lists-page.state'
import { confirmEditUserTag } from 'containers/saves/lists/lists-page.state'
import { useTranslation, Trans } from 'next-i18next'

const inputWrapper = css`
  input[type='text'] {
    max-width: initial;
  }
`

export const TagEditModal = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const tagToEdit = useSelector((state) => state.userTags.tagToEdit)

  const [value, setValue] = useState('')
  const onChange = (event) => setValue(event.target.value)

  const showModal = tagToEdit !== false
  const confirmTagEdit = () => dispatch(confirmEditUserTag(tagToEdit, value, router)) // prettier-ignore
  const cancelTagEdit = () => dispatch(cancelEditUserTag())

  const appRootSelector = '#__next'

  useEffect(() => {
    setValue(tagToEdit)
  }, [tagToEdit])

  return (
    <Modal
      title={t('confirm:edit-tag', 'Edit Tag')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('confirm:edit-tag', 'Edit Tag')}
      handleClose={cancelTagEdit}>
      <ModalBody>
        <div className={inputWrapper}>
          <input
            type="text"
            data-cy="edit-tag-input"
            autoFocus={true}
            value={value}
            onChange={onChange}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <em className="footnote">
          <Trans i18nKey="confirm:edit-tag-copy" tagToEdit={tagToEdit}>
            Editing the tag <em>{{ tagToEdit }}</em> will change it on all items. Are you sure you
            want to proceed?
          </Trans>
        </em>
        <Button type="submit" data-cy="edit-tag-confirm" onClick={confirmTagEdit}>
          <Trans i18nKey="confirm:confirm">Confirm</Trans>
        </Button>
      </ModalFooter>
    </Modal>
  )
}
