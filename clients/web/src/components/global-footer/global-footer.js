import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { breakpointTinyHandset } from 'common/constants'
import { PageContainer } from 'components/page-container/page-container'
import { Trans, useTranslation } from 'next-i18next'
import { Languages } from 'connectors/languages/languages'

const footerStyle = css`
  background-color: var(--color-canvas);
  width: 100%;
  font-family: var(--fontSansSerif);
  color: var(--color-textPrimary);
  &.anchored {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;

    ${breakpointTinyTablet} {
      margin-top: 3rem;
      position: static;
    }
  }
  a {
    color: var(--color-textSecondary);
    text-decoration: none;

    &:hover {
      color: var(--color-textLinkHover);
    }
  }

  .footer-container {
    padding-top: 0;
    padding-bottom: 0;
  }

  &.with-border {
    border-top: var(--dividerStyle);
  }

  &.with-color-border {
    border-top: 1px solid transparent;
    background-image: url('data:image/svg+xml;utf8,<svg width="1440" height="9" viewBox="0 0 1440 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M412.672 8.15166H-1.98598L-2 0H422.222L412.672 8.15166Z" fill="%231CB0A8"/><path d="M423.039 0L407.769 8.15166H699.709V0" fill="%23EF4056"/><path d="M880.847 8.15166H699.709V0H875.01L880.847 8.15166Z" fill="%231CB0A8"/><path d="M419.331 -5.06941e-05L453.054 -5.1391e-05L462.207 8.15161L407.769 8.15161L419.331 -5.06941e-05Z" fill="%2395D5D2"/><path d="M1443 8.15166H875.066L864.467 0L1443 0V8.15166Z" fill="%23FCB643"/></svg>');
    background-size: 1440px 9px;
    background-repeat: repeat-x;
    background-position: top center;
  }

  #ot-sdk-btn.ot-sdk-show-settings {
    color: var(--color-textPrimary);
    &:hover {
      color: var(--color-textLinkHover);
    }
  }

  ${breakpointTinyHandset} {
    font-size: 0.85rem;

    #ot-sdk-btn.ot-sdk-show-settings {
      font-size: 0.85rem;
    }
  }

  @media print {
    display: none;
  }
`

const footerSecondaryStyle = css`
  display: flex;
  flex-wrap: wrap-reverse;
  border-top: var(--dividerStyle);
  padding: 1.5rem 0 0;

  .minimal & {
    border-top: 0;

    ${breakpointSmallTablet} {
      margin-top: 0;
    }
  }

  ${breakpointSmallTablet} {
    margin-top: 2.5rem;
  }

  ${breakpointTinyTablet} {
    flex-direction: column-reverse;
  }
`

const legalLinksStyle = css`
  flex-grow: 2;
  padding: 0 0 2.5rem;

  a {
    text-decoration: underline;
    color: var(--color-textPrimary);
  }

  & > span {
    display: block;
    margin-bottom: 0.75rem;
  }

  nav {
    & > span,
    & > a,
    & > button {
      margin-right: 1rem;
    }
  }

  ${breakpointLargeHandset} {
    nav {
      & > span {
        display: block;
        margin: 0;
      }
    }
  }
`

const engagementBlockStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 0 2.5rem;

  .social-wrapper {
    font-size: 0.875rem;
  }

  .social {
    white-space: nowrap;
    span {
      height: 24px;
      margin-right: 1.5rem;
      margin-top: 0.5rem;
    }
  }

  .languages-wrapper {
    font-size: 0.875rem;
    margin-right: 60px;

    ${breakpointTinyHandset} {
      margin-right: 40px;
    }
  }

  .languages {
    select {
      margin-top: 0.25rem;
      font-size: 1rem;
      display: inline-block;
      padding: 0.25rem 2rem 0.25rem 0.5rem;
    }
  }
`

/**
 * The `GlobalFooter` component appears at the bottom of every screen in our web applications.
 */
export const GlobalFooter = (props) => {
  const { hasBorder = true, hasColorBorder = false, minimal, anchored } = props
  const { t } = useTranslation()

  const oneTrustClickHandler = () => window.OneTrust?.ToggleInfoDisplay()

  return (
    <footer
      className={cx(
        footerStyle,
        anchored && 'anchored',
        hasBorder && 'with-border',
        hasColorBorder && 'with-color-border',
        minimal && 'minimal'
      )}>
      <PageContainer className="footer-container">
        <div className={footerSecondaryStyle}>
          <div className={legalLinksStyle}>
            <span>
              <Trans i18nKey="global-footer:pocket-is-part-of">
                Pocket is part of the{' '}
                <a href="https://www.mozilla.org/about/" rel="noopener">
                  Mozilla
                </a>{' '}
                family of products.
              </Trans>
            </span>
            <nav aria-label="Legal">
              <span>
                &copy; {new Date().getFullYear()}{' '}
                {t('global-footer:read-it-later-inc', 'Read It Later, Inc.')}
              </span>
              <a href="https://support.mozilla.org/en-US/kb/future-of-pocket">
                {t('global-footer:get-help', 'Get help')}
              </a>
              <a href="https://getpocket.com/privacy?src=footer_v2">
                {t('global-footer:privacy-policy', 'Privacy policy')}
              </a>
              <a href="https://getpocket.com/tos?src=footer_v2">
                {t('global-footer:terms-of-service', 'Terms of service')}
              </a>
              <button
                onClick={oneTrustClickHandler}
                suppressHydrationWarning
                id="ot-sdk-btn"
                className="ot-sdk-show-settings">
                {t('global-footer:cookie-preferences', 'Cookie preferences')}
              </button>
            </nav>
          </div>
          {minimal ? null : (
            <div className={engagementBlockStyle}>
              <div className="languages-wrapper">
                {t('global-footer:language', 'Language')}
                <div className="languages">
                  <Languages />
                </div>
              </div>
            </div>
          )}
        </div>
      </PageContainer>
    </footer>
  )
}

GlobalFooter.propTypes = {
  device: PropTypes.string,

  /**
   * Defaults to true - provides the footer with a full-width top border.
   */
  hasBorder: PropTypes.bool,

  /**
   * Defaults to false - provides the footer with a full-width colored border. Overrides `hasBorder` styles
   */
  hasColorBorder: PropTypes.bool
}
