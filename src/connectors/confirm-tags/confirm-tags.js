import { useState, useEffect, useRef } from 'react'
import { Button } from 'components/buttons/button'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, Trans } from 'next-i18next'

import { getUserTags } from 'containers/saves/tags-page/tags-page.state'

import { itemsTagConfirm } from 'connectors/items-by-id/saves/items.tag'
import { itemsTagCancel } from 'connectors/items-by-id/saves/items.tag'
import { itemsTagAdd } from 'connectors/items-by-id/saves/items.tag'
import { itemsTagRemove } from 'connectors/items-by-id/saves/items.tag'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { TagList } from 'components/tagging/tag.list'
import { TagInput } from 'components/tagging/tag.input'
import { TagBox } from 'components/tagging/tag.box'

import { TagSuggestions } from 'components/tagging/tag.suggestions'
import { TagUpsell } from 'components/tagging/tag.upsell'

import { TypeAhead } from 'components/type-ahead/type-ahead'

export function TaggingModal() {
  const appRootSelector = '#__next'

  const dispatch = useDispatch()
  const confirmTags = (tags) => dispatch(itemsTagConfirm(tags))
  const addTagAction = (tag) => dispatch(itemsTagAdd(tag))
  const removeTagAction = (tag) => dispatch(itemsTagRemove(tag))
  const cancelTag = () => dispatch(itemsTagCancel())
  const { t } = useTranslation()

  const isPremium = useSelector((state) => state.user.premium_status === '1')

  // Get item tags from state
  const itemsToTag = useSelector((state) => state.itemsToTag.itemList)
  const currentTags = useSelector((state) => state.itemsToTag.tags)
  const suggestedTags = useSelector((state) => state.itemsToTag.suggestedTags)
  const since = useSelector((state) => state.userTags.since)
  const showModal = itemsToTag?.length > 0

  const allTags = useSelector((state) => state.userTags.tagsList)

  const isSingleTag = itemsToTag.length === 1

  const [fresh, setFresh] = useState(true)
  const [value, setValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const [activeTags, setActiveTags] = useState([])

  useEffect(() => {
    setValue('')
    setFresh(true)
    if (showModal) dispatch(getUserTags())
  }, [showModal, dispatch])

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
    setFresh(false)
    removeTagAction(activeTags)
    setActiveTags([])
  }

  const deactivateTags = () => setActiveTags([])

  const addTag = (tag) => {
    setFresh(false)
    addTagAction(tag)
    setValue('')
    inputReference.current.focus()
  }

  const removeTag = (tags) => {
    setFresh(false)
    removeTagAction(tags)
  }

  const saveTags = () => {
    let tagsToSubmit = value ? [value, ...currentTags] : currentTags
    confirmTags(tagsToSubmit)
  }

  const title = currentTags?.length
    ? t('confirm:edit-tags', 'Edit Tags')
    : t('confirm:add-tags', 'Add Tags')

  const handleImpression = (identifier) => dispatch(sendSnowplowEvent(identifier))

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
          {allTags.length > 0 ? (
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
            suggestedTags={suggestedTags}
            tags={currentTags}
            addTag={addTag}
            allTags={allTags}
            since={since}
          />
        ) : null}
      </ModalBody>
      <ModalFooter isSticky={false}>
        <div className="actions">
          <Button
            disabled={!value ? fresh : false}
            type="submit"
            data-cy="tagging-confirm"
            onClick={saveTags}>
            <Trans i18nKey="confirm:save">Save</Trans>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
