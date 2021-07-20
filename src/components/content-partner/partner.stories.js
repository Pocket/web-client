import React from 'react'
import { Partner } from './partner'

export default {
  title: 'Article/Partnership Info',
  component: Partner
}

const partnerInfo = {
  name: 'Mozilla',
  url: 'http://www.mozilla.org',
  imageUrl: 'http://placekitten.com/150/150',
  type: 'partner'
}

const sponsorInfo = {
  ...partnerInfo,
  type: 'sponsor'
}

export const partner = () => {
  return (
    <Partner partnerInfo={partnerInfo} />
  )
}

export const sponsor = () => {
  return (
    <Partner partnerInfo={sponsorInfo} />
  )
}
