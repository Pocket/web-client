import { validateFilename } from '../utilities'
import type { PlopTypes } from '@turbo/gen'

type UIAnswers = {
  componentMain: string
  componentSubs: string
}

export const uiPlop: PlopTypes.PlopGeneratorConfig = {
  description: 'Static UI Component',
  prompts: async (inquirer) => {
    // Asking some questions
    const { componentMain } = await inquirer.prompt({
      type: 'input',
      name: 'componentMain',
      message: 'What is the component type?',
      validate: validateFilename
    })

    const { componentSubs } = await inquirer.prompt({
      type: 'input',
      name: 'componentSubs',
      message: 'What sub-components would you like? (comma separated, blank for none)',
      validate: (input: string) => {
        // Blank condition
        if (input.length == 0) return true
        const subs = input.split(',').map((stringValue) => stringValue.toString().trim())
        const validatedValues = subs.map(validateFilename)
        const hasNoErrors = validatedValues.every(
          (currentValue) => typeof currentValue === 'boolean'
        )
        return hasNoErrors ? true : validatedValues.join(', ')
      }
    })

    return Promise.resolve({
      // all answer
      componentSubs,
      componentMain
    })
  },
  actions: function (data: UIAnswers) {
    const { componentMain, componentSubs } = data
    const addMain = {
      type: 'addMany',
      skipIfExists: true,
      destination: '{{ turbo.paths.root }}/ui/components/{{ componentName }}/',
      data: {
        componentName: componentMain,
        storyName: 'Complete'
      },
      templateFiles: [
        'ui-component/component.story.tsx.hbs',
        'ui-component/component.test.tsx.hbs',
        'ui-component/index.tsx.hbs',
        'ui-component/style.module.css.hbs'
      ]
    }
    const subs = componentSubs
      .split(',')
      .filter(Boolean)
      .map((subName) => {
        const componentName = `${componentMain}-${subName.trim()}`
        return {
          type: 'addMany',
          destination: '{{ turbo.paths.root }}/ui/components/{{ componentName }}/',
          data: {
            componentName,
            storyName: subName
          },
          templateFiles: [
            'ui-component/component.story.tsx.hbs',
            'ui-component/component.test.tsx.hbs',
            'ui-component/index.tsx.hbs',
            'ui-component/style.module.css.hbs'
          ]
        }
      })

    return [addMain, ...subs]
  }
}
