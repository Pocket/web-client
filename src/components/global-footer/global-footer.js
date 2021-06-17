import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'linaria'
import { headingSansSerif } from '@pocket/web-ui'
import { fontSansSerif, fontSizeRoot } from '@pocket/web-ui'
import { breakpointSmallTablet } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointTinyHandset } from '@pocket/web-ui'
import { PageContainer } from '@pocket/web-ui'
import { FacebookMonoIcon, TwitterMonoIcon } from '@pocket/web-ui'
import { Trans, useTranslation } from 'next-i18next'

const appStoreBadge =
  'https://assets.getpocket.com/web-ui/assets/apple-app-store-badge.2928664fe1fc6aca88583a6f606d60ba.svg'
const googlePlayBadge =
  'https://assets.getpocket.com/web-ui/assets/google-play-badge.db9b21a1c41f3dcd9731e1e7acfdbb57.png'

const footerStyle = css`
  background-color: var(--color-canvas);
  width: 100%;
  font-family: ${fontSansSerif};
  color: var(--color-textPrimary);

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

  ${breakpointTinyHandset} {
    font-size: 0.85rem;
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
    ${headingSansSerif}
  }

  ul {
    font-size: ${fontSizeRoot};
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
  padding: 1.5rem 0;

  ${breakpointSmallTablet} {
    margin-top: 2.5rem;
  }

  ${breakpointTinyTablet} {
    flex-direction: column-reverse;
  }
`

const legalLinksStyle = css`
  flex-grow: 2;

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
    & > a {
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

const socialLinksStyle = css`
  white-space: nowrap;

  span {
    margin: 0 0 1.5rem 1.5rem;
    height: 24px;

    ${breakpointTinyTablet} {
      margin: 0 1.5rem 0.75rem 0;
    }
  }
`

/**
 * The `GlobalFooter` component appears at the bottom of every screen in our web applications.
 */
export const GlobalFooter = ({ device, hasBorder, hasColorBorder }) => {
  const { t } = useTranslation()

  let appBadges = [
    <a
      href="https://apps.apple.com/us/app/pocket-save-read-grow/id309601447"
      className={appStoreBadgeStyle}
      key="footer-app-store-badge"
      target="_blank"
      rel="noopener noreferrer">
      <img
        src={appStoreBadge}
        alt={t('global-footer:app-store', 'Download On the Apple App Store')}
      />
    </a>,
    <a
      href="https://play.google.com/store/apps/details?id=com.ideashower.readitlater.pro"
      className={`${appStoreBadgeStyle} google-play-badge`}
      key="footer-google-play-badge"
      target="_blank"
      rel="noopener noreferrer">
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
        hasBorder && 'with-border',
        hasColorBorder && 'with-color-border'
      )}>
      <PageContainer className="footer-container">
        <div className={footerPrimaryStyle}>
          <div className={footerPrimaryGroupStyle}>
            <h6>{t('global-footer:products', 'Products')}</h6>
            <nav aria-label="Products">
              <ul>
                <li>
                  <a href="https://getpocket.com/explore?src=footer_v2">
                    {t('global-footer:must-read-articles', 'Must-read articles')}
                  </a>
                </li>
                <li>
                  <a href="https://getpocket.com/explore/pocket-hits?src=footer_v2">
                    {t('global-footer:daily-newsletter', 'Daily newsletter')}
                  </a>
                </li>
                <li>
                  <a href="https://getpocket.com/premium?ep=1&src=footer_v2">
                    {t('global-footer:pocket-premium', 'Pocket Premium')}
                  </a>
                </li>

                <li>
                  <a href="https://getpocket.com/welcome?src=footer_v2">
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
                  <a href="https://getpocket.com/about?src=footer_v2">
                    {t('global-footer:about', 'About')}
                  </a>
                </li>
                <li>
                  <a href="https://getpocket.com/jobs?src=footer_v2">
                    {t('global-footer:careers', 'Careers')}
                  </a>
                </li>
                <li>
                  <a href="https://blog.getpocket.com?src=footer_v2">
                    {t('global-footer:blog', 'Blog')}
                  </a>
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
                  <a href="https://getpocket.com/developer?src=footer_v2">
                    {t('global-footer:developer-api', 'Developer API')}
                  </a>
                </li>
                <li>
                  <a href="https://getpocket.com/publisher?src=footer_v2">
                    {t('global-footer:pocket-for-publishers', 'Pocket for publishers')}
                  </a>
                </li>

                <li>
                  <a href="https://getpocket.com/sponsor?src=footer_v2">
                    {t('global-footer:advertise', 'Advertise')}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className={cx(footerPrimaryGroupStyle, footerPrimaryAppButtonsStyle)}>
            <h6>{t('global-footer:get-the-app', 'Get the app')}</h6>
            {appBadges}
          </div>
        </div>

        <div className={footerSecondaryStyle}>
          <div className={legalLinksStyle}>
            <span>
              <Trans i18nKey="global-footer:pocket-is-part-of">
                Pocket is part of the{' '}
                <a href="https://www.mozilla.org/about/" target="_blank" rel="noopener noreferrer">
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
              <a href="https://getpocket.com/privacy?src=footer_v2">
                {t('global-footer:privacy-policy', 'Privacy policy')}
              </a>
              <a href="https://getpocket.com/tos?src=footer_v2">
                {t('global-footer:terms-of-service', 'Terms of service')}
              </a>
              <button id="ot-sdk-btn" className="ot-sdk-show-settings">
                {t('global-footer:cookie-preferences', 'Cookie preferences')}
              </button>
            </nav>
          </div>
          <div className={socialLinksStyle}>
            <a href="https://facebook.com/pocket" target="_blank" rel="noopener noreferrer">
              <FacebookMonoIcon
                id="facebook-footer-icon"
                title="Facebook"
                description="Visit our Facebook page"
              />
            </a>
            <a href="https://twitter.com/pocket" target="_blank" rel="noopener noreferrer">
              <TwitterMonoIcon
                id="twitter-footer-icon"
                title="Twitter"
                description="View our Twitter profile"
              />
            </a>
          </div>
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

GlobalFooter.defaultProps = {
  hasBorder: true,
  hasColorBorder: false
}
