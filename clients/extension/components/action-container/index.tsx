import { ExtensionHeader } from '../action-header'
import { SavedScreen } from '../saved'

export function ActionContainer({ actionUnSave }: { actionUnSave: () => void }) {
  return (
    <div className="extension">
      <ExtensionHeader />
      <hr />
      <SavedScreen actionUnSave={actionUnSave} />
    </div>
  )
}
