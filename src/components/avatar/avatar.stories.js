import { Avatar } from './avatar'

export default {
  title: 'Components/Avatar'
}

const Template = (args) => <Avatar {...args} />

export const normal = Template.bind({})
normal.args = {
  avatar: 'https://picsum.photos/seed/picsum/600/400',
  size: 100,
  margin: '30px 40px'
}
