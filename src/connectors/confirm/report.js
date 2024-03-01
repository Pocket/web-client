import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { itemReportConfirm } from 'connectors/items/mutation-report.state'
import { itemReportCancel } from 'connectors/items/mutation-report.state'
import { ReportForm } from 'components/report-form/report-form'
import { useTranslation, Trans } from 'next-i18next'

const OTHER_FIELD_CHAR_LIMIT = 500

export const ConfirmReport = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [reason, updateReason] = useState(null)
  const [otherText, updateOtherText] = useState('')
  const [errorCode, updateErrorCode] = useState(null)
  const [success, updateSubmitSuccess] = useState(false)

  const id = useSelector((state) => state.mutationReport)
  const item = useSelector((state) => state.itemsDisplay[id])

  const showModal = !!item

  const handleClose = () => dispatch(itemReportCancel())
  const handleRadioChange = (event) => updateReason(event.target.value)
  const handleTextAreaChange = (event) => {
    event.preventDefault()
    const newOtherValue = event.target.value
    updateOtherText(newOtherValue)
    if (errorCode && !hasError()) updateErrorCode(null)
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
    const empty = otherText.trim().length === 0
    const tooLong = otherText.trim().length > OTHER_FIELD_CHAR_LIMIT

    if (isOther && (empty || tooLong)) {
      if (empty) updateErrorCode('empty')
      if (tooLong) updateErrorCode('tooLong')
      return true
    }

    return false
  }

  const confirmReport = () => {
    if (hasError()) return
    const { analyticsData } = item
    const data = { ...analyticsData, reason, otherText }
    dispatch(itemReportConfirm(data))
    updateSubmitSuccess(true)
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
  const errorMessage = errors[errorCode]
  const submitDisabled = reason === null || (reason === 'other' && otherText === '')

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
          otherErrorMessage={errorMessage}
        />
      </ModalBody>
      {success ? null : (
        <ModalFooter>
          <button
            className="primary"
            disabled={submitDisabled}
            type="submit"
            data-testid="submit-report-feedback"
            onClick={confirmReport}>
            <Trans i18nKey="confirm:report-feedback">Report Feedback</Trans>
          </button>
        </ModalFooter>
      )}
    </Modal>
  ) : null
}
