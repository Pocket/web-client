import React from 'react'
import ThemedImg from './themed-img'

import imageLight from 'static/images/internet-save-button.svg'
import imageDark from 'static/images/internet-save-button-dark-mode.svg'
import imageSepia from 'static/images/internet-save-button.svg'

export default {
  title: 'Components/ThemedImg',
  component: ThemedImg
}

export const fullSet = () => {
  return (
    <ThemedImg
      srcLight={imageLight}
      srcDark={imageDark}
      srcSepia={imageSepia}
    />
  )
}

export const lightMode = () => <ThemedImg srcLight={imageLight} />

export const darkMode = () => <ThemedImg srcDark={imageDark} />

export const sepiaMode = () => <ThemedImg srcSepia={imageSepia} />

export const noWrapper = () => (
  <ThemedImg srcLight={imageLight} useWrapper={false} />
)
