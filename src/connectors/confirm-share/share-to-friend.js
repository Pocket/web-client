// Deprecated Feb 2, 2021
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import { Button } from '@pocket/web-ui'
import { Trans, useTranslation } from 'common/setup/i18n'

import { css } from 'linaria'
import { TagList } from 'components/tagging/tag.list'
import { TagInput } from 'components/tagging/tag.input'
import { TagBox } from 'components/tagging/tag.box'

import { itemsSendToFriendConfirm } from 'connectors/items-by-id/my-list/items.share'
import { itemsShareAddFriend } from 'connectors/items-by-id/my-list/items.share'
import { itemsShareRemoveFriend } from 'connectors/items-by-id/my-list/items.share'

const sendToFriendStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  textarea {
    height: 2.5rem;
    max-width: initial;
  }

  button {
    white-space: nowrap;
    margin-left: var(--spacing100);
  }
`

const friendInput = css`
  width: 100%;
  padding: var(--spacing100) 0;
  input {
    max-width: initial;
  }
`

export function ShareToFriend() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const currentFriends = useSelector((state) => state.itemsToShare.friendList)

  const [activeTags, setActiveTags] = useState([])
  const [friendValue, setFriendValue] = useState('')
  const [commentValue, setCommentValue] = useState('')
  const [hasError, setHasError] = useState(false)

  const confirmShare = (comment) => dispatch(itemsSendToFriendConfirm(comment))

  const addFriendAction = (tag) => dispatch(itemsShareAddFriend(tag))
  const removeTagAction = (tag) => dispatch(itemsShareRemoveFriend(tag))

  const inputReference = useRef(null)
  const setInputRef = (input) => (inputReference.current = input)
  const setBlur = () => inputReference.current.blur()
  const onFocus = () => {}
  const setFocus = () => inputReference.current.focus()
  const setError = () => setHasError(true)
  const clearError = () => setHasError(false)

  // Tag Handling
  const selectClick = (tag) => {
    const tagActive = activeTags.includes(tag)
    tagActive
      ? setActiveTags((active) => active.filter((current) => current !== tag))
      : setActiveTags((active) => [...active, tag])
  }

  const handleRemoveAction = () => {
    if (activeTags.length) return removeActiveTags()

    const tag = currentFriends.slice(-1)[0]
    setActiveTags((active) => [...active, tag])
  }

  const removeActiveTags = () => {
    removeTagAction(activeTags)
    setActiveTags([])
  }

  const deactivateTags = () => setActiveTags([])

  const addTag = (tag) => {
    if (isEmail(tag)) {
      addFriendAction(tag)
      setFriendValue('')
      inputReference.current.focus()
      return
    }

    // Set an error here
  }

  const removeTag = (tags) => {
    removeTagAction(tags)
  }

  // Confirm share
  const sendConfirm = () => {
    if (currentFriends.length !== 0) {
      confirmShare(commentValue)
    }
  }

  return (
    <div className="content">
      <div className={friendInput} onClick={setFocus}>
        <TagBox>
          {currentFriends ? (
            <TagList
              tags={currentFriends}
              activeTags={activeTags}
              selectClick={selectClick}
              removeClick={removeTag}
            />
          ) : null}
          <TagInput
            // Set Reference
            inputRef={setInputRef}
            setBlur={setBlur}
            // Value Handling
            value={friendValue}
            setValue={setFriendValue}
            // Error Handling
            clearError={clearError}
            setError={setError}
            hasError={hasError}
            // Tags Active
            hasActiveTags={activeTags}
            deactivateTags={deactivateTags}
            handleRemoveAction={handleRemoveAction}
            submitForm={sendConfirm}
            // Passed Props
            addTag={addTag}
            onFocus={onFocus}
          />
        </TagBox>
      </div>
      <div className={sendToFriendStyle}>
        <textarea
          placeholder={t('share:comment', 'Comment')}
          value={commentValue}
          onChange={(e) => setCommentValue(e?.target?.value)}
        />
        <Button
          type="submit"
          disabled={currentFriends.length === 0}
          onClick={sendConfirm}>
          <Trans i18nKey="share:send-to-friends">Send to Friend(s)</Trans>
        </Button>
      </div>
    </div>
  )
}
