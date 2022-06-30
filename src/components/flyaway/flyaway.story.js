import { Flyaway as Component } from './flyaway'

export default {
  title: 'Components/Flyaway',
  component: Component
}

export const Flyaway = (args) => <Component {...args} />
Flyaway.args = {
  title: 'Flyaway title',
  description: 'Description of the flyaway message',
  show: true
}
