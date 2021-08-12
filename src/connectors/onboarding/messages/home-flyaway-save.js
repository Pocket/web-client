import { Flyaway } from 'components/flyaway/flyaway'

const title = 'Save articles you like'
const description = 'Browse the best articles from across the web. Click Save to read one later.'

export const HomeFlyawaySave = () => {
  return (
    <Flyaway title={title} description={description} />
  )
}
