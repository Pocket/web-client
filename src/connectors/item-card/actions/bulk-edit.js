import { EmptyCircledIcon } from '@pocket/web-ui'
import { CheckCircledIcon } from '@pocket/web-ui'
import { MenuItem } from 'components/item-menus/flat'

export function ActionsBulkEdit({ selected }) {
  const BulkIcon = selected ? CheckCircledIcon : EmptyCircledIcon
  return (
    <div className="actions">
      <div></div>
      <div>
        <MenuItem icon={<BulkIcon />} />
      </div>
    </div>
  )
}
