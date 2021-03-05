import { cardStyle } from './topic-card'
import { css, cx } from 'linaria'
import { ChevronLeftIcon } from '@pocket/web-ui'
import Link from 'next/link'

import extension from 'static/images/home/extension.svg'
import myList from 'static/images/home/myList.svg'

const skeletonStyle = css`
  &.full {
    grid-column: span 8;
  }

  .my-list {
    width: 100%;
    margin-top: 1rem;
  }

  .extension {
    width: 80%;
    margin-bottom: 1rem;
  }

  &.callout {
    border-radius: 4px;
    padding: 0.5rem 1rem;
    /* background-color: var(--color-dividerTertiary); */
    .box {
      font-family: var(--fontSerifAlt);
      font-size: 1.5rem;
      font-weight: 700;
      a {
        white-space: nowrap;
      }
      .welcome {
        margin-top: 3rem;
      }
    }
  }

  .titles {
    width: 80%;
    height: 1rem;
    margin: 1rem 0;
    &.smaller {
      width: 60%;
    }
  }
  .media,
  .titles {
    border-radius: 4px;
    background-color: var(--color-dividerTertiary);
  }
`

export const Skeleton = ({ name, type, count }) => {
  return (
    <>
      {Array.from({ length: count }, (x, i) => (
        <article key={`${name}-${i}`} className={cx(cardStyle, skeletonStyle)}>
          <div className="media" />
          <div className="titles" />
          <div className="titles smaller" />
        </article>
      ))}
    </>
  )
}

export const RecentSavesSkeleton = ({ count }) => {
  const skeletonClass = cx(
    cardStyle,
    skeletonStyle,
    'callout',
    count === 1 && 'full'
  )
  return (
    <>
      {count === 2 ? (
        <article className={skeletonClass}>
          <div className="box">
            <img src={extension} className="extension" />
            Save content from anywhere:{' '}
            <Link href={'/my-list/'}>
              <a>Using the extension</a>
            </Link>
          </div>
        </article>
      ) : null}
      {count === 1 ? (
        <article className={skeletonClass}>
          <div className="box">
            <ChevronLeftIcon /> You can find all your saves in{' '}
            <Link href={'/my-list/'}>
              <a>My List</a>
            </Link>
            <img src={myList} className="my-list" />
          </div>
        </article>
      ) : null}
    </>
  )
}
