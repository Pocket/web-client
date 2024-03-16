import { ArrowLink as Component } from './arrow-link'

export default {
  title: 'Components/ArrowLink',
  component: Component
}

const Template = (args) => <Component {...args}>Test Link</Component>

export const ArrowLink = Template.bind({})
ArrowLink.args = {
  href: 'https://getpocket.com/explore'
}
