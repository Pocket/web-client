import { useSelector } from 'react-redux'
import { getTimeOfDay } from 'common/utilities/date-time/date-time'
import { css } from 'linaria'
import { useTranslation, Trans } from 'next-i18next'

const homeCollections = css`
  font-family: 'Graphik Web';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2;
  padding: 2.5rem 0 1rem;
`

export const HomeGreeting = () => {
  const { t } = useTranslation()
  const recentSaves = useSelector((state) => state.home.recentSaves)

  const firstName = useSelector((state) => state.userProfile.first_name)
  const timeOfDay = getTimeOfDay()

  const noNameGreeting = {
    morning: t('home:good-morning', 'Good morning!'),
    afternoon: t('home:good-afternoon', 'Good afternoon!'),
    evening: t('home:good-evening', 'Good evening!')
  }

  const withNameGreeting = {
    morning: (
      <Trans i18nKey="home:good-morning-name" firstName={firstName}>
        Good morning, {{ firstName }}!
      </Trans>
    ),
    afternoon: (
      <Trans i18nKey="home:good-afternoon-name" firstName={firstName}>
        Good afternoon, {{ firstName }}!
      </Trans>
    ),
    evening: (
      <Trans i18nKey="home:good-evening-name" firstName={firstName}>
        Good evening, {{ firstName }}!
      </Trans>
    )
  }

  const showName = firstName && firstName.length < 30
  const greeting = showName ? withNameGreeting[timeOfDay] : noNameGreeting[timeOfDay]

  return recentSaves?.length > 0 ? <div className={homeCollections}>{greeting}</div> : null
}
