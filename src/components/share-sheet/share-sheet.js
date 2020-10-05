import React from 'react'
import { css } from 'linaria'
import { SendToFriend } from './share-sheet.send-to-friend'
import {
  Button,
  breakpointTinyTablet
} from '@pocket/web-ui'
import { overlayBase } from 'components/overlay/overlay'
// import { ItemInfo } from 'Modules/Items/Common/Info/item.info'
import { validateEmail } from 'common/utilities'
import classNames from 'classnames'

const shareContainer = css`
  font-family: "Graphik Web";
  padding: 20px 0;
  max-width: 575px;
  color: var(--color-textPrimary);
  h2,
  h3 {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-size: 1em;
    line-height: 1.5em;
  }
  h3 {
    text-transform: uppercase;
    padding-bottom: 1.5em;
  }
`
const shareHeader = css`
  font-weight: 600;
  padding: 0 1em 1em;
  border-bottom: 1px solid var(--color-dividerSecondary);
`
const shareDetails = css`
  padding: 1em;
  display: grid;
  grid-template-columns: auto 120px;
  grid-column-gap: 20px;
  cite {
    color: var(--color-textSecondary);
    display: block;
    font-weight: 300;
    font-style: normal;
  }

  ${breakpointTinyTablet} {
    grid-template-columns: 1fr;
    grid-column-gap: 0;
  }
`

const shareQuote = css`
  margin: 5px 25px 25px;
  padding: 0 15px;
  border-left: 1px solid var(--color-dividerSecondary);
  color: var(--color-textSecondary);
  font-style: italic;
`

const shareThumbnail = css`
  background-size: cover;
  width: 100%;
  height: 100px;
  border-radius: 4px;
  display: block;

  ${breakpointTinyTablet} {
    display: none;
  }
`

const shareComment = css`
  padding: 0 1em 1em;
  textarea {
    border: 1px solid var(--color-formFieldBorder);
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--color-textSecondary);
    font-size: 0.875em;
    padding: 0.8em;
    resize: none;
    width: 100%;
    max-width: unset;
  }
`

const shareAction = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1em 0.25em;
  button {
    margin-left: 10px;
  }
`

export class ShareSheet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      email: '',
      friends: [],
      emails: []
    }
  }

  onFriendUpdate = email => {
    if (this.state.friends.indexOf(email) > -1) {
      this.removeEmail(email)
    } else {
      this.addEmail(email)
    }
  }

  onSocialShare = () => {
    const { email, emails } = this.state
    const validEmails =
      email && validateEmail(email) ? [...emails, email] : emails
    const recipients = validEmails.map(email => {
      return { email }
    })

    const shareData = {
      item_id: this.props.item_id
    }

    if (this.state.comment) shareData.comment = this.state.comment
    if (this.props.quote) shareData.quote = this.props.quote
    if (recipients.length > 0) shareData.to = recipients
    if (this.props.recommend) shareData.channels = ['public_profile']

    this.props.confirmModal(shareData)
    this.props.onClose()
  }

  handleCommentChange = event => {
    this.setState({ comment: event.target.value })
  }

  handleEmailChange = email => {
    this.setState({ email })
  }

  addEmail = email => {
    this.setState({ email: '' })
    if (this.state.emails.includes(email)) return
    this.setState({ emails: [...this.state.emails, email] })
    this.addFriend(email)
  }

  removeEmail = email => {
    if (!this.state.emails.includes(email)) return
    this.setState({
      emails: this.state.emails.filter(current => current !== email)
    })
    this.removeFriend(email)
  }

  addFriend = friend => {
    const friends = [...this.state.friends, friend]
    this.setState({ friends })
  }

  removeFriend = friend => {
    const friends = this.state.friends.filter(email => email !== friend)
    this.setState({ friends })
  }

  setEmails = emails => {
    this.setState({ emails })
  }

  get canSend() {
    if (this.props.recommend === 'recommend') return true
    if (this.state.friends.length > 0) return true
    if (this.state.emails.length > 0) return true
    if (validateEmail(this.state.email)) return true
    return false
  }

  render() {
    const {
      title,
      recommend,
      quote,
      recent_friends,
      auto_complete_emails,
      thumbnail
    } = this.props

    const isRecommend = recommend === 'recommend'

    return (
      <div className={classNames(overlayBase, shareContainer)}>
        <div className={shareHeader}>
          {isRecommend
            ? "Recommend"
            : "Send"}
        </div>
        <div className={shareDetails}>
          <header>
            <h2>{title}</h2>
            {/*<ItemInfo {...this.props} noLink={true} />*/}
          </header>
          {thumbnail ? (
            <div
              className={shareThumbnail}
              style={{ backgroundImage: `url('${thumbnail}')` }} />
          ) : null}
        </div>

        {quote ? <div className={shareQuote}>{quote}</div> : null}

        <div className={shareComment}>
          <textarea
            value={this.state.comment}
            onChange={this.handleCommentChange}
            placeholder="Comment" //translate('share.commentPlaceholder')
          />
        </div>

        {!recommend ? (
          <SendToFriend
            selectedFriends={this.state.friends}
            recent_friends={recent_friends}
            auto_complete_emails={auto_complete_emails}
            onFriendUpdate={this.onFriendUpdate}
            addEmail={this.addEmail}
            removeEmail={this.removeEmail}
            setEmails={this.setEmails}
            emails={this.state.emails}
            value={this.state.email}
            setValue={this.handleEmailChange}
          />
        ) : null}

        <div className={shareAction}>
          <Button
            type="neutral"
            // aria-label={translate('share.cancelAction')}
            onClick={this.props.onClose}>
            Cancel
          </Button>
          <Button
            disabled={!this.canSend}
            // aria-label={
            //   isRecommend
            //     ? translate('share.recommendAction')
            //     : translate('share.sendAction')
            // }
            onClick={this.onSocialShare}>
            {isRecommend
              ? "Recommend"
              : "Send"}
          </Button>
        </div>
      </div>
    )
  }
}
