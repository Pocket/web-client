import ReactDOM from 'react-dom'
import { Video } from 'components/video/video'

function replaceVideo(video) {
  const element = document.getElementById(`RIL_VIDEO_${video.video_id}`)
  if (element) {
    ReactDOM.render(
      <Video videoData={video} video_id={video.video_id} />,
      element
    )
  }
}

export function loadParsedVideos(videos) {
  Object.keys(videos).map((videoKey, index) => replaceVideo(videos[videoKey]))
}
