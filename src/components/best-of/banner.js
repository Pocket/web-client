import { css, cx } from 'linaria'
import { Button } from '@pocket/web-ui'
import {
  breakpointLargeTablet,
  breakpointMediumTablet,
  breakpointSmallTablet,
  breakpointLargeHandset
} from '@pocket/web-ui'

const bannerWrapper = css`
  width: 100%;
  background-color: #9871EF;
  font-family: var(--fontSansSerif);
  color: #fff;
  display: flex;
  max-height: 80px;

  margin-top: 2.5rem;

  .best-of {
    background-color: #F67D6D;
    color: #FFD25E;
    font-size: 3.125rem;
    font-weight: 700;
    line-height: 2.5rem;
    white-space: nowrap;
    padding: 20px 10px;
  }

  .year-wrapper {
    display: flex;
    flex-wrap: nowrap;
  }

  .year {
    position: relative;
    display: inline-block;
    font-size: 3.125rem;
    font-weight: 700;
    line-height: 2.5rem;
    padding: 20px 10px;
    overflow: hidden;
    min-width: 140px;
  }

  &.de .year {
    background-color: #C5A5F8;
    color: #802AC3;
  }

  &.en .year {
    &:nth-of-type(1) {
      background-color: #004D48;
      color: #F9BFD1;
    }
    &:nth-of-type(2) {
      background-color: #396AFF;
      color: #82ECB7;
    }
    &:nth-of-type(3) {
      background-color: #F67D6D;
      color: #FFD25E;
    }

    &:before,
    &:after {
      content: '2021';
      position: absolute;
      left: 0.625rem;
    }

    &:before {
      top: -1.5rem;
    }

    &:after {
      bottom: -1.5rem;
    }
  }

  .cta-section {
    display: flex;
    justify-content: space-between;

    p {
      padding: 15px;
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1.625rem;
    }

    .sub-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    a {
      white-space: nowrap;
      margin: 20px;
      font-size: 1rem;
      font-weight: 600;
      padding: 0.5rem;
      background-color: #fff;
      color: #000;
      border: none;

      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }

  ${breakpointLargeTablet} {
    .cta-section {
      p {
        font-size: 1.25rem;
      }

      a {
        font-size: 0.875rem;
      }
    }
  }

  ${breakpointMediumTablet} {
    &.en {
      .cta-section {
        flex-grow: 2;

        p {
          font-size: 1rem;
          line-height: 1.4rem;
        }
      }
      .year:nth-of-type(1) {
        display: none;
      }
    }

    &.de {
      .cta-section p {
        font-size: 0.875rem;
        line-height: 1.2rem;
      }
    }
  }

  ${breakpointSmallTablet} {
    .cta-section {
      flex-grow: 2;

      .sub-wrapper {
        margin: 0 auto;
      }

      .text-wrapper {
        display: none;
      }
    }
  }

  ${breakpointLargeHandset} {
    max-height: unset;

    .best-of,
    .year-wrapper,
    .year {
      display: none;
    }

    .cta-section {
      flex-direction: column;
      margin: 0 auto;

      .text-wrapper {
        display: block;
        text-align: center;
      }

      p {
        font-size: 1rem;
      }

      a {
        display: inline-block;
        margin: 0 auto 1rem;
      }
    }
  }
`

const EnglishBanner = ({ clickAction }) => {
  return (
    <>
      <div className="year-wrapper">
        <div className="year">2021</div>
        <div className="year">2021</div>
        <div className="year">2021</div>
      </div>
      <div className="cta-section">
        <div className="sub-wrapper text-wrapper">
          <p>The top articles of the year are here.</p>
        </div>
        <div className="sub-wrapper">
          <Button
            variant="secondary"
            href="/collections?utm_campaign=best-of-us&src=home"
            onClick={clickAction}>
            Read Pocket’s Best of 2021
          </Button>
        </div>
      </div>
    </>
  )
}

const GermanBanner = ({ clickAction }) => {
  return (
    <>
      <div className="best-of">Best of</div>
      <div className="year">2021</div>
      <div className="cta-section">
        <div className="sub-wrapper text-wrapper">
          <p>Die meistgelesenen Artikel des Jahres warten auf dich.</p>
        </div>
        <div className="sub-wrapper">
          <Button
            variant="secondary"
            href="/de/collections?utm_campaign=best-of-de&src=home"
            onClick={clickAction}>
            Jetzt auf Pocket lesen
          </Button>
        </div>
      </div>
    </>
  )
}

export const Banner = ({ locale, clickAction }) => {
  const renderBanner = locale === 'en' || locale === 'de'

  return renderBanner ? (
    <aside className={cx(bannerWrapper, locale)}>
      {locale === 'en' ? (
        <EnglishBanner clickAction={clickAction} />
      ) : (
        <GermanBanner clickAction={clickAction} />
      )}
    </aside>
  ) : null
}
