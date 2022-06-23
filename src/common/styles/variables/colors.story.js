import { useRef, useState } from 'react'
import { _colorPalette } from './colors'
import { _colorModes } from './colors'
import { css } from 'linaria'
import copy from 'clipboard-copy'

export default {
  title: 'UI/Colors'
}

export const Palette = () => {
  let colorPalette = mapColorsForDisplay(_colorPalette)
  return <div className={colorDisplay}>{colorPalette}</div>
}

export const Semantic = (Story, context) => {
  let colorModes = mapColorsForDisplay(_colorModes, context.globals.theme)
  return <div className={colorDisplay}>{colorModes}</div>
}

const colorDisplay = css`
  padding: 0 2rem;
  font-family: var(--fontSansSerif);
  .colorBlock {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.25rem;
  }
  .group {
    font-size: 1.6em;
    margin: 1em 0 0.5em;
  }
  .color {
    position: relative;
    padding: 1rem 2rem;
    margin: 0.5rem;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    &:hover {
      cursor: pointer;
      outline: solid var(--color-calloutAccent);
    }
  }
  .copied {
    position: absolute;
    right: 2rem;
    top: 50%;
    font-style: italic;
    font-weight: 300;
  }
`

function mapColorsForDisplay(colors, theme) {
  let group, previousGroup
  let printGroup = false

  return Object.keys(colors).map((colorKey) => {
    const hex = colors[colorKey]
    const naturalName = camelToSentence(colorKey)
    group = naturalName.replace(/ .*/, '')

    printGroup = group !== previousGroup
    previousGroup = group

    return (
      <div key={colorKey}>
        {printGroup ? <h4 className="group">{group}</h4> : null}
        <ColorBlock hex={hex} colorKey={colorKey} theme={theme} />
      </div>
    )
  })
}

const ColorBlock = ({ hex, colorKey, theme }) => {
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

  return (
    <div
      className="color"
      onClick={colorCopy}
      style={{ backgroundColor: colorVar, color: textColor }}>
      <div className="copy">
        <div>{naturalName}</div>
        <div>{colorValue}</div>
        {copied ? <div className="copied">{`Copied — ${colorKey}`}</div> : null}
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
