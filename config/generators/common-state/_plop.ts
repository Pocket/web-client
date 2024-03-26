import { validateFilename } from '../utilities'

export const statePlop = {
  description: 'Shared state for components',
  prompts: [
    {
      type: 'input',
      name: 'stateType',
      message: 'What will your state file be concerned with?',
      validate: validateFilename
    },
    {
      type: 'input',
      name: 'stateName',
      message: 'What is the name of the state you would like?',
      validate: validateFilename
    }
  ],
  actions: [
    {
      type: 'addMany',
      skipIfExists: true,
      destination: '../../common/state/{{ stateType }}-{{ stateName }}/',
      templateFiles: [
        'common-state/hydrate.tsx.hbs',
        'common-state/index.ts.hbs',
        'common-state/state.test.ts.hbs'
      ]
    }
  ]
}
