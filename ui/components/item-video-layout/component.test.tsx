// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Components
import { ItemVideoLayout as Component } from '.'

describe('renders ItemLayouts', () => {
  it('with defaults', () => {
    const rendered = render(<Component />)
    const renderedComponent = screen.getByTestId('item-video-layout')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
