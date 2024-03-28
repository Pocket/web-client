import style from './style.module.css'

import { PremiumIcon } from '@ui/icons/PremiumIcon'

// Types
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'UI/Button'
}

export default meta

// Stories
const buttonTypes = ['default', 'secondary', 'brand', 'outline', 'transparent', 'text']
const buttonSizes = ['large', 'default', 'small', 'tiny']
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
      {' '}
      {buttonSizes.map((buttonSize) => (
        <div key={buttonSize} className={style.buttonContainer}>
          <h4>{buttonSize}</h4>
          <div className={style.buttonList}>
            {buttonTypes.map((buttonType) => (
              <button
                key={`${buttonSize}-${buttonType}`}
                className={`${buttonSize} ${buttonType} ${isNew && 'new'}`}
                type="button">
                {withIcon ? <PremiumIcon /> : null} {buttonType}
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
            {withIcon && buttonType == 'secondary' ? <PremiumIcon /> : null} {buttonType}
          </button>
        ))}
      </div>
    </>
  )
}
