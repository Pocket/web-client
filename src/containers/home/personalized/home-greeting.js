import { useSelector } from 'react-redux'
import { getTimeOfDay } from 'common/utilities'
import { css } from 'linaria'

const homeCollections = css`
  font-family: 'Graphik Web';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2;
  padding: 2.5rem 0 1rem;
`

export const HomeGreeting = () => {
  const firstName = useSelector((state) => state.user.first_name)
  const timeOfDay = getTimeOfDay()

  const showName = firstName && firstName.length < 30
  const greeting = showName ? `Good ${timeOfDay}, ${firstName}!` : `Good ${timeOfDay}!`

  return <div className={homeCollections}>{greeting}</div>
}
