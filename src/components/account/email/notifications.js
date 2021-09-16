import { css } from 'linaria'

const emailStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const EmailNotifications = () => {
  return (
    <section className={emailStyle}>
      <h2>Email Notifications</h2>
      <div className="sectionBody emailBody">
        <label htmlFor="productUpdates" className="flush">
          Notify me of product updates
        </label>
        <input type="checkbox" name="productUpdates" id="productUpdates" className="toggle" />

        <div></div>

        <label htmlFor="pockethits" className="flush">
          Pocket Hits:
        </label>
        <select>
          <option>Daily</option>
          <option>1 Time a Week</option>
          <option>Unsubscribe: Opt out of Pocket Hits</option>
        </select>
        <div className="helperText full">
          Pocket Hits is a curated newsletter showcasing the very best stories in Pocket delivered
          by email.
        </div>
      </div>
    </section>
  )
}
