export const shortcutActions = {
  'shortcut': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button',
    },
    expects: ['value', 'label'],
    description: 'Fired when a user completes a keyboard shortcut; value is the key combination, label is how the action is described in the Shortcuts menu'
  }
}
