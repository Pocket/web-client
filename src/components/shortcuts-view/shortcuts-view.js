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

export function ShortCutDisplay({ copy, keyCopy, premium, isPremium, copyTranslationKey, keyTranslationKey }) {
  const { t } = useTranslation()
  const rowClass = cx(premium && !isPremium && 'locked')
  return (
    <tr key={keyCopy} className={rowClass}>
      <td>{t(copyTranslationKey, copy)}</td>
      <td>
        {premium ? <PremiumIcon className="premium-icon" /> : null} {t(keyTranslationKey, keyCopy)}
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

  const keyHeaderText = t('shortcuts:shortcut', 'Shortcut')

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
                <th scope="col">{t('shortcuts:saves-actions', 'Saves Actions')}</th>
                <th scope="col">{keyHeaderText}</th>
              </tr>
            </thead>
            <tbody>
              {listShortcuts.map(({ copy, keyCopy, premium, copyTranslationKey, keyTranslationKey }) => (
                <ShortCutDisplay
                  copy={copy}
                  key={keyCopy}
                  keyCopy={keyCopy}
                  premium={premium}
                  isPremium={isPremium}
                  copyTranslationKey={copyTranslationKey}
                  keyTranslationKey={keyTranslationKey}
                />
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th scope="col">{t('shortcuts:item-actions', 'Item Actions')}</th>
                <th scope="col">{keyHeaderText}</th>
              </tr>
            </thead>
            <tbody>
              {itemActions.map(({ copy, keyCopy, premium, copyTranslationKey, keyTranslationKey }) => (
                <ShortCutDisplay
                  copy={copy}
                  key={keyCopy}
                  keyCopy={keyCopy}
                  premium={premium}
                  isPremium={isPremium}
                  copyTranslationKey={copyTranslationKey}
                  keyTranslationKey={keyTranslationKey}
                />
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th scope="col">{t('shortcuts:reading-actions', 'Reading Actions')}</th>
                <th scope="col">{keyHeaderText}</th>
              </tr>
            </thead>
            <tbody>
              {readerShortcuts.map(({ copy, keyCopy, premium, copyTranslationKey, keyTranslationKey }) => (
                <ShortCutDisplay
                  copy={copy}
                  key={keyCopy}
                  keyCopy={keyCopy}
                  premium={premium}
                  isPremium={isPremium}
                  copyTranslationKey={copyTranslationKey}
                  keyTranslationKey={keyTranslationKey}
                />
              ))}
            </tbody>
          </table>
        </div>
      </ModalBody>
    </Modal>
  )
}

/**
  t('shortcuts:shortcut-header', 'Keyboard Shortcuts')
  t('shortcuts:saves-actions', 'Saves Actions')
  t('shortcuts:item-actions', 'Item Actions')
  t('shortcuts:reading-actions', 'Reading Actions')
  t('shortcuts:shortcut', 'Shortcut')
 */
