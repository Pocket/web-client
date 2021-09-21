import { css } from 'linaria'

const thirdPartyStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const ThirdParty = ({ appIds, ConnectedApp }) => {
  return appIds ? (
    <section className={thirdPartyStyle}>
      <h2>Third Party Applications</h2>
      <div className="sectionBody thirdPartyBody">
        <label htmlFor="something" className="connectionLabel">
          Something
        </label>
        {appIds.map((appId) => (
          <ConnectedApp appId={appId} />
        ))}
        <div className="helperText full">
          This page will not list 3rd party applications where you have entered your Pocket
          username/password into the app itself. If you would like to remove access to those apps,
          you will need to remove your Pocket credentials from those apps directly or change your
          password.
        </div>
      </div>
    </section>
  ) : null
}
