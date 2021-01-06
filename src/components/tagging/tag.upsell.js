import React, { Component } from 'react'
import { css } from 'linaria'
import { ArrowLink } from 'components/arrow-link/arrow-link'
import { DivideHorizontal } from 'components/divider/divider'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
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

export const TagUpsell = ({ onVisible }) => {

  const handleVisible = () => onVisible('suggested-tags.upgrade-link')

  return (
    <VisibilitySensor onVisible={handleVisible}>
      <div className={upsellWrapper}>
        <p>
          <PremiumIcon />
          Tag stories faster than ever—get tag suggestions with.
        </p>
        <ArrowLink
          id="suggested-tags.upgrade-link"
          margin="10px 0"
          href={`${PREMIUM_URL}13`}
          target="_blank">
          Pocket Premium
        </ArrowLink>
      </div>
    </VisibilitySensor>
  )
}
