import style from './style.module.css'

import type { Meta } from '@storybook/react'

const meta: Meta = {
  title: 'UI/Input'
}

export default meta

export const Input = () => {
  return (
    <div className={style.inputContainer}>
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
        <label>
          <span>Select</span>
          <select>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
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
      <form>
        <fieldset>
          <legend>Example legend</legend>
          <div>
            <label htmlFor="input">Example input</label>
            <input type="text" id="input" placeholder="Example input" />
          </div>
          <div>
            <label htmlFor="email">Example email</label>
            <input type="email" id="email" placeholder="test@example.com" />
          </div>
          <div>
            <label htmlFor="tel">Example telephone</label>
            <input type="tel" id="tel" />
          </div>
          <div>
            <label htmlFor="url">Example url</label>
            <input type="url" id="url" />
          </div>
          <div>
            <label htmlFor="number">Example number</label>
            <input type="number" id="number" />
          </div>
          <div>
            <label htmlFor="search">Example search</label>
            <input type="search" id="search" />
          </div>
          <div>
            <label htmlFor="range">Example range</label>
            <input type="range" id="range" min="0" max="10" />
          </div>
          <div>
            <label htmlFor="file">Example file input</label>
            <input type="file" id="file" />
          </div>
          <div>
            <label htmlFor="select">Example select</label>
            <select id="select">
              <option value="">Choose...</option>
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
          <div>
            <label className="block">
              <input type="checkbox" value="" />
              Check this checkbox
            </label>
          </div>
          <div>
            <label className="block">
              <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" />
              Option one is this and that
            </label>
            <label className="block">
              <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />
              Option two is something else that's also super long to demonstrate the wrapping of
              these fancy form controls.
            </label>
            <label className="block">
              <input
                type="radio"
                name="optionsRadios"
                id="optionsRadios3"
                value="option3"
                disabled
              />
              Option three is disabled
            </label>
          </div>
          <div>
            <label htmlFor="textarea">Example textarea</label>
            <textarea id="textarea" rows={3}></textarea>
          </div>
          <div>
            <label htmlFor="date">Example date</label>
            <input type="date" id="date" />
          </div>
          <div>
            <label htmlFor="time">Example time</label>
            <input type="time" id="time" />
          </div>
          <div>
            <label htmlFor="password">Example password</label>
            <input type="password" id="password" />
          </div>
          <div>
            <label htmlFor="datetime-local">Example datetime-local</label>
            <input type="datetime-local" id="datetime-local" />
          </div>
          <div>
            <label htmlFor="week">Example week</label>
            <input type="week" id="week" />
          </div>
          <div>
            <label htmlFor="month">Example month</label>
            <input type="month" id="month" />
          </div>
          <div>
            <label htmlFor="color">Example color</label>
            <input type="color" id="color" />
          </div>
          <div>
            <label htmlFor="output">Example output</label>
            <output name="result" id="output">
              100
            </output>
          </div>
          <div>
            <button type="submit">Button submit</button>
            <input type="submit" value="Input submit button" />
            <input type="reset" value="Input reset button" />
            <input type="button" value="Input button" />
          </div>
        </fieldset>
      </form>
    </div>
  )
}
