// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Components
import { ItemArticleMedia as Component } from '.'

//prettier-ignore
jest.mock('./color-planes', () => ({
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

describe('renders ItemMedia', () => {
  it('with no image', () => {
    const rendered = render(<Component id="1" />)
    const renderedComponent = screen.getByTestId('item-media')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })

  it('with an image', () => {
    const imageUrl =
      'https://pocket-image-cache.com/640x360/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-collectionapi-prod-images%2Ff9ec4814-8d77-4bfe-a759-0e6cba7453ab.jpeg'
    const rendered = render(<Component id="1" imageUrl={imageUrl} />)
    const renderedComponent = screen.getByTestId('item-media')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
