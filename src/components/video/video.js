import ReactPlayer from 'react-player'
import { css } from 'linaria'

//Padding Player ratio: 100 / (1280 / 720)
const videoWrapper = css`
  position: relative;
  padding-top: 56.25%;
  .player {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 8px;
    overflow: hidden;
  }
`

export const Video = ({ videoData }) => {
  // onReady = (a) => console.log('onReady', a)
  // onStart = () => console.log('onStart')
  // onRestart = () => console.log('onRestart')
  // onPause = () => console.log('onPause')
  // onBuffer = () => console.log('onBuffer')
  // // onSeek = (a, b, c) => console.log('onSeek', a, b, c) Broke; investigate
  // onEnded = () => console.log('onEnded')
  // onError = (err) => console.log('onError', err)

  // onProgress = ({ playedSeconds, played, loadedSeconds, loaded }) => console.log('onProgress')
  // onDuration = (seconds) => console.log('onDuration', seconds)

  const parsedVideoUrl = videoData.src
    .replace('play_redirect?clip_id=', '') //youtube
    .replace('&quality=hd', '') //vimeo

  return (
    <div className={videoWrapper}>
      <ReactPlayer
        controls
        className={'player'}
        url={parsedVideoUrl}
        width="100%"
        height="100%"
        // onReady={this.onReady}
        // onStart={this.onStart}
        // onPlay={this.onRestart}
        // onPause={this.onPause}
        // onBuffer={this.onBuffer}
        // onSeek={this.onSeek}
        // onEnded={this.onEnded}
        // onError={this.onError}
        // progressInterval={5000} // calls onProgress in ms
        // onProgress={this.onProgress}
        // onDuration={this.onDuration}
      />
    </div>
  )
}
