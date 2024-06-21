import style from './style.module.css'

import { SaveIcon } from '@ui/icons/SaveIcon'
import { ThumbsDownIcon } from '@ui/icons/ThumbsDownIcon'
import { ThumbsUpIcon } from '@ui/icons/ThumbsUpIcon'
import { SystemModeIcon } from '@ui/icons/SystemModeIcon'
import { DarkModeIcon } from '@ui/icons/DarkModeIcon'
import { LightModeIcon } from '@ui/icons/LightModeIcon'

// Types
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'UI/Button'
}

export default meta

// Stories
const buttonTypes = ['primary', 'secondary', 'brand', 'outline', 'text', 'action']
const buttonSizes = ['tiny', 'small', 'medium (default)', 'large']
export const Button: StoryObj<typeof ButtonComponent> = {
  render: (args) => {
    return <ButtonComponent {...args} />
  },
  argTypes: {
    mixedSize: {
      options: buttonSizes,
      control: { type: 'inline-radio' }
    }
  },
  args: { withIcon: false, mixedSize: 'default', isNew: false }
}

const ButtonComponent = ({
  withIcon,
  mixedSize,
  isNew
}: {
  withIcon: boolean
  mixedSize: string
  isNew: boolean
}) => {
  return (
    <>
      {buttonSizes.map((buttonSize) => (
        <div key={buttonSize} className={style.buttonContainer}>
          <h4>{buttonSize}</h4>
          <div className={style.buttonList}>
            {buttonTypes.map((buttonType) => (
              <button
                key={`${buttonSize}-${buttonType}`}
                className={`${buttonSize} ${buttonType} ${isNew && 'new'}`}
                type="button">
                {withIcon ? <SaveIcon /> : null} {buttonType}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className={`${style.buttonContainer} ${style.buttonListMixed}`}>
        <h4>mixed</h4>
        {buttonTypes.map((buttonType) => (
          <button
            key={buttonType}
            className={`${buttonType} ${mixedSize}  ${isNew && 'new'}`}
            type="button">
            {withIcon && ['action', 'outline'].includes(buttonType) ? <SaveIcon /> : null}{' '}
            {buttonType}
          </button>
        ))}
      </div>
      <div className={`${style.buttonContainer} ${style.buttonListMixed}`}>
        <h4>Icon actions</h4>
        <button className={`action ${isNew && 'new'}`} type="button">
          <SaveIcon /> Save
        </button>
        <button
          className={`tooltip action ${isNew && 'new'}`}
          data-tooltip="Less like this"
          data-tooltip-delay={true}
          data-tooltip-position="bottom"
          type="button">
          <ThumbsDownIcon />
        </button>
        <button
          className={`tooltip action ${isNew && 'new'}`}
          data-tooltip="More like this"
          data-tooltip-delay={true}
          data-tooltip-position="bottom"
          type="button">
          <ThumbsUpIcon />
        </button>
      </div>
      <div className={`${style.buttonContainer} ${style.buttonListMixed}`}>
        <h4>Pagination</h4>
        <div style={{ display: 'flex' }}>
          <button className="pagination" type="button">
            1
          </button>
          <button className="pagination" type="button">
            2
          </button>
          <button className="pagination active" type="button">
            3
          </button>
          <button className="pagination" type="button">
            4
          </button>
          <button className="pagination" type="button">
            5
          </button>
        </div>
      </div>
      <div className={`${style.buttonContainer} ${style.buttonListMixed}`}>
        <h4>Button Group</h4>
        <div className="button-group iconic">
          <button type="button">
            <SystemModeIcon />
          </button>
          <button className="active" type="button">
            <DarkModeIcon />
          </button>
          <button type="button">
            <LightModeIcon />
          </button>
        </div>
      </div>
    </>
  )
}
