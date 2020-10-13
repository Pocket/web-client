import { DisplaySettings } from './display-settings'

export default {
  title: 'Components/DisplaySettings'
}

export const displaySettings = () => (
  <div style={{ float: 'right', marginRight: 50 }}>
    <DisplaySettings appRootSelector="#root" />
  </div>
)

export const displaySettingsPremium = () => (
  <div style={{ float: 'right', marginRight: 50 }}>
    <DisplaySettings appRootSelector="#root" isPremium />
  </div>
)
