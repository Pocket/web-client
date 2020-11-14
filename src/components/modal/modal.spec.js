import assert from 'assert'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import { testIdSelector } from '@pocket/web-utilities/test-utils'

// http://reactcommunity.org/react-modal/testing/
const setAppElementStub = sinon.stub()

const ReactModalMock = () => <div></div>
ReactModalMock.setAppElement = setAppElementStub

const Modal = proxyquire('./modal', {
  'react-modal': ReactModalMock
}).default

const baseProps = {
  title: 'Test Modal',
  appRootSelector: '#root',
  screenReaderLabel: 'foo',
  handleClose() {}
}

// make nodeSelector required, test that ReactModal.setAppElement is called with this
describe('Modal', () => {
  beforeEach(() => {
    setAppElementStub.reset()
  })

  it('registers the app root for accessibility purposes', () => {
    const modal = shallow(<Modal {...baseProps} />)

    assert(setAppElementStub.calledWith('#root'))
  })

  it('passes the child through to the modal', () => {
    const TestChild = () => <div>test child</div>
    const modal = shallow(
      <Modal {...baseProps} isOpen={true}>
        <TestChild />
      </Modal>
    )

    const modalInstance = modal.find(testIdSelector('modal'))

    assert.equal(modalInstance.find(TestChild).length, 1)
  })

  it('displays a close button when showCloseButtonProp is true', () => {
    const modal = shallow(<Modal {...baseProps} showCloseButton={true} />)
    const closeButton = modal.find(testIdSelector('close-modal-button'))

    assert.equal(closeButton.length, 1)
  })

  it('does not display a close button when showCloseButtonProp is false', () => {
    const modal = shallow(<Modal {...baseProps} showCloseButton={false} />)
    const closeButton = modal.find(testIdSelector('close-modal-button'))

    assert.equal(closeButton.length, 0)
  })

  it('applies a "force-mobile" class to the modal if props.forceModal is true', () => {
    const modal = shallow(<Modal {...baseProps} forceMobile />)
    const modalInstance = modal.find(testIdSelector('modal'))

    assert(modalInstance.hasClass('force-mobile'))
  })
})
