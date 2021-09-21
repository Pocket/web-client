import { css } from 'linaria'

const servicesStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const Services = ({ appIds, ConnectedApp }) => {
  return appIds ? (
    <section className={servicesStyle}>
      <h2>Services</h2>
      <div className="sectionBody">
        <div className="helperText full">You have authorized Pocket to access these services:</div>
        {appIds.map((appId) => (
          <ConnectedApp appId={appId} />
        ))}
      </div>
    </section>
  ) : null
}
