import { css } from '@emotion/css'
import { useState } from 'react'
import { TextInput } from 'components/form-fields/text-input'

const inputWrapper = css`
  display: flex;

  div {
    margin-bottom: 8px;
  }

  button {
    height: 44px;
    margin: 5px 0 5px 8px;
  }
`

export const FilterSearch = ({ handleUpdate }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (event) => {
    setSearchValue(event?.target?.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    handleUpdate(searchValue)
  }

  return (
    <form className={inputWrapper} onSubmit={onSubmit}>
      <TextInput
        labelText={'What are you looking for? 👀'}
        name="search-input"
        value={searchValue}
        onChange={handleChange}
        data-cy="search-input"
      />
      <button type="submit">Search</button>
    </form>
  )
}
