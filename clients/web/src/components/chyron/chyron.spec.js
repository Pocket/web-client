import { render } from '@config/jest'
import '@testing-library/jest-dom'

import { Chyron } from './chyron'

const TestComponent = () => <h1>Testing!</h1>

describe('Chyron', () => {
  const baseProps = { instanceId: 'chyron.spec' }

  it('renders with children without problem', () => {
    const { queryByTestId } = render(
      <Chyron {...baseProps}>
        <TestComponent />
      </Chyron>
    )
    expect(queryByTestId('chyron-wrapper')).toBeTruthy()
  })

  it('does not render when initialDismissed is true', () => {
    const { queryByTestId } = render(
      <Chyron {...baseProps} initialDismissed>
        <TestComponent />
      </Chyron>
    )
    expect(queryByTestId('chyron-wrapper')).toBeFalsy()
  })

  it('does not render when initialSuccess is true', () => {
    const { queryByTestId } = render(
      <Chyron {...baseProps} initialSuccess>
        <TestComponent />
      </Chyron>
    )
    expect(queryByTestId('chyron-wrapper')).toBeFalsy()
  })
})
