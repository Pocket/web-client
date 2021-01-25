import { css } from 'linaria'
import { Trans } from 'react-i18next'

const tagErrorWrapper = css`
  background: #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  left: 0;
  margin-top: 0.7em;
  padding: 0.5em 0.7em;
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
    ? <Trans>Tags are limited to 25 characters</Trans>
    : <Trans>Please enter a valid email address</Trans>

  return <div className={tagErrorWrapper}>{msg}</div>
}
