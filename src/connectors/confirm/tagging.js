import { useState, useEffect, useRef } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, Trans } from 'next-i18next'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { requestUserTags } from 'containers/saves/tagged/tagged-page.state'
import { mutationTagConfirm } from 'connectors/items/mutation-tagging.state'
import { mutationTagCancel } from 'connectors/items/mutation-tagging.state'
import { mutationTagAdd } from 'connectors/items/mutation-tagging.state'
import { mutationTagRemove } from 'connectors/items/mutation-tagging.state'
import { mutationTagSelect } from 'connectors/items/mutation-tagging.state'
import { mutationTagSelectionsClear } from 'connectors/items/mutation-tagging.state'
import { mutationTagGetSuggestions } from 'connectors/items/mutation-tagging.state'

import { TagList } from 'components/tagging/tag.list'
import { TagInput } from 'components/tagging/tag.input'
import { TagBox } from 'components/tagging/tag.box'

import { TagSuggestions } from 'components/tagging/tag.suggestions'
import { TagUpsell } from 'components/tagging/tag.upsell'

import { TypeAhead } from 'components/type-ahead/type-ahead'
import { MAX_TAG_NAME_LENGTH } from 'common/constants'

export function ConfirmTagging() {
  const appRootSelector = '#__next'
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Get item tags from state
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const itemsToTag = useSelector((state) => state.mutationTagging.itemIds)
  const currentTags = useSelector((state) => state.mutationTagging.tagNames)
  const activeTags = useSelector((state) => state.mutationTagging.activeTags)
  const tagSuggestions = useSelector((state) => state.mutationTagging.tagSuggestions)
  const tagSuggestionStatus = useSelector((state) => state.mutationTagging.tagSuggestionStatus)
  const allTags = useSelector((state) => state.userTags.tagNames)

  const showModal = itemsToTag?.length > 0
  const isSingleTag = itemsToTag.length === 1

  // State
  const [fresh, setFresh] = useState(true)
  const [value, setValue] = useState('') // This is the managed input value
  const [hasError, setHasError] = useState(false) // Error state on tags

  const cancelTags = () => dispatch(mutationTagCancel())
  const confirmTags = (value) => {
    const trimmedValue = value.trim()
    setBlur()
    if (trimmedValue) dispatch(mutationTagAdd(trimmedValue))
    dispatch(mutationTagConfirm(value))
    setValue('')
  }

  // Dispatch Actions
  const removeTag = (tags) => {
    dispatch(mutationTagRemove(tags))
    setFocus()
    setFresh(false)
  }

  const addTag = (tag) => {
    dispatch(mutationTagAdd(tag))
    setFocus()
    setFresh(false)
    setValue('')
  }

  const selectTag = (tag) => dispatch(mutationTagSelect(tag))
  const clearSelections = () => {
    if (activeTags.length) dispatch(mutationTagSelectionsClear())
  }

  // Input event actions
  const inputReference = useRef(null)
  const setInputRef = (input) => (inputReference.current = input)
  const setBlur = () => inputReference.current.blur()
  const setFocus = () => inputReference.current.focus()
  const setError = () => setHasError(true)
  const clearError = () => setHasError(false)
  const handleSave = () => confirmTags(value)
  const handleAdd = (tag) => {
    addTag(tag)
    setValue('')
    inputReference.current.focus()
  }

  // Remove action is delete/backspace
  const handleBackspace = () => {
    if (activeTags.length) return removeTag()
    // If there are no selected tags, select the last tag
    const tag = currentTags.slice(-1)[0]
    if (tag) selectTag(tag)
  }

  const handleImpression = (identifier) => dispatch(sendSnowplowEvent(identifier))

  const title = currentTags?.length
    ? t('confirm:edit-tags', 'Edit Tags')
    : t('confirm:add-tags', 'Add Tags')

  useEffect(() => {
    if (itemsToTag.length === 1 && isPremium) {
      dispatch(mutationTagGetSuggestions(itemsToTag[0]))
    }
  }, [itemsToTag, isPremium, dispatch])

  useEffect(() => {
    dispatch(requestUserTags())
  }, [dispatch])

  useEffect(() => {
    setValue('')
    setFresh(true)
  }, [showModal])

  return (
    <Modal
      title={title}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={title}
      handleClose={cancelTags}
      onClick={setFocus}>
      <ModalBody className="tagging">
        <TagBox>
          {currentTags ? (
            <TagList
              tags={currentTags}
              activeTags={activeTags}
              selectClick={selectTag}
              removeClick={removeTag}
            />
          ) : null}
          <TagInput
            // Set Reference
            inputRef={setInputRef}
            setBlur={setBlur}
            // Value Handling
            value={value}
            setValue={setValue}
            characterLimit={MAX_TAG_NAME_LENGTH}
            // Error Handling
            clearError={clearError}
            setError={setError}
            hasError={hasError}
            // Tags Active
            hasActiveTags={activeTags}
            deactivateTags={clearSelections}
            handleRemoveAction={handleBackspace}
            submitForm={handleSave}
            // Passed Props
            addTag={handleAdd}
          />
          {allTags?.length > 0 ? (
            <TypeAhead
              reFocus={setFocus}
              setValue={addTag}
              inputValue={value}
              textInput={inputReference.current}
              items={allTags}
            />
          ) : null}
        </TagBox>
        {!isPremium ? <TagUpsell onVisible={handleImpression} /> : null}
        {isPremium && isSingleTag ? (
          <TagSuggestions
            suggestedTags={tagSuggestions}
            tags={currentTags}
            addTag={addTag}
            allTags={allTags}
            tagSuggestionStatus={tagSuggestionStatus}
          />
        ) : null}
      </ModalBody>
      <ModalFooter isSticky={false}>
        <div className="actions">
          <button
            className="primary"
            disabled={!value.trim() ? fresh : false}
            type="submit"
            data-testid="tagging-confirm"
            onClick={handleSave}>
            <Trans i18nKey="confirm:save">Save</Trans>
          </button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
