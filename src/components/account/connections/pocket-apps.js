import { css } from 'linaria'
import { Button } from '@pocket/web-ui'

const pocketAppsStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const PocketApps = () => {
  return (
    <section className={pocketAppsStyle}>
      <h2>Pocket Applications</h2>
      <div className="sectionBody">
        <div className="helperText full">
          You are currently logged in to Pocket in these applications:
        </div>
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
