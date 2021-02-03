import { css } from 'linaria'
import { Modal, ModalBody } from 'components/modal/modal'
import { useTranslation } from 'common/setup/i18n'

const shortcutsStyle = css`
  table {
    width: 100%;
    margin-top: 1.5rem;
  }

  table:first-of-type {
    margin-top: 0;
  }

  thead tr th {
    padding: 0 0 0.5rem;
  }

  tbody tr {
    border-bottom: 1px solid var(--color-dividerTertiary);
  }

  tbody td {
    line-height: 2rem;
    padding: 0;
  }
`

export function ShortCutDisplay({ copy, keyCopy }) {
  return (
    <tr key={keyCopy}>
      <td>{copy}</td>
      <td>{keyCopy}</td>
    </tr>
  )
}

export function ShortCutsView({
  showModal,
  listShortcuts,
  itemActions,
  readerShortcuts,
  appRootSelector,
  cancelShortcutView
}) {
  const { t } = useTranslation()
  return (
    <Modal
      title={t('shortcuts:shortcut-header', 'Keyboard Shortcuts')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('shortcuts:shortcut-header', 'Keyboard Shortcuts')}
      handleClose={cancelShortcutView}>
      <ModalBody>
        <div className={shortcutsStyle}>
          <table>
            <thead>
              <tr>
                <th scope="col">List Actions</th>
                <th scope="col">Shortcut</th>
              </tr>
            </thead>
            <tbody>{listShortcuts.map(ShortCutDisplay)}</tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th scope="col">Item Actions</th>
                <th scope="col">Shortcut</th>
              </tr>
            </thead>
            <tbody>{itemActions.map(ShortCutDisplay)}</tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th scope="col">Reading Actions</th>
                <th scope="col">Shortcut</th>
              </tr>
            </thead>
            <tbody>{readerShortcuts.map(ShortCutDisplay)}</tbody>
          </table>
        </div>
      </ModalBody>
    </Modal>
  )
}
