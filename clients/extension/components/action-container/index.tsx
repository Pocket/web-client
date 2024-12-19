import { ExtensionHeader } from '../action-header'
import { SavedScreen } from '../saved'
import type { ExtItem } from '../../assets/types'

export function ActionContainer({
  item,
  actionUnSave
}: {
  item: ExtItem
  actionUnSave: () => void
}) {
  return (
    <div className="extension">
      <ExtensionHeader />
      <hr />
      <SavedScreen item={item} actionUnSave={actionUnSave} />
    </div>
  )
}
