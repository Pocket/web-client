import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { css } from '@emotion/css'
import { updateFilter } from './items-filter.state'

import { TextInput } from 'components/form-fields/text-input'
import { PillCheckbox } from 'components/pill/pill-checkbox'

const inputStyle = css`
  margin: 0;
`

const themeRadioButtons = css`
  label {
    padding-right: 1rem;
  }
`

const Favorites = [
  {
    id: 'all',
    value: null,
    label: 'All'
  },
  {
    id: 'favorited',
    value: true,
    label: 'Favorited'
  },
  {
    id: 'unfavorited',
    value: false,
    label: 'Not Favorited'
  }
]

function getToggle(val) {
  if (val === 'true') return true
  if (val === 'false') return false
  return val
}

export const ItemFilter = () => {
  const dispatch = useDispatch()

  const [domainValue, setDomainValue] = useState('')

  const isFavorite = useSelector((state) => state.itemsFilter.isFavorite)

  console.log({ isFavorite })

  const handleFavoriteToggle = () => dispatch(updateFilter({ isFavorite: !isFavorite }))

  const handleChange = (event) => {
    dispatch(updateFilter({ isFavorite: getToggle(event?.target?.value) }))
    // setColorMode(event?.target?.value)
  }

  const onSubmit = () => {
    console.log('submitting')
  }

  return (
    <div>
      <div>
        {Favorites.map(({ id, value, label }) => (
          <span key={id} className={themeRadioButtons}>
            <label htmlFor={id}>
              <input
                type="radio"
                name="theme"
                value={value}
                id={id}
                data-cy={`favorite-${id}`}
                onChange={handleChange}
                checked={isFavorite === value}
              />
              {label}
            </label>
          </span>
        ))}
      </div>
      <TextInput
        className={inputStyle}
        labelText={'domain?'}
        name="domain-input"
        value={domainValue}
        // onChange={handleInputChange}
        data-cy="domain-input"
      />
      <button onClick={onSubmit}>submit</button>
    </div>
  )
}
