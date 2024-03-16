import { AvatarButton as Component } from './avatar-button'

export default {
  title: 'Components/Avatar',
  component: Component,
  argTypes: {
    onClick: { action: 'clicked' },
    buttonCopy: {
      type: 'string'
    },
    children: {
      table: {
        disable: true
      }
    }
  }
}

const Template = (args) => <Component {...args} />
export const Avatar = Template.bind({})
Avatar.args = {
  src: 'https://i.pravatar.cc/300?img=50'
}
