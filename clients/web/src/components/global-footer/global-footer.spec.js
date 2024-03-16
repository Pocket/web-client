import { render } from '@config/jest'
import '@testing-library/jest-dom'

import { GlobalFooter } from './global-footer'
jest.mock('next/router', () => require('next-router-mock'))

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
