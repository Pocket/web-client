import { QaModal } from 'connectors/dev-tools/qa-modal'
import { BrazeModal } from 'connectors/dev-tools/braze-modal'

export function DevTools() {
  return (
    <>
      <QaModal />
      <BrazeModal />
    </>
  )
}
