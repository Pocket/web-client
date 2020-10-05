import { css } from 'linaria'
import { FriendList } from './share-sheet.friends'
import { Tagging } from 'components/tagging/tagging'

const panelWrapper = css`
  margin-bottom: 1em;
  padding: 1em 0;
  border-top: 4px solid var(--color-dividerTertiary);
  border-bottom: 1px solid var(--color-dividerTertiary);
  h4 {
    margin: 0 0 10px;
    font-size: 12px;
    font-weight: 400;
  }
`
const inputWrapper = css`
  padding: 0 1em 0.25em;
`
const clampHeight = css`
  max-height: 200px;
  overflow-y: scroll;
`

export const SendToFriend = ({
  value,
  setValue,
  addEmail,
  removeEmail,
  setEmails,
  emails,
  auto_complete_emails,
  recent_friends,
  onFriendUpdate,
  selectedFriends
}) => (
  <div className={panelWrapper}>
    <div className={inputWrapper}>
      <h4>SEND TO</h4> {/*Translate??*/}
      <Tagging
        value={value}
        setValue={setValue}
        addTag={addEmail}
        removeTag={removeEmail}
        setTags={setEmails}
        tags={emails}
        typeahead={auto_complete_emails}
        email
      />
    </div>
    <div className={clampHeight}>
      {recent_friends ? (
        <FriendList
          friends={recent_friends}
          onToggle={onFriendUpdate}
          selectedFriends={selectedFriends}
        />
      ) : null}
    </div>
  </div>
)
