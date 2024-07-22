import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { getTimeOfDay } from 'common/utilities/date-time/date-time'
import { css } from '@emotion/css'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'

const homeGreeting = css`
  font-family: 'Graphik Web';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2;
  padding-top: 2.5rem; // can't use padding, will override SectionWrapper's css
  padding-bottom: 1rem;
`

export const HomeGreeting = () => {
  const { t } = useTranslation()
  const firstName = useSelector((state) => state.userProfile.first_name)
  const timeOfDay = getTimeOfDay()

  const noNameGreeting = {
    morning: t('home:good-morning', 'Good morning!'),
    afternoon: t('home:good-afternoon', 'Good afternoon!'),
    evening: t('home:good-evening', 'Good evening!')
  }

  const withNameGreeting = {
    morning: t('home:good-morning-name', 'Good morning, {{firstName}}!', { firstName }),
    afternoon: t('home:good-afternoon-name', 'Good afternoon, {{firstName}}!', { firstName }),
    evening: t('home:good-evening-name', 'Good evening, {{firstName}}!', { firstName })
  }

  const showName = firstName && firstName.length < 30
  const greeting = showName ? withNameGreeting[timeOfDay] : noNameGreeting[timeOfDay]

  return <SectionWrapper className={homeGreeting}>{greeting}</SectionWrapper>
}
