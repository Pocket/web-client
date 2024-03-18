import style from './style.module.css'

import { PremiumIcon } from '@ui/icons/PremiumIcon'

import type { Meta } from '@storybook/react'

const meta: Meta = {
  title: 'UI/Button'
}

export default meta

export const Button = () => {
  return (
    <div className={style.buttonContainer}>
      <h4>large</h4>
      <div className={style.buttonList}>
        <button className="primary large" type="button">
          Primary
        </button>
        <button className="secondary large" type="button">
          Secondary
        </button>
        <button className="brand large" type="button">
          Brand
        </button>
        <button className="primary large" type="button">
          <PremiumIcon /> With Icon
        </button>
        <button className="text large" type="button">
          Button as text
        </button>
      </div>

      <h4>standard</h4>
      <div className={style.buttonList}>
        <button className="primary" type="button">
          Primary
        </button>
        <button className="secondary" type="button">
          Secondary
        </button>
        <button className="brand" type="button">
          Brand
        </button>
        <button className="primary" type="button">
          <PremiumIcon /> With Icon
        </button>
        <button className="text " type="button">
          Button as text
        </button>
      </div>

      <h4>small</h4>
      <div className={style.buttonList}>
        <button className="primary small" type="button">
          Primary
        </button>
        <button className="secondary small" type="button">
          Secondary
        </button>
        <button className="brand small" type="button">
          Brand
        </button>
        <button className="primary small" type="button">
          <PremiumIcon /> With Icon
        </button>
        <button className="text small" type="button">
          Button as text
        </button>
      </div>

      <h4>tiny</h4>
      <div className={style.buttonList}>
        <button className="primary tiny" type="button">
          Primary
        </button>
        <button className="secondary tiny" type="button">
          Secondary
        </button>
        <button className="brand tiny" type="button">
          Brand
        </button>
        <button className="primary tiny" type="button">
          <PremiumIcon /> With Icon
        </button>
        <button className="text tiny" type="button">
          Button as text
        </button>
      </div>
    </div>
  )
}
