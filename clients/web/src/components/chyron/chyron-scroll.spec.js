import { render } from '@config/jest'
import '@testing-library/jest-dom'

import { ScrollChyron } from './chyron-scroll'

const TestComponent = () => <h1>Testing!</h1>

describe('ScrollChyron', () => {
  const baseProps = {
    instanceId: 'chyron-scroll.spec'
  }

  it('renders with children without problem', () => {
    const { queryByTestId } = render(
      <ScrollChyron {...baseProps}>
        <TestComponent />
      </ScrollChyron>
    )
    expect(queryByTestId('scroll-chyron-wrapper')).toBeTruthy()
  })

  it('does not render when shouldHide is true', () => {
    const { queryByTestId } = render(
      <ScrollChyron {...baseProps} shouldHide>
        <TestComponent />
      </ScrollChyron>
    )
    expect(queryByTestId('scroll-chyron-wrapper')).toBeFalsy()
  })
})
