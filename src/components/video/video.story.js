import { Video as Component } from './video'

export default {
  title: 'Components/Video',
  component: Component,
  argTypes: {
    selectedVideo: {
      options: ['youTube', 'vimeo'],
      type: 'select'
    }
  }
}

const videos = {
  youTube: {
    item_id: '1651062148',
    video_id: '1',
    src: 'http://www.youtube.com/watch?v=Jx4okVd3K14',
    width: '0',
    height: '0',
    type: '1',
    vid: 'Jx4okVd3K14',
    length: '234'
  },
  vimeo: {
    item_id: '2572941769',
    video_id: '1',
    src: 'http://vimeo.com/play_redirect?clip_id=331849386&quality=hd',
    width: '0',
    height: '0',
    type: '2',
    vid: '331849386',
    length: '4128'
  }
}

const Template = (args) => {
  const { selectedVideo } = args
  return <Component videoData={videos[selectedVideo]} />
}
export const Video = Template.bind({})
Video.args = {
  selectedVideo: 'youTube'
}
