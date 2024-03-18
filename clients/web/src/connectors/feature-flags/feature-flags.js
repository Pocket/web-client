import React from 'react'
import { useSelector } from 'react-redux'

export function FeatureFlag({ children, flag }) {
  const featureState = useSelector((state) => state.features)
  const isActive = featureFlagActive({ flag, featureState })
  return isActive ? <>{children}</> : null
}

// Flag active selector
export function featureFlagActive({ flag, featureState: features }) {
  const flags = flag.isArray ? flag : [flag]

  const activeFeatures = Object.keys(features)
    .filter((feature) => flags.includes(features[feature].name))
    .filter((feature) => features[feature].active)

  return !!activeFeatures.length
}
