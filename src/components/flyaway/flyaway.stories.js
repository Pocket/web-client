import { Flyaway } from './flyaway'

export default {
  title: 'Components/Flyaway',
  components: Flyaway,
}

export const Primary = (args) => <Flyaway {...args} />
Primary.args = { title: 'Flyaway title', description: 'Description of the flyaway message' }
