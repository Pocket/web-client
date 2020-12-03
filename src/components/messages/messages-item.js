import { css } from 'linaria'
import dayjs from 'dayjs'
import { domainForUrl } from 'common/utilities'
import Avatar from 'components/avatar/avatar'
import { Card } from 'components/item-card/messages/card'
import { fontSansSerif, Button } from '@pocket/web-ui'
import { timeRelativeToNow } from 'common/utilities'

const messageWrapper = css`
  padding-bottom: var(--spacing150);
  border-bottom: 1px solid var(--color-dividerTertiary);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  &:last-child {
    border-bottom: none;
  }

  & > span {
    min-width: 72px;
    margin-right: var(--spacing150);
  }

  aside {
    width: 100%;
  }

  header {
    font-family: ${fontSansSerif};
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing100);

    div p {
      display: inline-block;
      margin-bottom: 0;
    }

    button.inline {
      text-decoration: none;
      font-weight: 500;
      color: var(--color-actionPrimary);

      &:hover, &:active {
        color: var(--color-actionPrimaryHover);
        text-decoration: underline;
      }
    }
  }

  .name {
    font-weight: 500;
    margin-right: var(--spacing050);
  }

  .comment {
    font-family: ${fontSansSerif};
    color: var(--color-textSecondary);
    margin-bottom: var(--spacing150);
  }
`

export const MessageItem = ({
  comment,
  time_shared,
  from_friend,
  item,
  share_id,
  item_id,
  addItem,
  ignoreMessage
}) => {
  const { resolved_title, resolved_url } = item
  const { avatar_url, name } = from_friend
  const time = dayjs.unix(time_shared).format('MMMM DD, YYYY h:mm a')
  const domain = domainForUrl(resolved_url)

  const handleSave = () => {
    addItem({ share_id, item_id, item })
  }

  const handleIgnore = () => {
    ignoreMessage({ share_id, item_id, item })
  }

  return (
    <div className={messageWrapper}>
      <Avatar src={avatar_url} size="72px" />
      <aside>
        <header>
          <div>
            <p className="name">{ name }</p>
            <p className="time">{ timeRelativeToNow(time) }</p>
          </div>
          <Button
            variant="inline"
            // onClick={handleIgnore}
          >Dismiss</Button>
        </header>
        <p className="comment">{ comment }</p>
        <Card
          item={item}
          onSave={handleSave} />
      </aside>
    </div>
  )
}
