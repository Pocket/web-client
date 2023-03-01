import { cx } from 'linaria'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { bottomTooltip } from 'components/tooltip/tooltip'
import { buttonReset } from 'components/buttons/button-reset'

export const ListActions = ({ deleteAction, externalId }) => {
  const onDelete = () => {
    deleteAction(externalId)
  }

  return (
    <button
      aria-label="Delete List"
      data-tooltip="Delete List"
      data-cy="delete-list"
      className={cx(buttonReset, bottomTooltip)}
      onClick={onDelete}>
      <DeleteIcon />
    </button>
  )
}
