import { useState, useEffect, useRef } from 'react'
import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'

import { itemsTagConfirm } from 'connectors/items-by-id/my-list/items.tag'
import { itemsTagCancel } from 'connectors/items-by-id/my-list/items.tag'
import { itemsTagAdd } from 'connectors/items-by-id/my-list/items.tag'
import { itemsTagRemove } from 'connectors/items-by-id/my-list/items.tag'

import { trackImpression } from 'connectors/snowplow/snowplow.state'
import { IMPRESSION_COMPONENT_UI } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'

import { TagList } from 'components/tagging/tag.list'
import { TagInput } from 'components/tagging/tag.input'
import { TagBox } from 'components/tagging/tag.box'

import { TagSuggestions } from 'components/tagging/tag.suggestions'
import { TagUpsell } from 'components/tagging/tag.upsell'

export function TaggingModal() {
  const appRootSelector = '#__next'

  const dispatch = useDispatch()
  const confirmTags = (tags) => dispatch(itemsTagConfirm(tags))
  const addTagAction = (tag) => dispatch(itemsTagAdd(tag))
  const removeTagAction = (tag) => dispatch(itemsTagRemove(tag))
  const cancelTag = () => dispatch(itemsTagCancel())

  const isPremium = useSelector((state) => state.user.premium_status === '1')

  // Get item tags from state
  const itemsToTag = useSelector((state) => state.itemsToTag.itemList)
  const currentTags = useSelector((state) => state.itemsToTag.tags)
  const suggestedTags = useSelector((state) => state.itemsToTag.suggestedTags)
  const showModal = itemsToTag?.length > 0

  const isSingleTag = itemsToTag.length === 1

  const [value, setValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const [activeTags, setActiveTags] = useState([])

  useEffect(() => {
    setValue('')
  }, [showModal])

  /**
   * Event Actions
   * ------------------------------------------------------------------------
   */
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

    const tag = currentTags.slice(-1)[0]
    setActiveTags((active) => [...active, tag])
  }

  const removeActiveTags = () => {
    removeTagAction(activeTags)
    setActiveTags([])
  }

  const deactivateTags = () => setActiveTags([])

  const addTag = (tag) => {
    addTagAction(tag)
    setValue('')
    inputReference.current.focus()
  }

  const removeTag = (tags) => {
    removeTagAction(tags)
  }

  const saveTags = () => {
    confirmTags(currentTags)
  }

  const title = currentTags?.length ? 'Edit Tags' : 'Add Tags'

  const handleImpression = (identifier) => dispatch(trackImpression(
    IMPRESSION_COMPONENT_UI,
    IMPRESSION_REQUIREMENT_VIEWABLE,
    0,
    identifier
  ))

  return (
    <Modal
      title={title}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={title}
      handleClose={cancelTag}
      onClick={setFocus}>
      <ModalBody className="tagging">
        <TagBox>
          {currentTags ? (
            <TagList
              tags={currentTags}
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
            value={value}
            setValue={setValue}
            characterLimit={25}
            // Error Handling
            clearError={clearError}
            setError={setError}
            hasError={hasError}
            // Tags Active
            hasActiveTags={activeTags}
            deactivateTags={deactivateTags}
            handleRemoveAction={handleRemoveAction}
            submitForm={saveTags}
            // Passed Props
            addTag={addTag}
            onFocus={onFocus}
          />
        </TagBox>
        {!isPremium && isSingleTag ? (
          <TagUpsell onVisible={handleImpression} />
        ) : null}
        {isPremium && isSingleTag ? (
          <TagSuggestions
            suggestedTags={suggestedTags}
            tags={currentTags}
            addTag={addTag}
            isPremium={isPremium}
            trackClick={() => {}}
          />
        ) : null}
      </ModalBody>
      <ModalFooter isSticky={false}>
        <div className="actions">
          <Button
            type="submit"
            onClick={saveTags}>
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
