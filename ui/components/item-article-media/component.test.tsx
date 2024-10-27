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
    const image = {
      caption: null,
      credit: null,
      cachedImages: [
        {
          url: 'https://pocket-image-cache.com/640x/filters:format(WEBP):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fbb0c75a9-4d69-495c-9804-7083ed2afa06.jpeg',
          id: 'WebP640'
        },
        {
          url: 'https://pocket-image-cache.com/320x/filters:format(WEBP):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fbb0c75a9-4d69-495c-9804-7083ed2afa06.jpeg',
          id: 'WebP320'
        },
        {
          url: 'https://pocket-image-cache.com/260x260/filters:format(WEBP):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fbb0c75a9-4d69-495c-9804-7083ed2afa06.jpeg',
          id: 'WebPSquare'
        }
      ]
    }

    const rendered = render(<Component id="1" image={image} />)
    const renderedComponent = screen.getByTestId('item-media')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
