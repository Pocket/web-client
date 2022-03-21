export const pocketHitsActions = {
  'pocket-hits.signup': {
    eventType: 'objectUpdate',
    entityTypes: ['newsletterSubscriber'],
    eventData: {
      object: 'newsletter_subscriber',
      trigger: 'newsletter_signup'
    },
    expects: ['email', 'locale']
  }
}
