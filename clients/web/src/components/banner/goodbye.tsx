import { css } from '@emotion/css'

import { breakpointLargeTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { useTranslation } from 'next-i18next'
import { ArrowRightIcon } from '@ui/icons/ArrowRightIcon'
const bannerBackground = css`
  width: 100%;
  background: #008078;
  background: linear-gradient(270deg, #008078, #009991);
  z-index: 1;
  padding: 0.5rem 0;
  .inner {
    display: flex;
    column-gap: 1.5rem;
    align-items: center;
    h3 {
      margin-bottom: 0;
      color: var(--color-white100);
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.1;
      letter-spacing: -0.01em;
      white-space: nowrap;
    }
    p {
      font-size: 0.875rem;
      color: var(--color-white100);
      font-weight: 300;
      margin-bottom: 0.25rem;
    }
    .call-to-action {
      display: inline-block;
      color: #fff;
      white-space: nowrap;
      text-decoration: none;
      padding-left: 0.125rem;
      &:hover {
        color: #fff;
        text-decoration: underline;
      }
    }

    ${breakpointLargeTablet} {
      flex-direction: column;
      align-items: flex-start;
    }
    ${breakpointTinyTablet} {
      h3 {
        font-size: 1.125rem;
      }
    }
    ${breakpointLargeHandset} {
    }
  }
`

export const BannerGoodbye = () => {
  const { t } = useTranslation()
  return (
    <div className={bannerBackground}>
      <div className="inner page-container">
        <h3>{t('shutdown:banner-header', 'Pocket is shutting down')}</h3>
        <div className="content">
          <p>
            {t(
              'shutdown:banner-copy',
              'After much thought, we’ve made the difficult decision to close Pocket. Thanks for being part of the journey. Find out about refunds and how to export your content in our support article.'
            )}
            <a className="call-to-action" href="">
              <ArrowRightIcon /> {t('shutdown:banner-readmore', 'Read more')}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
