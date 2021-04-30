import { css } from 'linaria'
import { useSelector } from 'react-redux'
import { getTimeOfDay } from 'common/utilities'

const homeCollections = css`
  font-family: 'Graphik Web';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 0;
`

export const HomeGreeting = () => {
  const firstName = useSelector((state) => state.user.first_name)

  const timeOfDay = getTimeOfDay()
  const greeting = firstName
    ? `Good ${timeOfDay}, ${firstName}!`
    : `Good ${timeOfDay}!`

  return (
    <div className={homeCollections}>
      {greeting}
    </div>
  )
}
