import { css } from '@emotion/css'
import { useState } from 'react'
import { TextInput } from 'components/form-fields/text-input'

const inputWrapper = css`
  display: flex;

  button {
    height: 44px;
    margin: 5px 0 5px 8px;
  }
`

export const FilterTitle = ({ handleUpdate }) => {
  const [titleValue, setTitleValue] = useState('')

  const handleChange = (event) => {
    setTitleValue(event?.target?.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    handleUpdate(titleValue)
  }

  return (
    <form className={inputWrapper} onSubmit={onSubmit}>
      <TextInput
        labelText={'Got a title in mind?'}
        name="title-input"
        value={titleValue}
        onChange={handleChange}
        data-cy="title-input"
      />
      <button type="submit">Search</button>
    </form>
  )
}
