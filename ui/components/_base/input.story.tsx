import style from './style.module.css'

import type { Meta } from '@storybook/react'

const meta: Meta = {
  title: 'UI/Input'
}

export default meta

export const Input = () => {
  return (
    <div className={style.inputContainer}>
      <fieldset>
        <legend>Text Inputs</legend>
        <div>
          <label htmlFor="search">Search</label>
          <input id="search" type="search" />
        </div>
        <div>
          <label htmlFor="input">Basic Input</label>
          <input id="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" />
        </div>
        <div>
          <label htmlFor="tel">Telephone</label>
          <input id="tel" type="tel" />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input id="url" type="url" />
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <input id="number" type="number" />
        </div>
      </fieldset>
      <fieldset>
        <legend>Select</legend>
        <div>
          <select id="select">
            <option value="">Select an option...</option>
            <optgroup label="Option group 1">
              <option value="">Option 1</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </optgroup>
            <optgroup label="Option group 2">
              <option value="">Option 4</option>
              <option value="">Option 5</option>
              <option value="">Option 6</option>
            </optgroup>
          </select>
        </div>
      </fieldset>

      <fieldset>
        <legend>Pickers</legend>
        <div>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input id="time" type="time" />
        </div>
        <div>
          <label htmlFor="datetime-local">Datetime-local</label>
          <input id="datetime-local" type="datetime-local" />
        </div>
        <div>
          <label htmlFor="month">Month</label>
          <input id="month" type="month" />
        </div>
        <div>
          <label htmlFor="file">File input</label>
          <input id="file" type="file" />
        </div>
      </fieldset>
      <fieldset>
        <legend>Textarea</legend>
        <div>
          <label htmlFor="textarea">About me</label>
          <textarea id="textarea" rows={3}></textarea>
        </div>
      </fieldset>
      <fieldset>
        <legend>Checks/Radios/Toggles</legend>
        <div>
          <label>
            <input className="toggle" type="checkbox" /> <span>Toggle</span>
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" /> <span>Checkbox 1</span>
          </label>
          <label>
            <input type="checkbox" /> <span>Checkbox 2</span>
          </label>
          <label>
            <input type="checkbox" /> <span>Checkbox 3</span>
          </label>
        </div>
        <div>
          <label>
            <input name="radiotest" type="radio" value="1" /> <span>Radio 1</span>
          </label>
          <label>
            <input name="radiotest" type="radio" value="2" /> <span>Radio 2</span>
          </label>
          <label>
            <input name="radiotest" type="radio" value="3" /> <span>Radio 3</span>
          </label>
        </div>
      </fieldset>
    </div>
  )
}
