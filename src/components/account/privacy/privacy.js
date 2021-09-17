import { css } from 'linaria'
import { Button } from '@pocket/web-ui'

const privacyStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);

  .privacyBody {
  }
`

export const Privacy = () => {
  return (
    <section className={privacyStyle}>
      <h2>Privacy</h2>
      <div className="sectionBody">
        <label htmlFor="profilePrivate" className="flush">
          Make my profile private
        </label>
        <input type="checkbox" name="profilePrivate" id="profilePrivate" className="toggle" />

        <label htmlFor="rssPasswords" className="flush">
          Disable password protection on my RSS feeds
        </label>
        <input type="checkbox" name="rssPasswords" id="rssPasswords" className="toggle" />

        <label htmlFor="something" className="flush connectionLabel labelWithContext">
          Export my Pocket data
          <div className="helperText">Export your Pocket data in a portable HTML file</div>
        </label>
        <div className="actionInline">
          <Button variant="secondary">Export data</Button>
        </div>

        <label htmlFor="something" className="connectionLabel labelWithContext">
          Clear my Pocket data
          <div className="helperText full">
            This will irrevocably delete the items in your list & archive.
          </div>
        </label>
        <div className="actionInline">
          <Button variant="secondary">Clear data</Button>
        </div>

        <label htmlFor="something" className="connectionLabel labelWithContext">
          Delete my Pocket account
          <div className="helperText full">
            This will delete your account and all items within it.
          </div>
        </label>
        <div className="actionInline">
          <Button variant="secondary">Delete Account</Button>
        </div>
      </div>
    </section>
  )
}
