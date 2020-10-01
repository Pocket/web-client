import { Card } from 'components/discover-card/card'
import response from 'mock/discover.json'
import { cardLockup } from './card-lockup'

import { deriveItemData } from 'connectors/discover-items/items.state'

const items = deriveItemData(response.feed)

export default {
  title: 'components/discover-card Layouts/cardLockup'
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
