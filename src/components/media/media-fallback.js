import { useEffect, useState } from 'react'
import { css } from 'linaria'
import { size025 } from '@pocket/web-ui'
import { fontSerifAlt } from '@pocket/web-ui'

/**
 * TODO:
 * - Connect on a better way to use these from web-ui
 * - Possibly move this entire hook to web-ui
 * - REMOVE Color declarations from here once this is worked out
 * NOTE: Blocking dev with lib updates is a challenge worth solving
 */
const _colorCoral = '#EF4056'
const _colorTeal = '#1CB0A8'
const _colorAmber = '#FCB643'
const _colorMint = '#00CB77'

const imageBlockBefore = {
  // transition: 'background-color 300ms linear',
  content: '""',
  overflow: 'hidden',
  display: 'block',
  left: '0',
  padding: '10px',
  position: 'absolute',
  top: '0',
  bottom: '0',
  width: '100%',
  borderRadius: size025,
  zIndex: '-1'
}

const imageBlockAfter = {
  // transition: 'opacity 300ms linear',
  backgroundColor: 'transparent',
  color: 'var(--fallbackColor)',
  content: 'var(--fallbackLetter)',
  fontSize: '18rem',
  fontWeight: '500',
  fontFamily: fontSerifAlt,
  zIndex: '-1',
  position: 'absolute',
  top: '-4rem',
  left: '-1rem'
}

const fallbackStyle = css`
  position: relative;
  &::before {
    ${imageBlockBefore};
    background-color: var(--fallbackBackground);
  }
  &::after {
    ${imageBlockAfter};
    opacity: 1;
  }
`

const pendingStyle = css`
  position: relative;
  &::before {
    ${imageBlockBefore};
    background-color: var(--color-dividerTertiary);
  }
  &::after {
    ${imageBlockAfter};
    opacity: 0;
  }
`

const imageStyled = {
  pending: pendingStyle,
  missing: fallbackStyle,
  loaded: null
}

/**
 * Avoid non alphanmericals
 * @param {string} word
 */
function getFirstLetter(word) {
  const firstLetterRegEx = /^(\W?)(\w)?/gu
  const firstLetter = firstLetterRegEx.exec(word)[2]
  return firstLetter ? firstLetter.toUpperCase() : false
}

/**
 * Get a consistent color based on the item_id This should allow us
 * to be consistent across platforms (in theory)
 * @param {string} id
 */
function colorFromId(id) {
  const colorArray = [
    _colorCoral,
    _colorTeal,
    _colorAmber,
    _colorMint,
    _colorAmber,
    _colorMint,
    _colorCoral,
    _colorTeal
  ]
  const idInt = parseInt(id, 10) // Item Id may not be an int
  const colorIndex = idInt % colorArray.length
  return colorArray[colorIndex || 0]
}

/**
 * Hook to provide a fallback image when images don't load or are absent.
 * Returns null for class when load is succesful in order to avoid opacity collisions
 * @param {string} image_src
 * @param {string} title
 * @param {string} id
 */
export const useFallback = (image_src, title, id) => {
  // start as pending and transition to either loaded or missing
  const [imageState, setImageState] = useState('pending')

  useEffect(() => {
    const loader = document.createElement('img')
    const onError = () => setImageState('missing')
    const onComplete = () => {
      setImageState('loaded')
      removeListeners()
    }

    // Cleanup Function
    const removeListeners = () => {
      loader.removeEventListener('load', onComplete)
      loader.removeEventListener('complete', onComplete)
      loader.removeEventListener('error', onError)
    }

    loader.addEventListener('load', onComplete)
    loader.addEventListener('complete', onComplete)
    loader.addEventListener('error', onError)
    loader.src = image_src

    return function cleanup() {
      removeListeners()
      loader.src = ''
    }
  }, [image_src])

  const letter = getFirstLetter(title)
  const color = colorFromId(id)

  return {
    letter,
    color,
    fallbackClass: imageStyled[imageState]
  }
}
