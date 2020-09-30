import { ArrowLink } from './arrow-link'

export default {
  title: 'Components/ArrowLink'
}

const Template = (args) => <ArrowLink {...args}>Test Link</ArrowLink>

export const normal = Template.bind({})
normal.args = {
  href: 'https://getpocket.com/explore'
}

export const withMargin = Template.bind({})
withMargin.args = {
  href: 'https://getpocket.com/explore',
  margin: '100px 50px'
}
