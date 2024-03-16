import { useState } from 'react'
import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'

const serviceStyle = css`
  .serviceIcon {
    width: 32px;
    height: 32px;
    display: inline-block;
    margin-right: 1rem;
  }
`

export const ConnectedApp = ({ slug, name, api_id, platform_id, onRevoke, FallbackImage }) => {
  const [validImage, setValidImage] = useState(true)
  const { t } = useTranslation()

  const onClick = () => onRevoke(slug)
  const onImageError = () => setValidImage(false)
  const serviceIcon = `https://s3.amazonaws.com/pocket-developer-assets/${api_id}-${platform_id}.png`

  return (
    <>
      <label className={`${serviceStyle} flush`}>
        {validImage ? (
          <img src={serviceIcon} className="serviceIcon" onError={onImageError} alt="" />
        ) : null}

        {FallbackImage && !validImage ? <FallbackImage className="serviceIcon" /> : null}
        {name}
      </label>
      <button className="secondary actionInline" onClick={onClick}>
        {t('account:revoke-access', 'Revoke Access')}
      </button>
    </>
  )
}
