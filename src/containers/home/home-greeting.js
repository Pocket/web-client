import { useSelector } from 'react-redux'
import { getTimeOfDay } from 'common/utilities'
import { CardPageHeader } from 'components/headers/discover-header'

export const HomeGreeting = () => {
  const firstName = useSelector((state) => state.user.first_name)
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const timeOfDay = getTimeOfDay()

  const showName = firstName && firstName.length < 15
  const greeting = showName ? `Good ${timeOfDay}, ${firstName}!` : `Good ${timeOfDay}!`

  const description =
    pinnedTopics?.length === 0
      ? `Select topics to see popular articles and our editors’ top picks.`
      : null

  return <CardPageHeader title={greeting} subHeading={description} />
}
