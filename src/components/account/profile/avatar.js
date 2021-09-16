import { css } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'

const avatarStyle = css`
  grid-column: 8 / 11;
  grid-row: span 5;
  text-align: center;

  .avatarBody {
    display: inline-block;
  }
  .updateLink {
    display: block;
    margin-top: 0.5rem;
    text-align: center;
    width: 100%;
    color: var(--color-actionPrimary);
    &:hover {
      color: var(--color-actionPrimaryHover);
      text-decoration: underline;
    }
  }
`

const avatarPreviewStyle = css`
  display: inline-block;
  background: var(--color-actionPrimarySubdued);
  width: 134px;
  height: 134px;
  border-radius: 67px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  overflow: hidden;
  img {
    display: block;
    width: 134px;
    height: 134px;
    border-radius: 67px;
  }
`

export const Avatar = ({ avatarSrc, onChangePhoto }) => {
  return (
    <div className={avatarStyle}>
      <div className="avatarBody">
        <AvatarPreview avatarSrc={avatarSrc} />
        <button onClick={onChangePhoto} className={`${buttonReset} updateLink`}>
          Change photo
        </button>
      </div>
    </div>
  )
}

export const AvatarPreview = ({ avatarSrc }) => {
  return (
    <div className={avatarPreviewStyle}>
      <img src={avatarSrc} alt="" />
    </div>
  )
}
