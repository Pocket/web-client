import { useState, useEffect, useRef } from 'react'
import { Button } from 'components/buttons/button'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, Trans } from 'next-i18next'

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

export function MutationTaggingModal() {
  const appRootSelector = '#__next'
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Get item tags from state
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const itemsToTag = useSelector((state) => state.mutationTagging.itemIds)
  const currentTags = useSelector((state) => state.mutationTagging.tagNames)
  const activeTags = useSelector((state) => state.mutationTagging.activeTags)
  const needsSaving = useSelector((state) => state.mutationTagging.needsSaving)

  const showModal = itemsToTag?.length > 0

  // State
  const [value, setValue] = useState('') // This is the managed input value
  const [hasError, setHasError] = useState(false) // Error state on tags

  const cancelTags = () => dispatch(mutationTagCancel())
  const confirmTags = (value) => {
    setBlur()
    if (value) dispatch(mutationTagAdd(value))
    dispatch(mutationTagConfirm(value))
    setValue('')
  }

  // Dispatch Actions
  const removeTag = (tags) => {
    dispatch(mutationTagRemove(tags))
    setFocus()
  }

  const addTag = (tag) => {
    dispatch(mutationTagAdd(tag))
    setFocus()
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

  const title = currentTags?.length
    ? t('confirm:edit-tags', 'Edit Tags')
    : t('confirm:add-tags', 'Add Tags')

  useEffect(() => {
    // Cutting this one off as it is berry berry slow ... to the point of failure
    if (itemsToTag.length === 1 && isPremium && 'apples' === 'oranges') {
      dispatch(mutationTagGetSuggestions(itemsToTag[0]))
    }
  }, [itemsToTag, isPremium, dispatch])

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
            characterLimit={25}
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
        </TagBox>
      </ModalBody>
      <ModalFooter isSticky={false}>
        <div className="actions">
          <Button
            disabled={needsSaving}
            type="submit"
            data-cy="tagging-confirm"
            onClick={handleSave}>
            <Trans i18nKey="confirm:save">Save</Trans>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
