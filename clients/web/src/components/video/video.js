import { css } from '@emotion/css'

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

const getVideoType = (type) => {
  switch (type) {
    case '1':
    case 'YOUTUBE': {
      return 'https://www.youtube-nocookie.com/embed/'
    }
    case '2':
    case '3':
    case 'VIMEO': {
      return 'https://player.vimeo.com/video/'
    }
    default: {
      break
    }
  }
}

export const Video = ({ videoData }) => {
  const id = videoData.vid
  const type = videoData.type
  const videoType = getVideoType(type)
  const src = `${videoType}${id}?autoplay=0&dnt=1`

  return (
    <div className={videoWrapper}>
      <iframe
        className="player"
        title="pocket-video-frame"
        src={src}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; modestbranding; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  )
}
