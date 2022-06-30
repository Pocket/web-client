import { Partner as Component } from './partner'

export default {
  title: 'Article/Partnership Info',
  component: Component
}

const partnerInfo = {
  name: 'Mozilla',
  url: 'http://www.mozilla.org',
  imageUrl: 'http://placekitten.com/150/150',
  type: 'PARTNERED'
}

const sponsorInfo = {
  ...partnerInfo,
  type: 'SPONSORED'
}

export const partner = () => {
  return <Component partnerInfo={partnerInfo} />
}

export const sponsor = () => {
  return <Component partnerInfo={sponsorInfo} />
}
