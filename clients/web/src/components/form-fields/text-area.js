import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'
import TextareaAutosize from 'react-textarea-autosize'
import InputWrapper from './input-wrapper'
export const DEFAULT_INITIAL_ROWS = 3
export const DEFAULT_MAX_ROWS = 5
export const DEFAULT_CHAR_LIMIT = 1000
const defaultTextareaStyles = css`
  resize: none;
`

export const TextArea = ({
  autoFocus,
  name,
  labelText,
  textareaStyles,
  initialRows = DEFAULT_INITIAL_ROWS,
  maxRows = DEFAULT_MAX_ROWS,
  characterLimit = DEFAULT_CHAR_LIMIT,
  showCharacterLimit = false,
  helperText = null,
  value = '',
  error = null,
  displayErrorInline = false,
  className = null,
  disabled = false,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {}
}) => (
  <InputWrapper
    labelText={labelText}
    helperText={helperText}
    error={error}
    displayErrorInline={displayErrorInline}
    className={className}
    disabled={disabled}
    name={name}
    showCharacterLimit={showCharacterLimit}
    characterLimit={characterLimit}
    value={value}>
    <TextareaAutosize
      autoFocus={autoFocus}
      className={cx(defaultTextareaStyles, textareaStyles && textareaStyles)}
      name={name}
      rows={initialRows}
      maxRows={maxRows}
      value={value}
      disabled={disabled}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength={characterLimit}
      data-testid="textarea-input"
    />
  </InputWrapper>
)

TextArea.propTypes = {
  /**
   * Name attribute to use with the text input
   */
  name: PropTypes.string.isRequired,

  /**
   * Visible rows in textarea
   */
  initialRows: PropTypes.number,

  /**
   * Max number of rows before stop autoresizing, and start overflow scroll
   */
  maxRows: PropTypes.number,

  /**
   * Character count permitted
   */
  characterLimit: PropTypes.number,

  /**
   * Whether the character count will be shown as the helper text
   */
  showCharacterLimit: PropTypes.bool,

  /**
   * Label for the input. Required for accessibility purposes.
   */
  labelText: PropTypes.string.isRequired,

  /**
   * Helper text to display below the text input
   */
  helperText: PropTypes.string,

  /**
   * Current value of the input. Should be controlled by state in the parent form.
   */
  value: PropTypes.string,

  /**
   * If truthy, will apply an error visual state to the input. Pass a string value
   * to display as an error message below the input, which will take precedence
   * over any helperText.
   */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * Set to true to have the error message display inline below the text input, meaning
   * that it will take space in the layout and push other content below it, when
   * it appears.
   */
  displayErrorInline: PropTypes.bool,

  /**
   * CSS class name to apply to the containing div
   */
  className: PropTypes.string,

  /**
   * If true, will apply a disabled visual state and the input will not allow
   * user interaction.
   */
  disabled: PropTypes.bool,

  /**
   * Called when the input value changes
   */
  onChange: PropTypes.func,

  /**
   * Called when the user focuses the input
   */
  onFocus: PropTypes.func,

  /**
   * Called when the user blurs the input
   */
  onBlur: PropTypes.func
}

export default TextArea
