import * as React from 'react'
import assert from 'assert'
import sinon from 'sinon'
import { shallow } from 'enzyme'

// imported dependencies for stubbing. We have to `import * as Foo from 'foo'`
// so that we're importing an object whose methods can be stubbed by sinon.
import * as reactRedux from 'react-redux'

import ErrorPage from 'pages/_error'
import TopicCollection from './topic-collection'
import TopicPage from './topic-page'
import Topic from 'containers/topic/topic'

const mockState = {
  topic: {
    curatedItems: [1, 2, 3, 4],
    algorithmicItems: [1, 2, 3, 4]
  }
}

const mockCollectionTopic = {
  ...mockState,
  topicList: {
    activeTopic: 'laser-cats',
    topicsByName: {
      'laser-cats': {
        curator_label: 'Laser-Cats',
        display_name: 'Laser Cats!',
        display_note:
          'Stay informed about lazer cats.  For official U.S. guidelines visit [laser-cats.gov](http://www.laser-cats.gov).',
        page_type: 'editorial_collection',
        topic: 'laser_cats',
        topic_slug: 'laser-cats'
      }
    }
  }
}

const mockPageTopic = {
  ...mockState,
  topicList: {
    activeTopic: 'badgers-and-badges',
    topicsByName: {
      'badgers-and-badges': {
        curator_label: 'Badgers_Badges',
        display_name: 'Badgers & Badges',
        display_note: 'N/A',
        page_type: 'topic_page',
        topic: 'badgers_and_badgers',
        topic_slug: 'badgers-and-badges'
      }
    }
  }
}

describe('TopicPage', function () {
  // redux dependencies are stubbed so that we don't need to set up a Provider/context,
  // and can mock the result of the dependencies when called.
  const noop = () => {}
  let useSelectorStub
  let useDispatchStub // eslint-disable-line no-unused-vars
  let useEffectStub // eslint-disable-line no-unused-vars

  beforeEach(function () {
    useDispatchStub = sinon.stub(reactRedux, 'useDispatch').returns(noop)
    useSelectorStub = sinon.stub(reactRedux, 'useSelector')
    useEffectStub = sinon.stub(React, 'useEffect')
  })

  afterEach(function () {
    // restore the original dependencies once all tests have run.
    sinon.restore()
  })

  it('renders an error when no results are returned', () => {
    const mockState = {
      ...mockPageTopic,
      topic: {
        curatedItems: [],
        algorithmicItems: []
      }
    }
    // tell useSelector to return the pending state to the component via our stub
    useSelectorStub.callsFake((fn) => fn(mockState))
    const topicContainer = shallow(<Topic />)
    const errorRendered = topicContainer.find(ErrorPage)

    assert(errorRendered.exists())
  })

  it('renders a topic collection when `page_type` is `editorial_collection`', () => {
    const mockState = mockCollectionTopic
    // tell useSelector to return the pending state to the component via our stub
    useSelectorStub.callsFake((fn) => fn(mockState))
    const topicContainer = shallow(<Topic />)
    const topicCollectionRendered = topicContainer.find(TopicCollection)
    const topicPageRendered = topicContainer.find(TopicPage)

    assert(topicCollectionRendered.exists())
    assert(!topicPageRendered.exists())
  })

  it('renders a topic page when `page_type` is not `editorial_collection`', () => {
    const mockState = mockPageTopic
    // tell useSelector to return the pending state to the component via our stub
    useSelectorStub.callsFake((fn) => fn(mockState))
    const topicContainer = shallow(<Topic />)
    const topicPageRendered = topicContainer.find(TopicPage)
    const topicCollectionRendered = topicContainer.find(TopicCollection)

    assert(topicPageRendered.exists())
    assert(!topicCollectionRendered.exists())
  })
})
