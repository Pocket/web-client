import { css } from 'linaria'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { cancelEditUserTag } from 'containers/my-list/tags-page/tags-page.state'
import { confirmEditUserTag } from 'containers/my-list/tags-page/tags-page.state'

const inputWrapper = css`
  input[type='text'] {
    max-width: initial;
  }
`

export const TagEditModal = () => {
  const dispatch = useDispatch()
  const router = useRouter()

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
      title="Edit Tag"
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel="Edit Tag"
      handleClose={cancelTagEdit}>
      <ModalBody>
        <div className={inputWrapper}>
          <input
            type="text"
            autoFocus={true}
            value={value}
            onChange={onChange}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <em className="footnote">
          Editing the tag "{tagToEdit}" will change it on all items. Are you
          sure you want to proceed?
        </em>
        <Button type="submit" onClick={confirmTagEdit}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  )
}
