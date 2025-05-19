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
import { PREMIUM_URL } from 'common/constants'
import Link from 'next/link'

const appStoreBadge =
  'https://assets.getpocket.com/web-ui/assets/apple-app-store-badge.2928664fe1fc6aca88583a6f606d60ba.svg'
const googlePlayBadge =
  'https://assets.getpocket.com/web-ui/assets/google-play-badge.db9b21a1c41f3dcd9731e1e7acfdbb57.png'

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

const footerPrimaryStyle = css`
  margin: 4rem 0 2.5rem;
  display: flex;
  flex-wrap: wrap;

  ${breakpointSmallTablet} {
    margin: 2.5rem 0 1rem;
  }
`

const footerPrimaryGroupStyle = css`
  display: flex;
  flex-wrap: wrap;
  width: 25%;
  padding-right: 1.5rem;
  align-content: flex-start;

  h6 {
    width: 100%;
    font-family: var(--fontSansSerif);
    font-weight: 600;
  }

  ul {
    font-size: var(--fontSizeRoot);
    list-style-type: none;
    padding: 0;
  }

  li {
    line-height: 1.5em;
    margin-bottom: 1rem;

    ${breakpointSmallTablet} {
      margin-bottom: 0.75rem;
    }
  }

  ${breakpointSmallTablet} {
    width: 33%;
    padding-right: 1rem;

    &:nth-child(3) {
      padding-right: 0;
    }
  }

  ${breakpointLargeHandset} {
    &:nth-child(even) {
      width: 40%;
      padding-right: 0;
    }

    &:nth-child(odd) {
      width: 60%;
      padding-right: 1rem;
    }
  }

  ${breakpointTinyHandset} {
    h6 {
      font-size: 1rem;
    }
  }
`

const footerPrimaryAppButtonsStyle = css`
  ${breakpointSmallTablet} {
    width: 100%;
    padding-right: 0;

    h6 {
      width: 100%;
    }
  }

  ${breakpointLargeHandset} {
    width: 50%;
  }
`

const appStoreBadgeStyle = css`
  display: block;
  width: 100%;
  margin: 0 0 1rem 0;

  &.google-play-badge {
    height: 40px;
    overflow: hidden;

    img {
      /* google badge image includes margin so we have to adjust to make it
      consistent with apple badge */
      margin: -10px 0 0 -10px;
      max-height: 60px;
    }
  }

  img {
    max-height: 40px;
  }

  ${breakpointSmallTablet} {
    display: inline-block;
    width: auto;

    &:nth-child(2) img {
      margin-right: 1rem;
    }
  }

  ${breakpointTinyHandset} {
    margin: 0 0 0.75rem 0;
    transform: scale(0.8);
    transform-origin: 0 0;

    &.google-play-badge {
      overflow: visible;
    }
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
  const { device, hasBorder = true, hasColorBorder = false, minimal, anchored } = props
  const { t } = useTranslation()

  const oneTrustClickHandler = () => window.OneTrust?.ToggleInfoDisplay()

  let appBadges = [
    <a
      href="https://apps.apple.com/us/app/pocket-save-read-grow/id309601447"
      className={appStoreBadgeStyle}
      key="footer-app-store-badge"
      rel="noopener">
      <img
        src={appStoreBadge}
        alt={t('global-footer:app-store', 'Download On the Apple App Store')}
      />
    </a>,
    <a
      href="https://play.google.com/store/apps/details?id=com.ideashower.readitlater.pro"
      className={`${appStoreBadgeStyle} google-play-badge`}
      key="footer-google-play-badge"
      rel="noopener">
      <img src={googlePlayBadge} alt={t('global-footer:google-play', 'Get It On Google Play')} />
    </a>
  ]

  // Only show the appropriate OS app store if we're on an iOS/Android device.
  // Defaults to showing both if we can't specifically identify iDevice/Android.
  if (device === 'ios') appBadges = appBadges.slice(0, 1)
  if (device === 'android') appBadges = appBadges.slice(1, 2)

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
        {minimal ? null : (
          <div className={footerPrimaryStyle}>
            <div className={footerPrimaryGroupStyle}>
              <h6>{t('global-footer:products', 'Products')}</h6>
              <nav aria-label="Products">
                <ul>
                  <li>
                    <Link href="explore?src=footer_v2">
                      {t('global-footer:must-read-articles', 'Must-read articles')}
                    </Link>
                  </li>
                  <li>
                    <Link href={'/explore/pocket-hits-signup?src=footer_v2'}>
                      {t('global-footer:daily-newsletter', 'Daily newsletter')}
                    </Link>
                  </li>
                  <li>
                    <a href={`${PREMIUM_URL}&utm_campaign=global-bottom&src=footer_v2`}>
                      {t('global-footer:pocket-premium', 'Pocket Premium')}
                    </a>
                  </li>

                  <li>
                    <a href="https://support.mozilla.org/en-US/products/pocket/pocket-browser-extensions?src=footer_v2">
                      {t('global-footer:save-to-pocket-extensions', 'Save to Pocket extensions')}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={footerPrimaryGroupStyle}>
              <h6>{t('global-footer:company', 'Company')}</h6>
              <nav aria-label="Company">
                <ul>
                  <li>
                    <Link href="/about?src=footer_v2">{t('global-footer:about', 'About')}</Link>
                  </li>
                  <li>
                    <Link href="/contact-info?src=footer_v2">
                      {t('global-footer:contact-info', 'Contact Info')}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={footerPrimaryGroupStyle}>
              <h6>{t('global-footer:resources', 'Resources')}</h6>
              <nav aria-label="Resources">
                <ul>
                  <li>
                    <a href="https://help.getpocket.com/?src=footer_v2">
                      {t('global-footer:get-help', 'Get help')}
                    </a>
                  </li>
                  <li>
                    <Link href="https://getpocket.com/sponsor?src=footer_v2">
                      {t('global-footer:advertise', 'Advertise')}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={cx(footerPrimaryGroupStyle, footerPrimaryAppButtonsStyle)}>
              <h6>{t('global-footer:get-the-app', 'Get the app')}</h6>
              {appBadges}
            </div>
          </div>
        )}

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
              <a href="https://help.getpocket.com/?src=footer_v2">
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
