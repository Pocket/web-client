import { ReportForm } from './report-form'
import { useState } from 'react'
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
  component: ReportForm
}

export const Report = () => {
  const [currentReason, setCurrentReason] = useState('broken_meta')
  const [otherText, setOtherText] = useState('')

  const handleRadioChange = (e) => {
    setCurrentReason(e.target.value)
  }

  const handleTextAreaChange = (e) => {
    setOtherText(e.target.value)
  }

  return (
    <ReportForm
      currentReason={currentReason}
      otherText={otherText}
      handleTextAreaChange={handleTextAreaChange}
      handleRadioChange={handleRadioChange}
      reasons={reasons}
    />
  )
}

Report.parameters = {
  controls: { hideNoControlsWarning: true }
}
