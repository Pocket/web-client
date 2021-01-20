import { css, cx } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import { Trans } from 'react-i18next'

const tabAction = css`
  width: 100%;
  border-radius: 0;
  text-align: center;
  font-weight: 400;
  padding: var(--size075) 0;
  border-right: var(--dividerStyle);
  border-bottom: var(--dividerStyle);
  transition: none;

  &:last-of-type {
    border-right: none;
  }
  &:hover,
  &:active {
    background-color: var(--color-navCurrentTab);
    color: initial;
  }

  &.active {
    border-bottom-color: var(--color-popoverCanvas);
    &:hover,
    &:active {
      cursor: initial;
      background-color: initial;
      color: initial;
    }
  }
`

export function SelectShareType({ active, activate }) {
  return (
    <div className="tabs">
      <ShareTypeTab active={active} activate={activate} tab="social">
        <Trans>Social Media</Trans>
      </ShareTypeTab>

      <ShareTypeTab active={active} activate={activate} tab="recommend">
        <Trans>Recommend</Trans>
      </ShareTypeTab>

      <ShareTypeTab active={active} activate={activate} tab="friend">
        <Trans>Send to Friend</Trans>
      </ShareTypeTab>
    </div>
  )
}

function ShareTypeTab({ active, activate, tab, children }) {
  const onClick = () => activate(tab)
  const isActive = active === tab
  return (
    <button
      onClick={onClick}
      className={cx(buttonReset, tabAction, isActive ? 'active' : null)}>
      {children}
    </button>
  )
}
