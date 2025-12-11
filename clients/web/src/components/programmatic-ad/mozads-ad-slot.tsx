'use client'

import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'

const programmaticAdWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > .label {
    font-family: var(--fontSansSerif);
    font-size: 0.85rem;
    line-height: 100%;
    color: var(--color-textTertiary);
    text-align: center;
    margin: 0;
    padding: 0.5rem 0;
    width: 100%;
  }
`

// Syndicated Article MozAds placements
export enum Placements {
  ABOVE_THE_FOLD = 'pocket_billboard_1',
  BELOW_THE_FOLD = 'pocket_billboard_2',
  ABOVE_THE_FOLD_MOBILE = 'pocket_rectangle_1',
  BELOW_THE_FOLD_MOBILE = 'pocket_rectangle_2',
  RIGHT_RAIL_1 = 'pocket_skyscraper_1',
  RIGHT_RAIL_2 = 'pocket_skyscraper_2'
}


export function AdSlot({
  instanceStyles,
}: {
  placement?: Placements
  targeting?: any
  instanceStyles?: string
  isMock?: boolean
}) {
  const { t } = useTranslation()
  const adLabel = t('ad:label', 'Advertisement')

  return (
    <div className={`${programmaticAdWrapperStyles} syndication-ad ${instanceStyles}`}>
      <p className="label">{adLabel}</p>
    </div>
  )
}
