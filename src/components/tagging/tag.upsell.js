import React, { Component } from 'react'
import { css } from 'linaria'
import { ArrowLink } from 'components/arrow-link/arrow-link'
import { DivideHorizontal } from 'components/divider/divider'
import { PREMIUM_URL } from 'common/constants'
import { PremiumIcon } from '@pocket/web-ui'

const upsellWrapper = css`
  font-family: 'Graphik Web';
  font-size: 16px;
  font-weight: 500;
  line-height: 130%;
  padding: var(--spacing075) 0;
  width: 100%;

  p {
    line-height: 130%;
    font-weight: 400;
    font-size: 16px;
    margin: 0px;
    color: var(--color-textSecondary);
    svg {
      width: 19px;
      height: 17.5px;
      margin-right: 5px;
    }
  }
`

export class TagUpsell extends Component {
  // componentDidMount() {
  //   this.sendTrackClick('view_suggested_tag_upsell')
  // }

  // sendTrackClick = (identifier) => {
  //   let page = (window.location.pathname.indexOf('/read/') !== -1)
  //     ? 'reader'
  //     : 'list'

  //   this.props.trackClick({
  //     view: 'web',
  //     section: '/premium',
  //     identifier,
  //     page
  //   })
  // }

  // trackPremiumClick = () => {
  //   this.sendTrackClick('click_suggested_tag_upsell')
  // }

  render() {
    return (
      <React.Fragment>
        <DivideHorizontal margin='17px 0 0 0' />
        <div className={upsellWrapper}>
          <p>
            <PremiumIcon />
            {/*'tagging.upsell.message'*/}
            Tag stories faster than ever—get tag suggestions with.
          </p>
          <ArrowLink
            // onClick={this.trackPremiumClick}
            margin='10px 0'
            href={`${PREMIUM_URL}13`}
            target='_blank'>
            {/*'tagging.upsell.cta'*/}
            Pocket Premium
          </ArrowLink>
        </div>
      </React.Fragment>
    )
  }
}
