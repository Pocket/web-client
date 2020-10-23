import { DisplaySettings } from './display-settings'
import { useState } from 'react'

export default {
  title: 'Components/DisplaySettings'
}

const DisplaySettingsWrapper = ({ isPremium, forceShow }) => {
  const [fontFamily, setFontFamily] = useState('blanco')
  const [fontSize, setFontSize] = useState(4)
  const [lineHeight, setLineHeight] = useState(4)
  const [columnWidth, setColumnWidth] = useState(4)

  return (
    <div style={{ float: 'right', marginRight: 50 }}>
      <DisplaySettings
        appRootSelector="#root"
        isPremium={isPremium}
        forceShow={forceShow}
        columnWidth={columnWidth}
        lineHeight={lineHeight}
        fontSize={fontSize}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        setFontSize={setFontSize}
        setLineHeight={setLineHeight}
        setColumnWidth={setColumnWidth}
      />
    </div>
  )
}

export const displaySettings = () => <DisplaySettingsWrapper forceShow />

export const displaySettingsPremium = () => (
  <DisplaySettingsWrapper isPremium forceShow />
)

export const fullExperience = () => <DisplaySettingsWrapper isPremium />
