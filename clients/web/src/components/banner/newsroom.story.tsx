import { BannerNewsroom as Component } from './newsroom'

export default {
  title: 'Components/Banner',
  component: Component
}

const Template = (args) => <Component {...args} />
export const BannerNewsroom = Template.bind({})
