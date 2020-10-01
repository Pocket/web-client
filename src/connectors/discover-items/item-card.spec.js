import * as React from 'react'
import assert from 'assert'
import sinon from 'sinon'
import { shallow } from 'enzyme'

// imported dependencies for stubbing. We have to `import * as Foo from 'foo'`
// so that we're importing an object whose methods can be stubbed by sinon.
import * as reactRedux from 'react-redux'

import { ItemCard } from './item-card'
import { Card } from 'components/discover-card/card'

describe('ItemCard', function () {
  // redux dependencies are stubbed so that we don't need to set up a Provider/context,
  // and can mock the result of the dependencies when called.
  const noop = () => {}
  let useSelectorStub
  let useDispatchStub // eslint-disable-line no-unused-vars
  let useEffectStub // eslint-disable-line no-unused-vars
  let unAuthSaveAction
  let unSaveAction
  let saveAction

  beforeEach(function () {
    useDispatchStub = sinon.stub(reactRedux, 'useDispatch').returns(noop)
    useSelectorStub = sinon.stub(reactRedux, 'useSelector')
    useEffectStub = sinon.stub(React, 'useEffect')
    unSaveAction = sinon.stub()
    unAuthSaveAction = sinon.stub()
    saveAction = sinon.stub()
  })

  afterEach(function () {
    // restore the original dependencies once all tests have run.
    sinon.restore()
  })

  it('renders an article card', () => {
    const mockState = {
      user: { auth: true },
      items: {
        12345: {
          resolved_id: '12345',
          save_url: 'https://isithalloween.com',
          save_status: 'saved'
        }
      }
    }
    // tell useSelector to return state to the component via our stub
    useSelectorStub.callsFake((fn) => fn(mockState))

    // render the topic card
    const topicCard = shallow(<ItemCard id="12345" position="3" />)

    // make sure it has rendered an Card
    const articleCard = topicCard.find(Card)
    assert(articleCard.exists())
  })

  it('saves an item when the item is in an unsaved state', () => {
    const mockState = {
      user: { auth: true },
      items: {
        12345: {
          resolved_id: '12345',
          save_url: 'https://isithalloween.com',
          save_status: 'unsaved'
        }
      }
    }

    // tell useSelector to return state to the component via our stub
    useSelectorStub.callsFake((fn) => fn(mockState))

    // render the topic card
    const topicCard = shallow(
      <ItemCard
        id="12345"
        position="3"
        unAuthSaveAction={unAuthSaveAction}
        unSaveAction={unSaveAction}
        saveAction={saveAction}
      />
    )
    const articleCard = topicCard.find(Card)

    // trigger the save handler
    articleCard.prop('onSave')(true)

    // assert action was called correctly
    assert(articleCard.exists())
    assert(saveAction.calledWith('12345', 'https://isithalloween.com', '3'))
  })

  it('unsaves an item when the item is in a saved state', () => {
    const mockState = {
      user: { auth: true },
      items: {
        12345: {
          resolved_id: '12345',
          save_url: 'https://isithalloween.com',
          save_status: 'saved'
        }
      }
    }

    // tell useSelector to return state to the component via our stub
    useSelectorStub.callsFake((fn) => fn(mockState))

    // render the topic card
    const topicCard = shallow(
      <ItemCard
        id="12345"
        position="3"
        unSaveAction={unSaveAction}
        unAuthSaveAction={unAuthSaveAction}
        saveAction={saveAction}
      />
    )
    const articleCard = topicCard.find(Card)

    // trigger the save handler
    articleCard.prop('onSave')(true)

    // assert action was called correctly
    assert(articleCard.exists())
    assert(unSaveAction.calledWith('12345'))
  })
})
