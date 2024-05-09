import { useState } from 'react'
import { css, cx } from '@emotion/css'
import { Trans } from 'next-i18next'
import BigDiamondDark from 'static/images/reader-upsells/BigDiamond-dark.svg'
import BigDiamondLight from 'static/images/reader-upsells/BigDiamond-light.svg'
import BigDiamondSepia from 'static/images/reader-upsells/BigDiamond-sepia.svg'
import FocusedDark from 'static/images/reader-upsells/Focused-dark.svg'
import FocusedLight from 'static/images/reader-upsells/Focused-light.svg'
import FocusedSepia from 'static/images/reader-upsells/Focused-sepia.svg'
import HighlightDark from 'static/images/reader-upsells/Highlight-dark.svg'
import HighlightLight from 'static/images/reader-upsells/Highlight-light.svg'
import HighlightSepia from 'static/images/reader-upsells/Highlight-sepia.svg'
import LibraryDark from 'static/images/reader-upsells/Library-dark.svg'
import LibraryLight from 'static/images/reader-upsells/Library-light.svg'
import LibrarySepia from 'static/images/reader-upsells/Library-sepia.svg'
import SearchDark from 'static/images/reader-upsells/Search-dark.svg'
import SearchLight from 'static/images/reader-upsells/Search-light.svg'
import SearchSepia from 'static/images/reader-upsells/Search-sepia.svg'
import TagsDark from 'static/images/reader-upsells/Tags-dark.svg'
import TagsLight from 'static/images/reader-upsells/Tags-light.svg'
import TagsSepia from 'static/images/reader-upsells/Tags-sepia.svg'
import TypeDark from 'static/images/reader-upsells/Type-dark.svg'
import TypeLight from 'static/images/reader-upsells/Type-light.svg'
import TypeSepia from 'static/images/reader-upsells/Type-sepia.svg'
import { ArrowLink } from 'components/arrow-link/arrow-link'
import { breakpointTinyTablet } from 'common/constants'
import { useInView } from 'react-intersection-observer'
import { PREMIUM_URL } from 'common/constants'

const borderStyles = css`
  border-top: 2px solid var(--color-dividerTertiary);

  @media print {
    display: none;
  }
`

const upsellWrapper = css`
  margin: 0 auto;
  padding: 60px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Graphik Web';

  ${breakpointTinyTablet} {
    padding: 30px 40px;
  }
`

const imgStyles = css`
  width: 70px;
  min-width: 70px;
  padding: 40px 0;

  img {
    width: 100%;
    display: none;
  }

  .colormode-light & {
    &.library img.light {
      display: block;
    }
    &.search img.light {
      display: block;
    }
    &.focused img.light {
      display: block;
    }
    &.type img.light {
      display: block;
    }
    &.features img.light {
      display: block;
    }
    &.highlights img.light {
      display: block;
    }
    &.tags img.light {
      display: block;
    }
  }
  .colormode-dark & {
    &.library img.dark {
      display: block;
    }
    &.search img.dark {
      display: block;
    }
    &.focused img.dark {
      display: block;
    }
    &.type img.dark {
      display: block;
    }
    &.features img.dark {
      display: block;
    }
    &.highlights img.dark {
      display: block;
    }
    &.tags img.dark {
      display: block;
    }
  }
  .colormode-sepia & {
    &.library img.sepia {
      display: block;
    }
    &.search img.sepia {
      display: block;
    }
    &.focused img.sepia {
      display: block;
    }
    &.type img.sepia {
      display: block;
    }
    &.features img.sepia {
      display: block;
    }
    &.highlights img.sepia {
      display: block;
    }
    &.tags img.sepia {
      display: block;
    }
  }
`

const copyWrapper = css`
  margin: 0 30px;

  h5 {
    display: block;
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    margin: 0 0 5px;
    color: var(--color-textPrimary);
  }

  &.specificity {
    p {
      display: block;
      font-size: 16px !important;
      line-height: 24px;
      margin: 0;
      color: var(--color-textSecondary);
    }
    p.small {
      display: none;
      line-height: 22px;
      a {
        white-space: nowrap;
      }
    }
  }

  ${breakpointTinyTablet} {
    margin: 0 0 0 30px;

    h5 {
      display: none;
    }
    &.specificity {
      p {
        display: none;
      }
      p.small {
        display: block;
      }
    }
  }
`

const buttonWrapper = css`
  display: block;

  a {
    min-width: 180px;
    display: inline-block;
    text-align: center;
    padding: 12px 18px;
  }

  ${breakpointTinyTablet} {
    display: none;
  }
`

const premiumURL = `${PREMIUM_URL}&utm_campaign=reader-bottom`

