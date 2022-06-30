import { Button as Component } from './button'

export default {
  title: 'Components/Button',
  component: Component,
  argTypes: {
    onClick: { action: 'clicked' },
    buttoncopy: {
      type: 'string'
    },
    children: {
      table: {
        disable: true
      }
    }
  }
}

const Template = ({ buttoncopy, ...rest }) => <Component {...rest}>{buttoncopy}</Component>

export const Button = Template.bind({})
Button.args = {
  buttoncopy: 'Item One'
}
