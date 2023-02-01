import { GermanHomeBanner as Component } from './german-home'

export default {
  title: 'Components/Banner/German Home',
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
export const GermanHome = Template.bind({})

GermanHome.args = {}