const LibraryAd = () => (
  <>
    <div className={cx(imgStyles, 'library')}>
      <img className="dark" alt="" src={LibraryDark.src} />
      <img className="light" alt="" src={LibraryLight.src} />
      <img className="sepia" alt="" src={LibrarySepia.src} />
    </div>
    <div className={cx(copyWrapper, 'specificity')}>
      <h5>
        <Trans i18nKey="reader:read-with-purpose">Read with purpose</Trans>
      </h5>
      <p>
        <Trans i18nKey="reader:permanent">
          Build a permanent library of every article you’ve saved with Pocket Premium.
        </Trans>
      </p>
      <p className="small">
        <Trans i18nKey="reader:permanent-small">
          Build a permanent library of every article you’ve saved with
        </Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.library"
          dataCy="reader-bottom-premium"
          href={premiumURL}>
          <Trans i18nKey="reader:pocket-premium">Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <a
        id="reader.bottom.premium.library"
        data-testid="reader-bottom-premium"
        className="button primary"
        rel="noopener"
        href={premiumURL}>
        <Trans i18nKey="reader:upgrade">Upgrade</Trans>
      </a>
    </div>
  </>
)

const SearchAd = () => (
  <>
    <div className={cx(imgStyles, 'search')}>
      <img className="dark" alt="" src={SearchDark.src} />
      <img className="light" alt="" src={SearchLight.src} />
      <img className="sepia" alt="" src={SearchSepia.src} />
    </div>
    <div className={cx(copyWrapper, 'specificity')}>
      <h5>
        <Trans i18nKey="reader:search-every-word">Search every word in your Pocket</Trans>
      </h5>
      <p>
        <Trans i18nKey="reader:unlock-search">
          Unlock our powerful search tool when you join Pocket Premium.
        </Trans>
      </p>
      <p className="small">
        <Trans i18nKey="reader:search-every-word-small">
          Quickly search every word in your Pocket when you join
        </Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.search"
          dataCy="reader-bottom-premium"
          href={premiumURL}>
          <Trans i18nKey="reader:pocket-premium">Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <a
        id="reader.bottom.premium.search"
        data-testid="reader-bottom-premium"
        className="button primary"
        rel="noopener"
        href={premiumURL}>
        <Trans i18nKey="reader:upgrade">Upgrade</Trans>
      </a>
    </div>
  </>
)

const FocusedAd = () => (
  <>
    <div className={cx(imgStyles, 'focused')}>
      <img className="dark" alt="" src={FocusedDark.src} />
      <img className="light" alt="" src={FocusedLight.src} />
      <img className="sepia" alt="" src={FocusedSepia.src} />
    </div>
    <div className={cx(copyWrapper, 'specificity')}>
      <h5>
        <Trans i18nKey="reader:ditch-the-ads">Ditch the ads</Trans>
      </h5>
      <p>
        <Trans i18nKey="reader:boost-your-focus">
          Boost your focus and get an ad-free experience with Pocket Premium.
        </Trans>
      </p>
      <p className="small">
        <Trans i18nKey="reader:boost-you-focus-small">
          Boost your focus and get an ad-free experience with
        </Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.focused"
          dataCy="reader-bottom-premium"
          href={premiumURL}>
          <Trans i18nKey="reader:pocket-premium">Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <a
        id="reader.bottom.premium.focused"
        data-testid="reader-bottom-premium"
        className="button primary"
        rel="noopener"
        href={premiumURL}>
        <Trans i18nKey="reader:upgrade">Upgrade</Trans>
      </a>
    </div>
  </>
)

const TypeAd = () => (
  <>
    <div className={cx(imgStyles, 'type')}>
      <img className="dark" alt="" src={TypeDark.src} />
      <img className="light" alt="" src={TypeLight.src} />
      <img className="sepia" alt="" src={TypeSepia.src} />
    </div>
    <div className={cx(copyWrapper, 'specificity')}>
      <h5>
        <Trans i18nKey="reader:favorite-font">Read in your favorite font</Trans>
      </h5>
      <p>
        <Trans i18nKey="reader:font-access">
          Get access to 8 exclusive fonts when you join Pocket Premium.
        </Trans>
      </p>
      <p className="small">
        <Trans i18nKey="reader:customize-with-fonts">
          Customize your Pocket with 8 exclusive fonts when you join
        </Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.type"
          dataCy="reader-bottom-premium"
          href={premiumURL}
          rel="noopener">
          <Trans i18nKey="reader:pocket-premium">Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <a
        id="reader.bottom.premium.type"
        data-testid="reader-bottom-premium"
        className="button primary"
        rel="noopener"
        href={premiumURL}>
        <Trans i18nKey="reader:upgrade">Upgrade</Trans>
      </a>
    </div>
  </>
)

