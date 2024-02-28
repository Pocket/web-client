import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { ScrollChyron } from './chyron-scroll'

const TestComponent = () => <h1>Testing!</h1>

describe('ScrollChyron', () => {
  const baseProps = {
    instanceId: 'chyron-scroll.spec'
  }

  it('renders with children without problem', () => {
    const { queryByCy } = render(
      <ScrollChyron {...baseProps}>
        <TestComponent />
      </ScrollChyron>
    )
    expect(queryByCy('scroll-chyron-wrapper')).toBeTruthy()
  })

  it('does not render when shouldHide is true', () => {
    const { queryByCy } = render(
      <ScrollChyron {...baseProps} shouldHide>
        <TestComponent />
      </ScrollChyron>
    )
    expect(queryByCy('scroll-chyron-wrapper')).toBeFalsy()
  })
})
