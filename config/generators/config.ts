import type { PlopTypes } from '@turbo/gen'

import { uiPlop } from './ui-component/_plop'
import { statePlop } from './common-state/_plop'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('Component', uiPlop)
  plop.setGenerator('State', statePlop)
}
