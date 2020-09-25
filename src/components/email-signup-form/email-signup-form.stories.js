import React from 'react'
import { text, boolean } from '@storybook/addon-knobs'
import defineKnobs from 'knobs'

import EmailSignupForm from './email-signup-form'

const emailSignupFormKnobs = defineKnobs(props => {
  return {
    isProcessing: boolean('isProcessing', props.isProcessing),
    errorMessage: text('errorMessage', props.errorMessage),
    hideCaptchaBadge: boolean('hideCaptchaBadge', props.hideCaptchaBadge),
    inputLabel: text('inputLabel', props.inputLabel),
    buttonLabel: text('buttonLabel', props.buttonLabel),
    showCheckbox: boolean('showCheckbox', props.showCheckbox),
    checkboxLabel: text('checkboxLabel', props.checkboxLabel)
  }
})

export default {
  title: 'Components/EmailSignupForm',
  decorators: [emailSignupFormKnobs],
  component: EmailSignupForm
}

export const standard = () => {
  return <EmailSignupForm instanceId="email-signup-form-story" />
}
