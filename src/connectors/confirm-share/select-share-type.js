import { css, cx } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'

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
        Social Media
      </ShareTypeTab>

      <ShareTypeTab active={active} activate={activate} tab="recommend">
        Recommend
      </ShareTypeTab>

      <ShareTypeTab active={active} activate={activate} tab="friend">
        Send to Friend
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
