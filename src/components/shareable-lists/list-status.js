import Link from 'next/link'
import { css } from 'linaria'
import { LockIcon } from 'components/icons/LockIcon'
import { GlobeIcon } from 'components/icons/GlobeIcon'

const statusStyles = css`
  .chip {
    display: inline-block;
    padding: 2px 8px;
    font-size: 14px;
    background: #f9fafb;
    color: var(--color-textSecondary);
    border-radius: 100px;

    &.public {
      background: var(--color-teal100);
      color: var(--color-actionPrimary);
    }
  }
`

export const ListStatus = ({ status, url }) => {
  const isPrivate = status === 'PRIVATE'

  return (
    <div className={statusStyles}>
      {isPrivate ? (
        <div className="chip private">
          <LockIcon /> Private
        </div>
      ) : (
        <>
          <div className="chip public">
            <GlobeIcon /> Public
          </div>{' '}
          <Link href={url}>{`https://getpocket.com${url}`}</Link>
        </>
      )}
    </div>
  )
}
