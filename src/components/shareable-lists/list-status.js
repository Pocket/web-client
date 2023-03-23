import Link from 'next/link'
import { css, cx } from 'linaria'
import { LockIcon } from 'components/icons/LockIcon'
import { GlobeIcon } from 'components/icons/GlobeIcon'
import { PublicListUrl } from './public-list-url'

const statusStyles = css`
  display: flex;
  align-items: center;

  .chip {
    display: inline-block;
    padding: 2px 8px;
    font-size: 14px;
    background: #f9fafb;
    color: var(--color-textSecondary);
    border-radius: 100px;
    margin-right: 0.5rem;
    &.public {
      background: var(--color-teal100);
      color: var(--color-actionPrimary);
    }
  }
`

export const ListStatus = ({ status, publicListInfo }) => {
  const isPrivate = status === 'PRIVATE'

  return (
    <div className={cx('listStatus', statusStyles)}>
      {isPrivate ? (
        <div className="chip private">
          <LockIcon /> Private
        </div>
      ) : (
        <>
          <div className="chip public">
            <GlobeIcon /> Public
          </div>{' '}
          <PublicListUrl publicListInfo={publicListInfo} />
        </>
      )}
    </div>
  )
}
