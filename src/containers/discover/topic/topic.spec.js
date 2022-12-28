import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import Topic from 'containers/discover/topic/topic'

const setAppElementStub = jest.fn()
const ReactModalMock = ({ children }) => <div>{children}</div>
ReactModalMock.setAppElement = setAppElementStub
jest.mock('react-modal', () => ReactModalMock)

let portalRoot = document.getElementById('portal')
if (!portalRoot) {
  const portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', '__next')
  document.body.appendChild(portalRoot)
}

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>
    }
  }
})

const mockEmpty = {
  discoverTopic: {
    'broken-dreams': {
      curatedItems: [],
      algorithmicItems: []
    }
  },
  topicList: {
    activeTopic: 'broken-dreams',
    topicsByName: {
      'broken-dreams': {
        curator_label: 'TwitBookFaceGram',
        display_name: 'TwitBookFaceGram',
        display_note: 'Come for the social connection.  Stay for the crippling FOMA.',
        page_type: 'editorial_collection',
        topic: 'broken_dreams',
        topic_slug: 'broken-dreams'
      }
    }
  }
}

const mockState = {
  discoverTopic: {
    'laser-cats': {
      curatedItems: [1, 2, 3, 4],
      algorithmicItems: [1, 2, 3, 4]
    },
    'badgers-and-badges': {
      curatedItems: [1, 2, 3, 4],
      algorithmicItems: [1, 2, 3, 4]
    }
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
  xit('renders an error when no results are returned', () => {
    const { getByText } = wrappedRender(<Topic />, { initialState: mockEmpty })
    expect(getByText('Oops', { exact: false }))
  })

  it('renders a topic collection when `page_type` is `editorial_collection`', () => {
    const { getByRole } = wrappedRender(<Topic />, { initialState: mockCollectionTopic })
    expect(getByRole('heading', { level: 1 })).toHaveTextContent('Laser Cats!')
  })

  it('renders a topic page when `page_type` is not `editorial_collection`', () => {
    const { getByRole } = wrappedRender(<Topic />, { initialState: mockPageTopic })
    expect(getByRole('heading', { level: 1 })).toHaveTextContent('Badgers & Badges')
  })
})
