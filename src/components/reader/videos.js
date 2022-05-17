import ReactDOM from 'react-dom'
import { Video } from 'components/video/video'
import { waitForElement } from 'common/utilities'

async function replaceVideo(video) {
  const videoID = video.video_id || video.videoId
  const elementID = `RIL_VIDEO_${videoID}`
  const element = document.getElementById(elementID) || (await waitForElement(`#${elementID}`))

  if (element) {
    ReactDOM.render(<Video videoData={video} />, element)
  }
}

export function loadParsedVideos(videos) {
  Object.keys(videos).map((videoKey) => replaceVideo(videos[videoKey]))
}
