import React from 'react'
import EmailSignupForm from './email-signup-form'

export default {
  title: 'Forms/Email Signup Form',
  component: EmailSignupForm
}

export const standard = () => {
  return <EmailSignupForm instanceId="email-signup-form-story" />
}
