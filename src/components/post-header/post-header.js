import { css } from '@emotion/css'
import { timeRelativeToNow } from 'common/utilities/date-time/date-time'
import Avatar from 'components/avatar/avatar'
import dayjs from 'dayjs'

const postStyles = css`
  font-family: var(--fontSansSerif);

  .heading {
    display: flex;
    flex-direction: row;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-left: 0.5rem;
    margin-bottom: 1rem;
    flex-grow: 2;
  }

  .time {
    margin-bottom: 0.5rem;
    color: var(--color-textSecondary);
    font-size: 0.875rem;
    line-height: 1.875rem;
  }

  .comment {
    margin-bottom: 1rem;
  }

  .quote {
    margin: 0.5rem 0 1rem;
    padding: 0 1rem;
    border-left: 1px solid var(--color-dividerTertiary);
    color: var(--color-textSecondary);
    font-style: italic;
    font-size: 1rem;
  }
`

export const PostHeader = ({ profile, quote, comment, time_shared }) => {
  const timestamp = dayjs.unix(time_shared)
  const timeAgo = timeRelativeToNow(timestamp)

  return (
    <aside className={postStyles}>
      <div className="heading">
        <Avatar src={profile.avatar_url} size="30px" />
        <h4>{profile.name}</h4>
        <p className="time">{timeAgo}</p>
      </div>

      {comment ? <p className="comment">{comment}</p> : null}
      {quote ? <p className="quote">{quote}</p> : null}
    </aside>
  )
}
