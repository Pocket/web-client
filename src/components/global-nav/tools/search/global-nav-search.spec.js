import assert from 'assert'
import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { testIdSelector, mockEvent } from '@pocket/web-utilities/test-utils'

import GlobalNavSearch from './global-nav-search'

const baseProps = {
  onSubmit: () => {},
  placeholder: 'Storybook placeholder text'
}

let defaultSearch

describe('GlobalNavSearch', () => {
  beforeEach(() => {
    // we'll use this default output to compare expected changes based on props
    defaultSearch = shallow(<GlobalNavSearch {...baseProps} />)
  })
  it('applies the `placeholder` prop value correctly to the input', () => {
    const input = defaultSearch.find(testIdSelector('search-input'))

    assert.equal(input.prop('placeholder'), baseProps.placeholder)
  })

  it('calls the props.onSubmit callback when the Submit button is clicked', () => {
    const spy = sinon.spy()
    const search = shallow(
      <GlobalNavSearch
        {...baseProps}
        onSubmit={spy}
        value="pursuit of happiness"
      />
    )
    const submitButton = search.find(testIdSelector('search-button'))
    const form = search.find('form')

    submitButton.simulate('click', mockEvent)

    assert(spy.calledOnce)

    // this is meant to test the submit via keypress. Adding an event is a
    // workaround for https://github.com/enzymejs/enzyme/issues/308
    form.simulate('submit', { preventDefault: () => {} })

    assert(spy.calledTwice)
  })

  it('does not render a close button when no props.onClose is provided', () => {
    const closeButton = defaultSearch.find(testIdSelector('search-close'))

    assert(!closeButton.exists())
  })

  it('calls the props.onClose callback when the Close button is clicked', () => {
    const spy = sinon.spy()
    const search = shallow(<GlobalNavSearch {...baseProps} onClose={spy} />)
    const closeButton = search.find(testIdSelector('search-close'))

    closeButton.simulate('click')

    assert(spy.calledOnce)
  })

  it('calls the props.onFocus callback when the search input is focused, passing the Event object', () => {
    const spy = sinon.spy()
    const search = shallow(<GlobalNavSearch {...baseProps} onFocus={spy} />)
    const searchInput = search.find(testIdSelector('search-input'))

    searchInput.simulate('focus', mockEvent)

    assert(spy.calledWith(mockEvent))
  })

  it('calls the props.onFocus callback when the search input is blurred, passing the Event object', () => {
    const spy = sinon.spy()
    const search = shallow(<GlobalNavSearch {...baseProps} onBlur={spy} />)
    const searchInput = search.find(testIdSelector('search-input'))

    searchInput.simulate('blur', mockEvent)

    assert(spy.calledWith(mockEvent))
  })

  it('renders a Clear button only  when a search input value is present', () => {
    let clearButton

    clearButton = defaultSearch.find(testIdSelector('search-clear'))

    assert(!clearButton.exists())

    const searchWithValue = shallow(
      <GlobalNavSearch {...baseProps} value="pursuit of happiness" />
    )
    clearButton = searchWithValue.find(testIdSelector('search-clear'))

    assert(clearButton.exists())
  })

  it('clicking the Clear button clears the current search term', () => {
    const search = shallow(
      <GlobalNavSearch {...baseProps} value="pursuit of happiness" />
    )
    const clearButton = search.find(testIdSelector('search-clear'))
    const searchInput = search.find(testIdSelector('search-input'))

    assert.equal(searchInput.prop('value'), 'pursuit of happiness')

    clearButton.simulate('click')

    const changedSearchInput = search.find(testIdSelector('search-input'))

    assert.equal(changedSearchInput.prop('value'), '')
  })

  it('supplies the search input with a value if a `value` prop was passed in', () => {
    const searchInput = defaultSearch.find(testIdSelector('search-input'))

    assert.equal(searchInput.prop('value'), '')

    const searchWithValue = shallow(
      <GlobalNavSearch {...baseProps} value="pursuit of happiness" />
    )
    const searchInput2 = searchWithValue.find(testIdSelector('search-input'))

    assert.equal(searchInput2.prop('value'), 'pursuit of happiness')
  })
})
