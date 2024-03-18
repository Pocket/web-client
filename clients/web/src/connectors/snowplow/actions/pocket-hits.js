export const pocketHitsActions = {
  'pocket-hits.signup': {
    eventType: 'objectUpdate',
    entityTypes: ['newsletterSubscriber'],
    eventData: {
      object: 'newsletter_subscriber',
      trigger: 'newsletter_signup'
    },
    expects: ['email', 'locale'],
    description: 'Fired when a user submits an email address in the Pocket Hits module when signed out on /discover'
  }
}
