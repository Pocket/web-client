import { css } from 'linaria'

const notficationsStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const Notifications = ({
  sendMarketing,
  hitsFrequency,
  onMarketingToggle,
  onFrequencyChange
}) => {
  return (
    <section className={notficationsStyle}>
      <h2>Notifications</h2>
      <div className="sectionBody emailBody">
        <label htmlFor="productUpdates" className="flush">
          Notify me of product updates
        </label>
        <input
          type="checkbox"
          name="productUpdates"
          id="productUpdates"
          className="toggle"
          checked={sendMarketing}
          onChange={onMarketingToggle}
        />

        <label htmlFor="pockethits" className="flush">
          Pocket Hits
        </label>
        <select value={hitsFrequency} onChange={onFrequencyChange}>
          <option disabled>———</option>
          <option value="daily">Daily</option>
          <option value="triweekly">Three times a week</option>
          <option value="weekly">Once a week</option>
          <option value="monthly">Once a month</option>
          <option value="never">Unsubscribe: Opt out of Pocket Hits</option>
        </select>
        <div className="helperText full">
          Pocket Hits is a curated newsletter showcasing the very best stories in Pocket delivered
          by email.
        </div>
      </div>
    </section>
  )
}
