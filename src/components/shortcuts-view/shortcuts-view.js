import { css, cx } from 'linaria'
import { Modal, ModalBody } from 'components/modal/modal'
import { useTranslation } from 'next-i18next'
import { PremiumIcon } from 'components/icons/PremiumIcon'

const shortcutsStyle = css`
  table {
    width: 100%;
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: minmax(150px, 1fr) minmax(150px, auto);
    thead,
    tbody,
    tr {
      display: contents;
    }
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

  tbody tr.locked {
    color: var(--color-textSecondary);
  }

  .premium-icon {
    color: var(--color-textAccent);
    margin-right: 5px;
  }
`

export function ShortCutDisplay({ copy, keyCopy, premium, isPremium, translationKey }) {
  const { t } = useTranslation()
  const rowClass = cx(premium && !isPremium && 'locked')
  return (
    <tr key={keyCopy} className={rowClass}>
      <td>{t(translationKey, copy)}</td>
      <td>
        {premium ? <PremiumIcon className="premium-icon" /> : null} {keyCopy}
      </td>
    </tr>
  )
}

export function ShortCutsView({
  showModal,
  isPremium,
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
                <th scope="col">Saves Actions</th>
                <th scope="col">Shortcut</th>
              </tr>
            </thead>
            <tbody>
              {listShortcuts.map(({ copy, keyCopy, premium, translationKey }) => (
                <ShortCutDisplay
                  copy={copy}
                  key={keyCopy}
                  keyCopy={keyCopy}
                  premium={premium}
                  isPremium={isPremium}
                  translationKey={translationKey}
                />
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th scope="col">Item Actions</th>
                <th scope="col">Shortcut</th>
              </tr>
            </thead>
            <tbody>
              {itemActions.map(({ copy, keyCopy, premium, translationKey }) => (
                <ShortCutDisplay
                  copy={copy}
                  key={keyCopy}
                  keyCopy={keyCopy}
                  premium={premium}
                  isPremium={isPremium}
                  translationKey={translationKey}
                />
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th scope="col">Reading Actions</th>
                <th scope="col">Shortcut</th>
              </tr>
            </thead>
            <tbody>
              {readerShortcuts.map(({ copy, keyCopy, premium, translationKey }) => (
                <ShortCutDisplay
                  copy={copy}
                  key={keyCopy}
                  keyCopy={keyCopy}
                  premium={premium}
                  isPremium={isPremium}
                  translationKey={translationKey}
                />
              ))}
            </tbody>
          </table>
        </div>
      </ModalBody>
    </Modal>
  )
}
