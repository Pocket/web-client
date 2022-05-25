import { useState, useEffect } from 'react'
import { css, cx } from 'linaria'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { Button } from '@pocket/web-ui'
import { DeleteIcon } from '@pocket/web-ui'
import { Trans, useTranslation } from 'next-i18next'
import { highlightStyles } from 'components/reader/styles'

const modalBodyStyles = css`
  .highlight {
    display: inline;
  }

  textarea {
    margin-top: 1rem;
    max-width: 100%;
  }
`

const deleteButtonStyles = css`
  width: 100%;

  button {
    margin-left: 0;
    font-size: 1.15rem;
  }
`

export const AnnotateItemModal = ({
  showModal,
  closeModal,
  id,
  quote,
  note = {},
  saveAnnotation,
  deleteAnnotation
}) => {
  const appRootSelector = '#__next'
  const { t } = useTranslation()

  const [input, setInput] = useState('')

  useEffect(() => {
    if (showModal) setInput(note?.text)
  }, [showModal])

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSave = () => {
    saveAnnotation({ id, input })
  }

  const handleDelete = () => {
    deleteAnnotation({ id })
  }

  return (
    <Modal
      title="Edit Annotation"
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel="Edit Annotation"
      handleClose={closeModal}>
      <ModalBody className={cx(highlightStyles, modalBodyStyles)}>
        <span className="highlight">{quote}</span>
        <textarea value={input} onChange={handleChange}/>
      </ModalBody>
      <ModalFooter>
        <div className={deleteButtonStyles}>
          <Button
            variant="brand"
            aria-label={t('annotations:delete', 'Delete annotation')}
            data-cy="delete-annotation"
            onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </div>
        <Button variant="secondary" onClick={closeModal}>
          <Trans i18nKey="annotations:cancel">Cancel</Trans>
        </Button>
        <Button type="submit" onClick={handleSave}>
          <Trans i18nKey="annotations:save">Save</Trans>
        </Button>
      </ModalFooter>
    </Modal>
  )
}
