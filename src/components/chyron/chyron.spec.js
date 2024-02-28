import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { Chyron } from './chyron'

const TestComponent = () => <h1>Testing!</h1>

describe('Chyron', () => {
  const baseProps = { instanceId: 'chyron.spec' }

  it('renders with children without problem', () => {
    const { queryByCy } = render(
      <Chyron {...baseProps}>
        <TestComponent />
      </Chyron>
    )
    expect(queryByCy('chyron-wrapper')).toBeTruthy()
  })

  it('does not render when initialDismissed is true', () => {
    const { queryByCy } = render(
      <Chyron {...baseProps} initialDismissed>
        <TestComponent />
      </Chyron>
    )
    expect(queryByCy('chyron-wrapper')).toBeFalsy()
  })

  it('does not render when initialSuccess is true', () => {
    const { queryByCy } = render(
      <Chyron {...baseProps} initialSuccess>
        <TestComponent />
      </Chyron>
    )
    expect(queryByCy('chyron-wrapper')).toBeFalsy()
  })
})
