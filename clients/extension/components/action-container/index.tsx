import { ExtensionHeader } from '../action-header'
import { SavedScreen } from '../saved'
import { SavedLoader } from '../saved-loader'
import type { ExtItem } from '@common/types'

export function ActionContainer({
  isOpen = false,
  errorMessage,
  item,
  actionUnSave
}: {
  isOpen: boolean
  errorMessage?: string
  item?: ExtItem
  actionUnSave: () => void
}) {
  return isOpen ? (
    <div className="extension">
      <ExtensionHeader />
      <hr />
      {item ? <SavedScreen item={item} actionUnSave={actionUnSave} /> : <SavedLoader />}
      {errorMessage}
    </div>
  ) : null
}
