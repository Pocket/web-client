import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { PocketHitsIllustratedChyron } from './pocket-hits-illustrated-chyron'

jest.mock('static/images/pocket-hits-chyron/border.svg', () => 'svg')
jest.mock('static/images/pocket-hits-chyron/envelope-green.svg', () => 'svg')
jest.mock('static/images/pocket-hits-chyron/envelope-red.svg', () => 'svg')

describe('PocketHitsIllustratedChyron', () => {
  it('shows the form and hides the success message by default', () => {
    const { queryByCy, getByCy } = render(<PocketHitsIllustratedChyron />)
    expect(getByCy('pocket-hits-chyron'))
    expect(queryByCy('pocket-hits-chyron-success')).toBeFalsy()
  })

  it('shows the success message and hides the form when isSuccessful', () => {
    const { queryByCy, getByCy } = render(<PocketHitsIllustratedChyron isSuccessful />)
    expect(queryByCy('pocket-hits-chyron')).toBeFalsy()
    expect(getByCy('pocket-hits-chyron-success'))
  })
})
