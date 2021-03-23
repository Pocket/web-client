import React from 'react'
import { useSelector } from 'react-redux'

export function FeatureFlag({ children, flag, dev }) {
  const showDevTools = process.env.SHOW_DEV === 'included'
  const feature = useSelector((state) => state.features[flag])
  const isFeatureEnabled = dev
    ? showDevTools && feature?.assigned
    : feature?.assigned
  return isFeatureEnabled ? <>{children}</> : null
}

export function isEligible(birth, start) {
  const eligibleDate = new Date(start)
  const birthDate = new Date(birth)
  return eligibleDate - birthDate < 0
}
