import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { GlobalFooter } from './global-footer'

describe('GlobalFooter', () => {
  it('adds a top border to the footer if props.hasBorder is true', () => {
    const { container } = render(<GlobalFooter hasBorder />)
    expect(container.firstChild).toHaveClass('with-border')
  })

  it('adds a top colored border to the footer if props.hasColorBorder is true', () => {
    const { container } = render(<GlobalFooter hasColorBorder />)
    expect(container.firstChild).toHaveClass('with-color-border')
  })
})
