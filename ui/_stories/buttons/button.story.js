import { css, cx } from '@emotion/css'
import { PremiumIcon } from '@ui/icons/PremiumIcon'

export default {
  title: 'UI/Button'
}

const buttonContainer = css`
  font-family: var(--fontSansSerif);
  h4 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
  }
  .buttonList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 1.5rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-dividerTertiary);
  }
`

export const Button = () => {
  return (
    <div className={buttonContainer}>
      <h4>large</h4>
      <div className="buttonList">
        <button className="primary large">Primary</button>
        <button className="secondary large">Secondary</button>
        <button className="brand large">Brand</button>
        <button className="primary large">
          <PremiumIcon /> With Icon
        </button>
        <button className="text large">Button as text</button>
      </div>

      <h4>standard</h4>
      <div className="buttonList">
        <button className="primary">Primary</button>
        <button className="secondary">Secondary</button>
        <button className="brand">Brand</button>
        <button className="primary">
          <PremiumIcon /> With Icon
        </button>
        <button className="text ">Button as text</button>
      </div>

      <h4>small</h4>
      <div className="buttonList">
        <button className="primary small">Primary</button>
        <button className="secondary small">Secondary</button>
        <button className="brand small">Brand</button>
        <button className="primary small">
          <PremiumIcon /> With Icon
        </button>
        <button className="text small">Button as text</button>
      </div>

      <h4>tiny</h4>
      <div className="buttonList">
        <button className="primary tiny">Primary</button>
        <button className="secondary tiny">Secondary</button>
        <button className="brand tiny">Brand</button>
        <button className="primary tiny">
          <PremiumIcon /> With Icon
        </button>
        <button className="text tiny">Button as text</button>
      </div>
    </div>
  )
}
