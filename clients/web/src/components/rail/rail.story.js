import { Rail as Component } from './rail'

export default {
  title: 'Components/Rail',
  component: Component
}

const Template = (args) => <Component {...args}>👀 Peek!</Component>
export const Rail = Template.bind({})
Rail.args = {
  visible: true
}
