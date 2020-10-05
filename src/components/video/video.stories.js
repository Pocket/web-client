import { Video } from './video'

export default {
  title: 'Components/Video'
}

const YT_DATA = {
  "item_id": "1651062148",
  "video_id": "1",
  "src": "http://www.youtube.com/watch?v=Jx4okVd3K14",
  "width": "0",
  "height": "0",
  "type": "1",
  "vid": "Jx4okVd3K14",
  "length": "234"
}
export const videoYoutube = () => <Video videoData={YT_DATA} />


const VIMEO_DATA = {
  "item_id": "2572941769",
  "video_id": "1",
  "src": "http://vimeo.com/play_redirect?clip_id=331849386&quality=hd",
  "width": "0",
  "height": "0",
  "type": "2",
  "vid": "331849386",
  "length": "4128"
}
export const videoVimeo = () => <Video videoData={VIMEO_DATA} />
