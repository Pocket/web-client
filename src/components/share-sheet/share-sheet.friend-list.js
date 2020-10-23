import { css } from 'linaria'
import { Friends } from './share-sheet.friends'
import { Tagging } from 'components/tagging/tagging'

const panelWrapper = css`
  margin: 0 -1em 1em;
  padding: 1em 0 0;
  border-top: 4px solid var(--color-dividerTertiary);
  h4 {
    margin: 0 0 10px;
    font-size: 12px;
    font-weight: 400;
  }
`
const inputWrapper = css`
  padding: 0 1em 0.25em;
`

export const FriendList = ({
  value,
  setValue,
  addEmail,
  removeEmail,
  setEmails,
  emails,
  autoCompleteEmails,
  recentFriends,
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
        typeahead={autoCompleteEmails?.map((item) => item.email)}
        email
      />
    </div>
    {recentFriends ? (
      <Friends
        friends={recentFriends}
        onToggle={onFriendUpdate}
        selectedFriends={selectedFriends}
      />
    ) : null}
  </div>
)
