import { ProgressPill as Component } from './progress-pill'

export default {
  title: 'Components/Progress Pill',
  components: ProgressPill,
  argTypes: {
    current: {
      control: {
        type: 'range',
        options: {
          min: 0,
          max: 100,
          step: 1
        }
      }
    },
    total: {
      table: {
        disable: true
      }
    }
  }
}

export const ProgressPill = (args) => <Component {...args} />
ProgressPill.args = { total: 100, current: 70 }
