import { css } from '@emotion/css'
import { Trans } from 'next-i18next'

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
  const msg = !email ? (
    <Trans i18nKey="tags:tags-character-limit">Tags are limited to 25 characters</Trans>
  ) : (
    <Trans i18nKey="common:please-enter-valid-email">Please enter a valid email address</Trans>
  )

  return <div className={tagErrorWrapper}>{msg}</div>
}
