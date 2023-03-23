import Link from 'next/link'
import { css, cx } from 'linaria'
import { LockIcon } from 'components/icons/LockIcon'
import { GlobeIcon } from 'components/icons/GlobeIcon'
import { PublicListUrl } from './public-list-url'
import { breakpointSmallTablet } from 'common/constants'

const statusStyles = css`
  display: flex;
  align-items: center;

  ${breakpointSmallTablet} {
    flex-direction: column;
    align-items: baseline;
  }

  .chip {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
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

    .icon {
      margin-top: 0;
      margin-right: 0.25rem;
    }
  }
`

export const ListStatusLink = ({ listStatusInfo }) => {
  const { status } = listStatusInfo
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
          <PublicListUrl publicListInfo={listStatusInfo} />
        </>
      )}
    </div>
  )
}
