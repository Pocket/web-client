import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { Banner } from 'components/best-of/banner'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { useInView } from 'react-intersection-observer'

export const BestOfBanner = () => {
  const dispatch = useDispatch()

  const translations = useTranslation()
  const { i18n } = translations
  const { language: locale } = i18n

  const featureState = useSelector((state) => state.features)
  const labEnrolled = featureFlagActive({ flag: 'lab', featureState })

  // Fire when item is in view
  const [viewRef, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  useEffect(() => {
    dispatch(sendSnowplowEvent('home.bestof.impression'))
  }, [inView, sendSnowplowEvent])

  const clickAction = () => dispatch(sendSnowplowEvent('home.bestof.engagement'))

  return labEnrolled ? (
    <SectionWrapper>
      <div ref={viewRef}>
        <Banner locale={locale} clickAction={clickAction} />
      </div>
    </SectionWrapper>
  ) : null
}
