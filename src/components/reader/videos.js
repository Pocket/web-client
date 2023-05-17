import ReactDOM from 'react-dom/client'
import { Video } from 'components/video/video'
import { waitForElement } from 'common/utilities/elements/wait-for-element'

async function replaceVideo(video) {
  const videoID = video.video_id || video.videoId
  const elementID = `RIL_VIDEO_${videoID}`
  const element = document.getElementById(elementID) || (await waitForElement(`#${elementID}`))

  if (element) {
    const root = ReactDOM.createRoot(element)
    root.render(<Video videoData={video} />)
  }
}

export function loadParsedVideos(videos) {
  Object.keys(videos).map((videoKey) => replaceVideo(videos[videoKey]))
}
