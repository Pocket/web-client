import type { NodePlopAPI } from 'plop'

import { uiPlop } from './ui-component/_plop'
import { statePlop } from './common-state/_plop'

export default function generator(plop: NodePlopAPI): void {
  plop.setGenerator('Component', uiPlop)
  plop.setGenerator('State', statePlop)
}
