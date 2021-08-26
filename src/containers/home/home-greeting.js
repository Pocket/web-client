import { useSelector } from 'react-redux'
import { useTranslation, Trans } from 'next-i18next'
import { getTimeOfDay } from 'common/utilities'
import { CardPageHeader } from 'components/headers/discover-header'

export const HomeGreeting = () => {
  const { t } = useTranslation()

  const firstName = useSelector((state) => state.user.first_name)
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const timeOfDay = getTimeOfDay()

  const noNameGreeting = {
    morning: t('home:good-morning', 'Good morning!'),
    afternoon: t('home:good-afternoon', 'Good afternoon!'),
    evening: t('home:good-evening', 'Good evening!')
  }

  const withNameGreeting = {
    morning: <Trans i18nKey="home:good-morning-name" firstName={firstName}>Good morning, {{firstName}}!</Trans>,
    afternoon: <Trans i18nKey="home:good-afternoon-name" firstName={firstName}>Good afternoon, {{firstName}}!</Trans>,
    evening: <Trans i18nKey="home:good-evening-name" firstName={firstName}>Good evening, {{firstName}}!</Trans>
  }

  const showName = firstName && firstName.length < 15
  const greeting = showName ? withNameGreeting[timeOfDay] : noNameGreeting[timeOfDay]

  const description =
    pinnedTopics?.length === 0
      ? t('home:select-topics', 'Select topics to see popular articles and our editors’ top picks.')
      : null

  return <CardPageHeader title={greeting} subHeading={description} />
}
