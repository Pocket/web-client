import { css } from '@emotion/css'
import { TextArea } from 'components/form-fields/text-area'
import PropTypes from 'prop-types'

const OTHER_FIELD_CHAR_LIMIT = 500

const formStyles = css`
  label {
    display: block;
  }
  padding: var(--size150);
  .other-reason {
    margin: var(--spacing100) 0 var(--spacing075);
    max-width: inherit;
  }
  .footer button {
    margin-left: var(--spacing050);
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

export function ReportForm({
  success,
  reasons,
  currentReason,
  otherText,
  otherErrorMessage,
  handleRadioChange = () => {},
  handleTextAreaChange = () => {}
}) {
  return success ? (
    <p className={successStyles}>
      <strong>Report received.</strong> Thanks! Your feedback helps us keep the Pocket community
      safe.
    </p>
  ) : (
    <form className={formStyles}>
      {reasons.map(({ id, label }) => (
        <label key={id}>
          <input
            type="radio"
            name="reason"
            value={id}
            id={id}
            data-testid={id}
            onChange={handleRadioChange}
            checked={currentReason === id}
          />
          {label}
        </label>
      ))}
      {currentReason !== 'other' ? null : (
        <TextArea
          name="other-reason"
          labelText="Tell us more"
          value={otherText}
          onChange={handleTextAreaChange}
          className="other-reason"
          initialRows={4}
          maxRows={4}
          error={otherErrorMessage}
          characterLimit={OTHER_FIELD_CHAR_LIMIT}
          showCharacterLimit={true}
        />
      )}
    </form>
  )
}

ReportForm.propTypes = {
  reasons: PropTypes.arrayOf(PropTypes.object).isRequired,
  success: PropTypes.bool,
  otherText: PropTypes.string,
  otherErrorMessage: PropTypes.string,
  currentReason: PropTypes.string,
  handleRadioChange: PropTypes.func,
  handleTextAreaChange: PropTypes.func
}
