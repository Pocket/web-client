import { css } from 'linaria'

const tagErrorWrapper = css`
  background: #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  left: 0;
  margin-top: 0.7em;
  padding: 0.5em 0.7em;
  // position: absolute;
  font-family: 'Graphik Web';
  top: 100%;
  width: 100%;
  z-index: var(--zIndexTooltip);
  & > div {
    transition: width 0.1s linear;
  }
`

export const TagError = ({ email }) => {
  const msg = !email
    ? 'Tags are limited to 25 characters' //translate('tagging.errors.characterLimit')
    : 'Please enter a valid email address' //translate('tagging.errors.validEmail')

  return <div className={tagErrorWrapper}>{msg}</div>
}
