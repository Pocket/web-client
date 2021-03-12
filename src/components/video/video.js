import { css } from 'linaria'

//Padding Player ratio: 100 / (1280 / 720)
const videoWrapper = css`
  position: relative;
  padding-top: 56.25%;
  .player {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
`

export const Video = ({ videoData }) => {
  const id = videoData.vid
  const type = videoData.type
  const videoTypes = {
    1: 'https://www.youtube-nocookie.com/embed/',
    2: 'https://player.vimeo.com/video/',
    3: 'https://player.vimeo.com/video/'
  }

  return (
    <div className={videoWrapper}>
      <iframe
        className="player"
        title="pocket-video-frame"
        src={`${videoTypes[type]}${id}?autoplay=1&dnt=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; modestbranding; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  )
}
