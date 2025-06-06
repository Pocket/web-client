'use client'

import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'

import { MozAdsPlacement } from '@mozilla-services/majc/dist/react'
import { IABFixedSize, MozAdsSize } from '@mozilla-services/majc/dist/core'

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

const placementSizes: Record<string, MozAdsSize> = {
  pocket_billboard_1: IABFixedSize.Billboard,
  pocket_billboard_2: IABFixedSize.Billboard,
  pocket_mrec_1: IABFixedSize.MediumRectangle,
  pocket_mrec_2: IABFixedSize.MediumRectangle,
  pocket_skyscraper_1: IABFixedSize.Skyscraper,
  pocket_skyscraper_2: IABFixedSize.Skyscraper
}

export function AdSlot({
  placement,
  targeting,
  instanceStyles,
  isMock = false
}: {
  placement: Placements
  targeting?: any
  instanceStyles?: string
  isMock: boolean
}) {
  const placementId = `${isMock ? 'mock_' : ''}${placement.toString()}`
  const { t } = useTranslation()
  const adLabel = t('ad:label', 'Advertisement')
  const fixedSize = placementSizes[placementId]

  return (
    <div className={`${programmaticAdWrapperStyles} syndication-ad ${instanceStyles}`}>
      <MozAdsPlacement
        placementId={placementId}
        iabContent={{
          taxonomy: 'IAB-1.0',
          categoryIds: [targeting.iabTopCategoryId, targeting.iabSubCategoryId]
        }}
        fixedSize={fixedSize}
      />
      <p className="label">{adLabel}</p>
    </div>
  )
}
