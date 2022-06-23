import { ReportForm } from './report-form'

const reasons = [
  { id: 'broken_meta', label: 'The title, link, or image is broken' },
  { id: 'wrong_category', label: 'It’s in the wrong category' },
  { id: 'sexually_explicit', label: 'It’s sexually explicit' },
  { id: 'offensive', label: 'It’s rude, vulgar, or offensive' },
  { id: 'misinformation', label: 'It contains misinformation' },
  { id: 'other', label: 'Other' }
]

export default {
  title: 'Forms/Report',
  component: ReportForm,
  argTypes: {
    currentReason: {
      control: {
        type: 'select',
        options: reasons.map((reason) => reason.id)
      }
    },
    reasons: {
      table: {
        disable: true
      }
    },
    handleRadioChange: {
      table: {
        disable: true
      }
    },
    handleTextAreaChange: {
      table: {
        disable: true
      }
    }
  }
}

export const Report = (args) => <ReportForm {...args} reasons={reasons} />

Report.args = {
  success: false
}
