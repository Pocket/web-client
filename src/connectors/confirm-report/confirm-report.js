import { Modal, ModalBody, ModalFooter, Button, TextArea } from '@pocket/web-ui'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { itemReportConfirm } from 'connectors/items-by-id/discover/items.report'
import { itemReportCancel } from 'connectors/items-by-id/discover/items.report'
import { ReportForm } from 'components/report-form/report-form'
import { useTranslation, Trans } from 'next-i18next'

const OTHER_FIELD_CHAR_LIMIT = 500

export const ReportFeedbackModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [reason, updateReason] = useState(null)
  const [otherText, updateOtherText] = useState('')
  const [errorCode, updateErrorCode] = useState(null)
  const [success, updateSubmitSuccess] = useState(false)

  const id = useSelector((state) => state.itemToReport)
  const item = useSelector((state) => state.discoverItemsById[id])

  const showModal = item

  const handleClose = dispatch(itemReportCancel())
  const handleRadioChange = (event) => updateReason(event.target.value)
  const handleTextAreaChange = (event) => {
    const newOtherValue = event.target.value
    updateOtherText(newOtherValue)
    if (!hasError()) updateErrorCode(null)
  }
  const handleAfterClose = () => {
    // clean up state
    updateReason(null)
    updateOtherText('')
    updateErrorCode(null)
    updateSubmitSuccess(false)
  }

  const hasError = () => {
    const isOther = reason === 'other'
    const empty = !otherText || !otherText.trim()
    const tooLong = otherText.trim().length > OTHER_FIELD_CHAR_LIMIT

    if (isOther) {
      if (empty) updateErrorCode('empty')
      if (tooLong) updateErrorCode('tooLong')
      return true
    }

    return false
  }

  const confirmReport = () => {
    if (hasError()) return
    const { save_url, item_id } = item
    dispatch(itemReportConfirm({ reason, otherText, save_url, item_id }))
  }

  const reasons = [
    { id: 'broken_meta', label: t('confirm:broken_meta', 'The title, link, or image is broken') },
    { id: 'wrong_category', label: t('confirm:wrong_category', 'It’s in the wrong category') },
    { id: 'sexually_explicit', label: t('confirm:sexually_explicit', 'It’s sexually explicit') },
    { id: 'offensive', label: t('confirm:offensive', 'It’s rude, vulgar, or offensive') },
    { id: 'misinformation', label: t('confirm:misinformation', 'It contains misinformation') },
    { id: 'other', label: t('confirm:other', 'Other') }
  ]

  const errors = {
    empty: t('confirm:report-other-empty', '"Other" text cannot be empty'),
    tooLong: t('confirm:report-other-too-long', '"Other" text exceeds character limit')
  }

  const title = t('confirm:report-title', 'Report a Concern')
  const readerLabel = t('confirm:report-label', 'Request Feedback Modal')

  return item ? (
    <Modal
      appRootSelector="#__next"
      title={title}
      screenReaderLabel={readerLabel}
      isOpen={showModal}
      handleClose={handleClose}
      onAfterClose={handleAfterClose}>
      <ModalBody>
        <ReportForm
          success={success}
          reasons={reasons}
          handleRadioChange={handleRadioChange}
          handleTextAreaChange={handleTextAreaChange}
          currentReason={reason}
          otherText={otherText}
          otherErrorMessage={errors[errorCode]}
        />
      </ModalBody>
      {success ? null : (
        <ModalFooter>
          <Button type="submit" onClick={confirmReport} autoFocus={true}>
            <Trans i18nKey="confirm:report-feedback">Report Feedback</Trans>
          </Button>
        </ModalFooter>
      )}
    </Modal>
  ) : null
}