const BigDiamondAd = () => (
  <>
    <div className={cx(imgStyles, 'features')}>
      <img className="dark" alt="" src={BigDiamondDark.src} />
      <img className="light" alt="" src={BigDiamondLight.src} />
      <img className="sepia" alt="" src={BigDiamondSepia.src} />
    </div>
    <div className={cx(copyWrapper, 'specificity')}>
      <h5>
        <Trans i18nKey="reader:unlock-exclusive-features">Unlock exclusive features</Trans>
      </h5>
      <p>
        <Trans i18nKey="reader:next-level">
          Take your reading experience to the next level when you join Pocket Premium.
        </Trans>
      </p>
      <p className="small">
        <Trans i18nKey="reader:next-level-small">
          Take your reading experience to the next level when you join
        </Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.features"
          dataCy="reader-bottom-premium"
          href={premiumURL}
          rel="noopener">
          <Trans i18nKey="reader:pocket-premium">Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <a
        id="reader.bottom.premium.features"
        data-testid="reader-bottom-premium"
        className="button primary"
        rel="noopener"
        href={premiumURL}>
        <Trans i18nKey="reader:upgrade">Upgrade</Trans>
      </a>
    </div>
  </>
)

const HighlightAd = () => (
  <>
    <div className={cx(imgStyles, 'highlights')}>
      <img className="dark" alt="" src={HighlightDark.src} />
      <img className="light" alt="" src={HighlightLight.src} />
      <img className="sepia" alt="" src={HighlightSepia.src} />
    </div>
    <div className={cx(copyWrapper, 'specificity')}>
      <h5>
        <Trans i18nKey="reader:unlimited-highlights">Unlock unlimited highlights</Trans>
      </h5>
      <p>
        <Trans i18nKey="reader:capture-ideas">
          Capture as many ideas as you’d like in every article with Pocket Premium.
        </Trans>
      </p>
      <p className="small">
        <Trans i18nKey="reader:capture-ideas-small">
          Unlock unlimited highlights and never lose track of an idea with
        </Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.highlights"
          dataCy="reader-bottom-premium"
          href={premiumURL}>
          <Trans i18nKey="reader:pocket-premium">Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <a
        id="reader.bottom.premium.highlights"
        data-testid="reader-bottom-premium"
        className="button primary"
        rel="noopener"
        href={premiumURL}>
        <Trans i18nKey="reader:upgrade">Upgrade</Trans>
      </a>
    </div>
  </>
)

const TagsAd = () => (
  <>
    <div className={cx(imgStyles, 'tags')}>
      <img className="dark" alt="" src={TagsDark.src} />
      <img className="light" alt="" src={TagsLight.src} />
      <img className="sepia" alt="" src={TagsSepia.src} />
    </div>
    <div className={cx(copyWrapper, 'specificity')}>
      <h5>
        <Trans i18nKey="reader:tag-stories-faster">Tag stories faster than ever</Trans>
      </h5>
      <p>
        <Trans i18nKey="reader:save-time-tagging">
          Save time and get helpful tag suggestions with Pocket Premium.
        </Trans>
      </p>
      <p className="small">
        <Trans i18nKey="reader:save-time-tagging-small">
          Tag stories faster than ever. Get tag suggestions with
        </Trans>{' '}
        <ArrowLink id="reader.bottom.premium.tags" dataCy="reader-bottom-premium" href={premiumURL}>
          <Trans i18nKey="reader:pocket-premium">Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <a
        id="reader.bottom.premium.tags"
        data-testid="reader-bottom-premium"
        className="button primary"
        rel="noopener"
        href={premiumURL}>
        <Trans i18nKey="reader:upgrade">Upgrade</Trans>
      </a>
    </div>
  </>
)

const AdsOptions = {
  library: LibraryAd,
  search: SearchAd,
  focused: FocusedAd,
  type: TypeAd,
  features: BigDiamondAd,
  highlights: HighlightAd,
  tags: TagsAd
}

function _determineItem() {
  const tmpArray = Object.keys(AdsOptions)
  return tmpArray[Math.floor(Math.random() * tmpArray.length)]
}

export const BottomUpsell = ({ maxWidth, onVisible }) => {
  const [variant] = useState(_determineItem())

  // Fire a tracking event
  const [viewRef] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    onChange: (inView) => inView && onVisible('reader.bottom.premium')
  })

  const Advertisement = AdsOptions[variant]

  return (
    <aside className={borderStyles} ref={viewRef}>
      <div className={upsellWrapper} style={{ maxWidth }}>
        <Advertisement />
      </div>
    </aside>
  )
}
