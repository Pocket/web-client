import { useSelector, useDispatch } from 'react-redux'
import { TextInput } from 'components/form-fields/text-input'
import { PillCheckbox } from 'components/pill/pill-checkbox'

const StatusTypes = [
  { id: 'ALL', value: 'ALL', label: 'All' },
  { id: 'UNREAD', value: 'UNREAD', label: 'Unread' },
  { id: 'ARCHIVED', value: 'ARCHIVED', label: 'Archived' }
]

export const FilterStatus = ({ handleUpdate }) => {
  const status = useSelector((state) => state.itemsFilter.status)

  const handleChange = (event) => {
    const val = event.target.value
    handleUpdate(val)
  }

  return (
    <div>
      {StatusTypes.map(({ id, value, label }) => (
        <span key={id}>
          <label htmlFor={id}>
            <input
              type="radio"
              name="theme"
              value={value}
              id={id}
              data-cy={`favorite-${id}`}
              onChange={handleChange}
              checked={status === value}
            />
            {label}
          </label>
        </span>
      ))}
    </div>
  )
}
