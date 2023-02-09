import { CallOutPocketHitsSignup } from './call-out-pocket-hits'

export default {
  title: 'Messaging/Pocket Hits',
  component: CallOutPocketHitsSignup
}

export const normal = () => {
  return <CallOutPocketHitsSignup />
}

export const isProcessing = () => {
  return <CallOutPocketHitsSignup isProcessing />
}

export const isSuccessful = () => {
  return <CallOutPocketHitsSignup isSuccessful />
}
