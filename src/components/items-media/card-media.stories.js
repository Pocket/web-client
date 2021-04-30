import { CardMedia } from 'components/media/card-media'
import { css } from 'linaria'

const imageWrapper = css`
  width: 500px;
`

export default {
  title: 'Card/Media',
  component: CardMedia
}

const Template = (args) => (
  <div className={imageWrapper}>
    <CardMedia {...args}></CardMedia>
  </div>
)

export const ValidImage = Template.bind({})

ValidImage.args = {
  image_src: 'https://picsum.photos/seed/picsum/600/400',
  title: 'Random Picsum',
  id: 1
}

export const BrokenImage = Template.bind({})
BrokenImage.args = {
  image_src: 'https://i.picsum.photos/id/237/600/400.png',
  title: 'Borked Image',
  id: 2
}

export const NoImage = Template.bind({})
NoImage.args = {
  image_src: '',
  title: 'No Image',
  id: 3
}

export const NonWordTitle = Template.bind({})
NonWordTitle.args = {
  image_src: '',
  title: "'Quote'",
  id: 4
}
