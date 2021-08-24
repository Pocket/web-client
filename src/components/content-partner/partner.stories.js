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
  type: 'PARTNERED'
}

const sponsorInfo = {
  ...partnerInfo,
  type: 'SPONSORED'
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
