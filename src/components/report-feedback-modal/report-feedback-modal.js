import { Modal, ModalBody, ModalFooter, Button, TextArea } from '@pocket/web-ui'
import React, { useState } from 'react'
import { css } from 'linaria'
import { useSelector } from 'react-redux'
import { sendReportToSnowplow } from './report-feedback-modal.analytics'

const OTHER_FIELD_CHAR_LIMIT = 500

const formStyles = css`
  padding: var(--size150);
`

const footerStyles = css`
  button {
    margin-left: var(--spacing050);
  }
`

const standardReasons = [
  {
    id: 'broken_meta',
    label: 'The title, link, or image is broken'
  },
  {
    id: 'wrong_category',
    label: 'It’s in the wrong category'
  },
  {
    id: 'sexually_explicit',
    label: 'It’s sexually explicit'
  },
  {
    id: 'offensive',
    label: 'It’s rude, vulgar, or offensive'
  },
  {
    id: 'misinformation',
    label: 'It contains misinformation'
  }
]

const otherFieldStyles = css`
  margin: var(--spacing100) 0 var(--spacing075);
  &,
  & textarea {
    max-width: inherit;
  }
`

const successStyles = css`
  font-size: var(--fontSize100);
  line-height: 150%;
  padding: var(--spacing100) 0;
  margin: 0;

  strong {
    font-weight: 600;
  }
`
const SuccessState = () => (
  <ModalBody>
    <p className={successStyles}>
      <strong>Report received.</strong> Thanks! Your feedback helps us keep the
      Pocket community safe.
    </p>
  </ModalBody>
)

const FormState = ({
  handleRadioChange,
  handleTextAreaChange,
  currentReason,
  otherText,
  otherErrorMessage,
  setModalOpen,
  handleFormSubmit
}) => (
  <>
    <form className={formStyles}>
      {standardReasons.map(({ id, label }) => (
        <div key={id}>
          <input
            type="radio"
            name="reason"
            value={id}
            id={id}
            onChange={handleRadioChange}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
      <div>
        <input
          type="radio"
          name="reason"
          value="other"
          id="other"
          onChange={handleRadioChange}
        />
        <label htmlFor="other">Other</label>
      </div>
      {currentReason !== 'other' ? null : (
        <TextArea
          name="other-reason"
          labelText="Tell us more"
          value={otherText}
          onChange={handleTextAreaChange}
          className={otherFieldStyles}
          initialRows={4}
          maxRows={4}
          error={otherErrorMessage}
          characterLimit={OTHER_FIELD_CHAR_LIMIT}
          showCharacterLimit={true}
        />
      )}
    </form>
    <ModalFooter className={footerStyles}>
      <Button variant="secondary" onClick={() => setModalOpen(false)}>
        Cancel
      </Button>
      <Button
        type="submit"
        onClick={handleFormSubmit}
        disabled={
          currentReason === null ||
          (currentReason === 'other' && otherText.length === 0)
        }>
        Report
      </Button>
    </ModalFooter>
  </>
)

const ReportFeedbackModal = ({
  isOpen,
  setModalOpen,
  itemToReport,
  resetItem
}) => {
  const [currentReason, updateReason] = useState(null)
  const [otherText, updateOtherText] = useState('')
  const [otherErrorMessage, updateOtherErrorMessage] = useState(null)
  const [isSuccessfullySubmitted, updateSubmitSuccess] = useState(false)

  const user = useSelector((state) => state.user)

  const handleRadioChange = (event) => {
    updateReason(event.target.value)
  }
  const handleTextAreaChange = (event) => {
    const newOtherValue = event.target.value
    updateOtherText(newOtherValue)

    if (
      otherErrorMessage &&
      isDataValid({
        ...getReportFeedbackData(),
        otherText: newOtherValue
      })
    ) {
      updateOtherErrorMessage(null)
    }
  }
  const handleAfterClose = () => {
    // clean up state
    updateReason(null)
    updateOtherText('')
    updateOtherErrorMessage(null)
    updateSubmitSuccess(false)
    resetItem()
  }
  const getReportFeedbackData = () => ({
    reason: currentReason,
    otherText: currentReason === 'other' ? otherText : null
  })

  const isDataValid = ({ reason, otherText }) => {
    if (reason === 'other' && !otherText) {
      updateOtherErrorMessage(`'Other' text is required'`)
      return false
    }
    if (reason === 'other' && !otherText.trim()) {
      updateOtherErrorMessage(`'Other' text cannot be empty`)
      return false
    }
    if (
      reason === 'other' &&
      otherText.trim().length > OTHER_FIELD_CHAR_LIMIT
    ) {
      updateOtherErrorMessage(`'Other' text exceeds character limit`)
      return false
    }

    return true
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    // assemble data
    const reportData = getReportFeedbackData()

    if (!isDataValid(reportData)) return

    sendReportToSnowplow(reportData, user, itemToReport)

    updateSubmitSuccess(true)
  }

  return (
    <Modal
      appRootSelector="#__next"
      title="Report a Concern"
      screenReaderLabel="Request Feedback Modal"
      isOpen={isOpen}
      handleClose={() => setModalOpen(false)}
      onAfterClose={handleAfterClose}>
      {isSuccessfullySubmitted ? (
        <SuccessState />
      ) : (
        <FormState
          handleRadioChange={handleRadioChange}
          handleTextAreaChange={handleTextAreaChange}
          currentReason={currentReason}
          otherText={otherText}
          otherErrorMessage={otherErrorMessage}
          setModalOpen={setModalOpen}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </Modal>
  )
}

export default ReportFeedbackModal
