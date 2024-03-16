import { css, cx } from '@emotion/css'
import { buttonReset } from 'components/buttons/button-reset'
import { Trans } from 'next-i18next'

const tabAction = css`
  button {
    width: 100%;
    border-radius: 0;
    text-align: center;
    font-weight: 400;
    padding: 12px 0;
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
    &:focus {
      transition: none;
      color: var(--color-navCurrentTabText);
      outline: 1px auto var(--color-navCurrentTab);
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
  }
`

export function SelectShareType({ active, activate }) {
  return (
    <div className={cx(tabAction, 'tabs')}>
      <ShareTypeTab active={active} activate={activate} tab="social">
        <Trans i18nKey="share:social-media">Social Media</Trans>
      </ShareTypeTab>

      <ShareTypeTab active={active} activate={activate} tab="recommend">
        <Trans i18nKey="share:recommend">Recommend</Trans>
      </ShareTypeTab>
    </div>
  )
}

function ShareTypeTab({ active, activate, tab, children }) {
  const onClick = () => activate(tab)
  const isActive = active === tab
  return (
    <button
      data-testid={`share-tab-${tab}`}
      onClick={onClick}
      className={cx(buttonReset, isActive ? 'active' : null)}>
      {children}
    </button>
  )
}
