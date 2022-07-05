import { css } from 'linaria'

export default {
  title: 'UI/Input'
}

const inputStyles = css`
  & > div {
    margin-bottom: 1rem;
  }
`

export const Input = () => {
  return (
    <div className={inputStyles}>
      <div>
        <label>
          <span>Text</span> <input type="text" />
        </label>
      </div>
      <div>
        <label>
          <span>Email</span> <input type="email" />
        </label>
      </div>
      <div>
        <label>
          <span>Password</span> <input type="password" />
        </label>
      </div>
      <div>
        <label>
          <span>Search</span> <input type="search" />
        </label>
      </div>
      <div>
        <label>
          <span>Number</span> <input type="number" />
        </label>
      </div>
      <div>
        <label className="block">
          <input type="checkbox" className="toggle" /> <span>Toggle</span>
        </label>
      </div>
      <div>
        <label className="block">
          <input type="checkbox" /> <span>Checkbox 1</span>
        </label>
        <label className="block">
          <input type="checkbox" /> <span>Checkbox 2</span>
        </label>
        <label className="block">
          <input type="checkbox" /> <span>Checkbox 3</span>
        </label>
      </div>
      <div className="choiceList">
        <label className="block">
          <input type="radio" name="radiotest" value="1" /> <span>Radio 1</span>
        </label>
        <label className="block">
          <input type="radio" name="radiotest" value="2" /> <span>Radio 2</span>
        </label>
        <label className="block">
          <input type="radio" name="radiotest" value="3" /> <span>Radio 3</span>
        </label>
      </div>
    </div>
  )
}
