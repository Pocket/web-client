import { Button } from '@pocket/web-ui'
import { css } from 'linaria'

const serviceStyle = css`
  .serviceIcon {
    width: 64px;
    height: 64px;
    display: inline-block;
    margin-right: 1rem;
  }
`

export const ConnectedApp = ({ slug, name, api_id, platform_id, onRevoke }) => {
  const onClick = () => onRevoke(slug)
  const serviceIcon = `https://s3.amazonaws.com/pocket-developer-assets/${api_id}-${platform_id}.png`

  return (
    <>
      <label htmlFor="something" className={serviceStyle}>
        <img src={serviceIcon} className="serviceIcon" alt="" />
        {name}
      </label>
      <Button variant="secondary" className="actionInline" onClick={onClick}>
        Revoke Access
      </Button>
    </>
  )
}
