import { render } from 'test-utils'
import '@testing-library/jest-dom'
import { Modal } from './modal'
import React from 'react'

const setAppElementStub = jest.fn()
const ReactModalMock = ({ children }) => <div>{children}</div>
ReactModalMock.setAppElement = setAppElementStub
jest.mock('react-modal', () => ReactModalMock)

let portalRoot = document.getElementById('portal')
if (!portalRoot) {
  const portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'root')
  document.body.appendChild(portalRoot)
}

const baseProps = {
  title: 'Test Modal',
  appRootSelector: '#root',
  screenReaderLabel: 'foo',
  handleClose() {
    /** noop */
  }
}

// make nodeSelector required, test that ReactModal.setAppElement is called with this
describe('Modal', () => {
  it('registers the app root for accessibility purposes', () => {
    render(<Modal {...baseProps} />)
    expect(setAppElementStub).toHaveBeenCalledWith('#root')
  })

  it('passes the child through to the modal', () => {
    const TestChild = () => <div role="main">test child</div>
    const { getByRole } = render(
      <Modal {...baseProps} isOpen={true}>
        <TestChild />
      </Modal>
    )
    expect(getByRole('main')).toBeTruthy()
  })

  it('displays a close button when showCloseButtonProp is true', () => {
    const { getByLabelText } = render(<Modal {...baseProps} showCloseButton={true} />)
    expect(getByLabelText('common:close-label')).toBeTruthy()
  })

  it('does not display a close button when showCloseButtonProp is false', () => {
    const { queryByLabelText } = render(<Modal {...baseProps} showCloseButton={false} />)
    expect(queryByLabelText('common:close-label')).toBeFalsy()
  })
})
