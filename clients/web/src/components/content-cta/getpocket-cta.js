// Component last used on 9/14/20 -- delete if stale
import { css } from '@emotion/css'
import { breakpointLargeHandset } from 'common/constants'
import { Trans } from 'next-i18next'

const GetPocketLink = css`
  padding: var(--spacing100) 0 var(--spacing150);
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize100);
  font-weight: 500;
  color: var(--color-textPrimary);

  ${breakpointLargeHandset} {
    padding: var(--spacing150) 0 var(--spacing100);
    font-size: var(--fontSize100);
  }
`

export function GetPocketCTA() {
  return (
    <aside className={GetPocketLink}>
      <Trans i18nKey="discover:pocket-cta">
        Discover more great stories — get{' '}
        <a
          target="pocket-signup"
          href="https://getpocket.com/?utm_source=syndarticles&utm_medium=web">
          Pocket
        </a>
        .
      </Trans>
    </aside>
  )
}
