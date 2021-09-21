import { css } from 'linaria'

const pocketAppsStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const PocketApps = ({ appIds, ConnectedApp }) => {
  return appIds.length ? (
    <section className={pocketAppsStyle}>
      <h2>Pocket Applications</h2>
      <div className="sectionBody">
        <div className="helperText full">
          You are currently logged in to Pocket in these applications:
        </div>
        {appIds.map((appId) => (
          <ConnectedApp appId={appId} />
        ))}
      </div>
    </section>
  ) : null
}
