import { css } from 'linaria'
import { Button } from '@pocket/web-ui'

const servicesStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);

  .servicesBody {
  }
`

export const Services = () => {
  return (
    <section className={servicesStyle}>
      <h2>Services</h2>
      <div className="sectionBody">
        <div className="helperText full">You have authorized Pocket to access these services:</div>
        <label htmlFor="something" className="connectionLabel">
          Something
        </label>
        <Button variant="secondary" className="actionInline">
          Revoke Access
        </Button>

        <label htmlFor="something" className="connectionLabel">
          Something
        </label>
        <Button variant="secondary" className="actionInline">
          Revoke Access
        </Button>

        <label htmlFor="something" className="connectionLabel">
          Something
        </label>
        <Button variant="secondary" className="actionInline">
          Revoke Access
        </Button>
      </div>
    </section>
  )
}
