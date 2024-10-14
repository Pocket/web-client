// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { localeWrapper as wrapper } from '@config/jest/wrapper'

// Components
import { NavFooter as Component } from '.'

import type { PropsWithChildren } from 'react'

jest.mock('@common/localization', () => ({
  useTranslation: () => ({ t: (key: string, string: string) => string }),
  Trans: ({ children }: PropsWithChildren) => <>{children}</>,
  t: () => jest.fn()
}))

// Optional: Clear mocks before each test if needed
beforeEach(() => {
  jest.clearAllMocks()
})

describe('renders NavFooter', () => {
  it('with defaults', async () => {
    // Rendering this way because it's a server component
    render(await Component({ locale: 'en' }), { wrapper })

    const renderedComponent = screen.getByTestId('nav-footer')
    expect(renderedComponent).toBeInTheDocument()
    expect(renderedComponent).toMatchSnapshot()
  })
})
