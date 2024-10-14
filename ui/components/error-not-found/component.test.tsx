// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { localeWrapper as wrapper } from '@config/jest/wrapper'

// Components
import { ErrorNotFound as Component } from '.'

//prettier-ignore
jest.mock('../item-article-media/color-planes', () => ({
  ColorPlanes: jest.fn(() => (
    <svg viewBox="0 0 1280 720">
      <rect height="720" style={{ opacity: '0.3' }} width="1280"></rect>
      <polygon points="0,525 480,584 960,443 1440,839  1920,4 640,360 0,360" style={{ opacity: '0.2' }}></polygon>
      <polygon points="0,673 640,482 1280,71 1920,6 640,360 0,360" style={{ opacity: '0.2' }}></polygon>
      <polygon points="0,29 640,309 1280,4 1920,248 640,360 0,360" style={{ opacity: '0.2' }}></polygon>
      <polygon points="0,256 1920,7 640,360 0,360" style={{ opacity: '0.2' }}></polygon>
      <polygon points="0,153 1920,4 640,360 0,360" style={{ opacity: '0.2' }}></polygon>
    </svg>
  ))
}))

// Optional: Clear mocks before each test if needed
beforeEach(() => {
  jest.clearAllMocks()
})

describe('renders ErrorFour', () => {
  it('with defaults', () => {
    const rendered = render(<Component locale="en" />, { wrapper })
    const renderedComponent = screen.getByTestId('error-four')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
