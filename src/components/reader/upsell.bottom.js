import { useState } from 'react'
import { css } from 'linaria'
import { Trans } from 'react-i18next'
import classNames from 'classnames'
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
import { Button, breakpointTinyTablet } from '@pocket/web-ui'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { PREMIUM_URL } from 'common/constants'

const borderStyles = css`
  border-top: 2px solid var(--color-dividerTertiary);
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
    &.library img.light { display: block; }
    &.search img.light { display: block; }
    &.focused img.light { display: block; }
    &.type img.light { display: block; }
    &.features img.light { display: block; }
    &.highlights img.light { display: block; }
    &.tags img.light { display: block; }
  }
  .colormode-dark & {
    &.library img.dark { display: block; }
    &.search img.dark { display: block; }
    &.focused img.dark { display: block; }
    &.type img.dark { display: block; }
    &.features img.dark { display: block; }
    &.highlights img.dark { display: block; }
    &.tags img.dark { display: block; }
  }
  .colormode-sepia & {
    &.library img.sepia { display: block; }
    &.search img.sepia { display: block; }
    &.focused img.sepia { display: block; }
    &.type img.sepia { display: block; }
    &.features img.sepia { display: block; }
    &.highlights img.sepia { display: block; }
    &.tags img.sepia { display: block; }
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
        white-space: nowrap
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

const LibraryAd = () => (
  <>
    <div className={classNames(imgStyles, 'library')}>
      <img className='dark' src={LibraryDark} />
      <img className='light' src={LibraryLight} />
      <img className='sepia' src={LibrarySepia} />
    </div>
    <div className={classNames(copyWrapper, 'specificity')}>
      <h5><Trans>Read with purpose</Trans></h5>
      <p><Trans>Build a permanent library of every article you’ve saved with Pocket Premium.</Trans></p>
      <p className="small">
        <Trans>Build a permanent library of every article you’ve saved with</Trans>{' '}
        <ArrowLink
          href={`${PREMIUM_URL}12`}
          target="_blank">
          <Trans>Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <Button
        id="reader.bottom.premium.library"
        target="_blank"
        href={`${PREMIUM_URL}12`}><Trans>Upgrade</Trans></Button>
    </div>
  </>
)

const SearchAd = () => (
  <>
    <div className={classNames(imgStyles, 'search')}>
      <img className='dark' src={SearchDark} />
      <img className='light' src={SearchLight} />
      <img className='sepia' src={SearchSepia} />
    </div>
    <div className={classNames(copyWrapper, 'specificity')}>
      <h5><Trans>Search every word in your Pocket</Trans></h5>
      <p><Trans>Unlock our powerful search tool when you join Pocket Premium.</Trans></p>
      <p className="small">
        <Trans>Quickly search every word in your Pocket when you join</Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.search"
          href={`${PREMIUM_URL}12`}
          target="_blank">
          <Trans>Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <Button
        id="reader.bottom.premium.search"
        target="_blank"
        href={`${PREMIUM_URL}12`}><Trans>Upgrade</Trans></Button>
    </div>
  </>
)

const FocusedAd = () => (
  <>
    <div className={classNames(imgStyles, 'focused')}>
      <img className='dark' src={FocusedDark} />
      <img className='light' src={FocusedLight} />
      <img className='sepia' src={FocusedSepia} />
    </div>
    <div className={classNames(copyWrapper, 'specificity')}>
      <h5><Trans>Ditch the ads</Trans></h5>
      <p><Trans>Boost your focus and get an ad-free experience with Pocket Premium.</Trans></p>
      <p className="small">
        <Trans>Boost your focus and get an ad-free experience with</Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.focused"
          href={`${PREMIUM_URL}12`}
          target="_blank">
          <Trans>Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <Button
        id="reader.bottom.premium.focused"
        target="_blank"
        href={`${PREMIUM_URL}12`}><Trans>Upgrade</Trans></Button>
    </div>
  </>
)

const TypeAd = () => (
  <>
    <div className={classNames(imgStyles, 'type')}>
      <img className='dark' src={TypeDark} />
      <img className='light' src={TypeLight} />
      <img className='sepia' src={TypeSepia} />
    </div>
    <div className={classNames(copyWrapper, 'specificity')}>
      <h5><Trans>Read in your favorite font</Trans></h5>
      <p><Trans>Get access to 8 exclusive fonts when you join Pocket Premium.</Trans></p>
      <p className="small">
        <Trans>Customize your Pocket with 8 exclusive fonts when you join</Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.type"
          href={`${PREMIUM_URL}12`}
          target="_blank">
          <Trans>Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <Button
        id="reader.bottom.premium.type"
        target="_blank"
        href={`${PREMIUM_URL}12`}><Trans>Upgrade</Trans></Button>
    </div>
  </>
)

const BigDiamondAd = () => (
  <>
    <div className={classNames(imgStyles, 'features')}>
      <img className='dark' src={BigDiamondDark} />
      <img className='light' src={BigDiamondLight} />
      <img className='sepia' src={BigDiamondSepia} />
    </div>
    <div className={classNames(copyWrapper, 'specificity')}>
      <h5><Trans>Unlock exclusive features</Trans></h5>
      <p><Trans>Take your reading experience to the next level when you join Pocket Premium.</Trans></p>
      <p className="small">
        <Trans>Take your reading experience to the next level when you join</Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.features"
          href={`${PREMIUM_URL}12`}
          target="_blank">
          <Trans>Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <Button
        id="reader.bottom.premium.features"
        target="_blank"
        href={`${PREMIUM_URL}12`}><Trans>Upgrade</Trans></Button>
    </div>
  </>
)

const HighlightAd = () => (
  <>
    <div className={classNames(imgStyles, 'highlights')}>
      <img className='dark' src={HighlightDark} />
      <img className='light' src={HighlightLight} />
      <img className='sepia' src={HighlightSepia} />
    </div>
    <div className={classNames(copyWrapper, 'specificity')}>
      <h5><Trans>Unlock unlimited highlights</Trans></h5>
      <p><Trans>Capture as many ideas as you’d like in every article with Pocket Premium.</Trans></p>
      <p className="small">
        <Trans>Unlock unlimited highlights and never lose track of an idea with</Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.highlights"
          href={`${PREMIUM_URL}12`}
          target="_blank">
          <Trans>Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <Button
        id="reader.bottom.premium.highlights"
        target="_blank"
        href={`${PREMIUM_URL}12`}><Trans>Upgrade</Trans></Button>
    </div>
  </>
)

const TagsAd = () => (
  <>
    <div className={classNames(imgStyles, 'tags')}>
      <img className='dark' src={TagsDark} />
      <img className='light' src={TagsLight} />
      <img className='sepia' src={TagsSepia} />
    </div>
    <div className={classNames(copyWrapper, 'specificity')}>
      <h5><Trans>Tag stories faster than ever</Trans></h5>
      <p><Trans>Save time and get helpful tag suggestions with Pocket Premium.</Trans></p>
      <p className="small">
        <Trans>Tag stories faster than ever. Get tag suggestions with</Trans>{' '}
        <ArrowLink
          id="reader.bottom.premium.tags"
          href={`${PREMIUM_URL}12`}
          target="_blank">
          <Trans>Pocket Premium</Trans>
        </ArrowLink>
      </p>
    </div>

    <div className={buttonWrapper}>
      <Button
        id="reader.bottom.premium.tags"
        target="_blank"
        href={`${PREMIUM_URL}12`}><Trans>Upgrade</Trans></Button>
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
  let tmpArray = Object.keys(AdsOptions)
  return tmpArray[Math.floor(Math.random() * tmpArray.length)]
}

export const BottomUpsell = ({ maxWidth, onVisible }) => {
  const [variant] = useState(_determineItem())

  const handleVisible = () => {
    onVisible('reader.bottom.premium')
  }

  const Advertisement = AdsOptions[variant]

  return (
    <VisibilitySensor onVisible={handleVisible}>
      <aside className={borderStyles}>
        <div className={upsellWrapper} style={{ maxWidth }}>
          <Advertisement />
        </div>
      </aside>
    </VisibilitySensor>
  )
}
