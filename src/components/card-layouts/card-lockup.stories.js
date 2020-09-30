import { Card } from 'components/card/card'
import response from 'mock/discover.json'
import { cardLockup } from './card-lockup'

import { deriveItemData } from 'connectors/discoverItems/items.state'

const items = deriveItemData(response.feed)

export default {
  title: 'Components/Card Layouts/cardLockup'
}

export const Center = () => {
  const list = items.slice(0, 5)
  return (
    <div className={`${cardLockup} heroCenter`}>
      {list.map((item) => (
        <Card item={item} />
      ))}
    </div>
  )
}

export const Left = () => {
  const list = items.slice(0, 5)
  return (
    <div className={`${cardLockup} heroLeft`}>
      {list.map((item) => (
        <Card item={item} />
      ))}
    </div>
  )
}

export const Right = () => {
  const list = items.slice(0, 5)
  return (
    <div className={`${cardLockup} heroRight`}>
      {list.map((item) => (
        <Card item={item} />
      ))}
    </div>
  )
}
