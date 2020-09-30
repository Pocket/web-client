// We can remove this in favor of the web-ui version.
// Remove instead of implementing
import React, { Component } from 'react'
import { css } from 'linaria'
import { getImageCacheUrl } from 'common/utilities'

const avatarWrapper = css`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  overflow: hidden;
  display: inline-block;
  filter: brightness(94%) saturate(108%);
`

export class Avatar extends Component {
  get avatarURL() {
    const { size = 24 } = this.props
    return getImageCacheUrl(this.props.avatar, { height: size, width: size })
  }

  render() {
    const { size = 24, margin = 0 } = this.props
    const radius = Math.floor(size / 2)
    return (
      <div
        className={avatarWrapper}
        style={{
          backgroundImage: `url('${this.avatarURL}')`,
          height: `${size}px`,
          width: `${size}px`,
          borderRadius: `${radius}px`,
          margin
        }}
      />
    )
  }
}
