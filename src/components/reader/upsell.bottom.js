import { useState } from 'react'
import { css } from 'linaria'
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

const CopyToIllustrationsMap = {
  library: "Library",
  search: "Search",
  focused: "Focused",
  type: "Type",
  features: "BigDiamond",
  highlights: "Highlight",
  tags: "Tags"
}

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
    &.library img.light.library { display: block; }
    &.search img.light.search { display: block; }
    &.focused img.light.focused { display: block; }
    &.type img.light.type { display: block; }
    &.features img.light.features { display: block; }
    &.highlights img.light.highlights { display: block; }
    &.tags img.light.tags { display: block; }
  }
  .colormode-dark & {
    &.library img.dark.library { display: block; }
    &.search img.dark.search { display: block; }
    &.focused img.dark.focused { display: block; }
    &.type img.dark.type { display: block; }
    &.features img.dark.features { display: block; }
    &.highlights img.dark.highlights { display: block; }
    &.tags img.dark.tags { display: block; }
  }
  .colormode-sepia & {
    &.library img.sepia.library { display: block; }
    &.search img.sepia.search { display: block; }
    &.focused img.sepia.focused { display: block; }
    &.type img.sepia.type { display: block; }
    &.features img.sepia.features { display: block; }
    &.highlights img.sepia.highlights { display: block; }
    &.tags img.sepia.tags { display: block; }
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

function _determineItem() {
  let tmpArray = Object.keys(CopyToIllustrationsMap)
  return tmpArray[Math.floor(Math.random() * tmpArray.length)]
}

export const BottomUpsell = ({ trackClick, maxWidth }) => {
  const [itemToShow] = useState(_determineItem())

  const sendTrackClick = (identifier) => {
    // trackClick({
    //   view: 'web',
    //   section: '/premium',
    //   page: 'reader',
    //   page_params: itemToShow,
    //   identifier
    // })
  }

  const handleVisible = () => {
    sendTrackClick('view_bottom_reader_upsell')
  }

  const handleClick = () => {
    sendTrackClick('click_bottom_reader_upsell')
  }

  return (
    <VisibilitySensor onVisible={handleVisible}>
      <aside className={borderStyles}>
        <div className={upsellWrapper} style={{ maxWidth }}>
          <div className={classNames(imgStyles, itemToShow)}>
            <img className='library dark' src={LibraryDark} />
            <img className='library light' src={LibraryLight} />
            <img className='library sepia' src={LibrarySepia} />

            <img className='search dark' src={SearchDark} />
            <img className='search light' src={SearchLight} />
            <img className='search sepia' src={SearchSepia} />

            <img className='focused dark' src={FocusedDark} />
            <img className='focused light' src={FocusedLight} />
            <img className='focused sepia' src={FocusedSepia} />

            <img className='type dark' src={TypeDark} />
            <img className='type light' src={TypeLight} />
            <img className='type sepia' src={TypeSepia} />

            <img className='features dark' src={BigDiamondDark} />
            <img className='features light' src={BigDiamondLight} />
            <img className='features sepia' src={BigDiamondSepia} />

            <img className='highlights dark' src={HighlightDark} />
            <img className='highlights light' src={HighlightLight} />
            <img className='highlights sepia' src={HighlightSepia} />

            <img className='tags dark' src={TagsDark} />
            <img className='tags light' src={TagsLight} />
            <img className='tags sepia' src={TagsSepia} />
          </div>

          <div className={classNames(copyWrapper, 'specificity')}>
            <h5>headinggggggggg</h5>
            <p>This is a paragraph explaining why things are so interesting</p>
            <p className="small">
              this is a smaller paragraph so let's get excited!{' '}
              <ArrowLink
                onClick={handleClick}
                href={`${PREMIUM_URL}12`}
                // aria-label={translate('upsell.upgrade')}
                target="_blank">
                {/*'upsell.pocketPremium'*/}
                Pocket Premium
              </ArrowLink>
            </p>
          </div>

          <div className={buttonWrapper}>
            <Button
              onClick={handleClick}
              target="_blank"
              // aria-label={translate('upsell.upgrade')}
              href={`${PREMIUM_URL}12`}>Upgrade</Button>
          </div>
        </div>
      </aside>
    </VisibilitySensor>
  )
}
