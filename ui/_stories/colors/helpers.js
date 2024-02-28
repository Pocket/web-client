import { useRef, useState } from 'react'
import copy from 'clipboard-copy'
import { css } from '@emotion/css'

export const colorGroups = css`
  font-family: var(--fontSansSerif);
  h4 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
  }

  .colorset {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    margin-bottom: 2rem;
  }
  .colorblock {
    margin-bottom: 0.25rem;
    position: relative;
    padding: 0.725rem;
    border-radius: var(--borderRadius);
    &:hover {
      cursor: pointer;
      outline: solid var(--color-calloutAccent);
    }
  }
  .copy {
    display: flex;
    justify-content: space-between;
  }
  .copied {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

export const GroupHeading = ({ title, description }) => {
  return (
    <>
      <h4>{title}</h4>
      {description ? <p>{description}</p> : null}
    </>
  )
}

export const ColorsGrid = ({ colors, theme }) => {
  return Object.keys(colors).map((colorKey) => (
    <ColorBlock
      className="colorblock"
      key={colorKey}
      colorKey={colorKey}
      hex={colors[colorKey]}
      theme={theme}
    />
  ))
}

export const ColorBlock = ({ hex, colorKey, theme }) => {
  const [copied, setCopied] = useState(false)
  const colorHex = theme ? hex[theme] : hex
  const naturalName = camelToSentence(colorKey)

  const textColor = contrastText(colorHex, theme)
  const colorValue = colorHex
  const colorVar = `var(--color-${colorKey})`

  let timer = useRef()

  const colorCopy = () => {
    copy(colorVar)
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const isText = isTextColor(colorKey)

  const blockStyle = {
    backgroundColor: isText ? 'var(--color-canvas)' : colorVar,
    color: isText ? colorVar : textColor
  }
  return (
    <div className="colorblock" onClick={colorCopy} style={blockStyle}>
      <div className="copy">
        <div>{naturalName}</div>
        <div>{colorValue}</div>
        {copied ? <div className="copied">Copied</div> : null}
      </div>
    </div>
  )
}

function camelToSentence(camelString) {
  const withSpaces = camelString.replace(/([A-Z0-9]+)/g, ' $1')
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5624139#5624139
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

// https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors/9733420#9733420
function luminance({ r, g, b }) {
  var a = [r, g, b].map(function (v) {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

function ratioCheck(copy, background) {
  const copyRGB = hexToRgb(copy)
  const backgroundRGB = hexToRgb(background)

  // calculate the relative luminance
  const copyLuminance = luminance(copyRGB)
  const backgroundLuminance = luminance(backgroundRGB)

  // calculate the color contrast ratio
  const ratio =
    copyLuminance > backgroundLuminance
      ? (backgroundLuminance + 0.05) / (copyLuminance + 0.05)
      : (copyLuminance + 0.05) / (backgroundLuminance + 0.05)

  return ratio < 1 / 4 // AA level
}

function contrastText(hex, theme) {
  const isDark = theme === 'dark'
  const startingColor = isDark ? '#fff' : '#000'
  const hasContrast = ratioCheck(startingColor, hex)
  if (hasContrast) return startingColor
  if (isDark) return '#000'
  return '#fff'
}

function isTextColor(colorKey) {
  return /^text/gi.test(colorKey)
}
