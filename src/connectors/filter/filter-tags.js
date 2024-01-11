import { useSelector } from 'react-redux'
import { useState, useRef } from 'react'

import { TagList } from 'components/tagging/tag.list'
import { TagInput } from 'components/tagging/tag.input'
import { TagBox } from 'components/tagging/tag.box'
import { TypeAhead } from 'components/type-ahead/type-ahead'

import { MAX_TAG_NAME_LENGTH } from 'common/constants'

export const FilterTags = ({ handleUpdate }) => {
  const [value, setValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const [currentTags, setCurrentTags] = useState([])
  const [activeTags, setActiveTags] = useState([])

  const allTags = useSelector((state) => state.userTags.tagNames)

  const inputReference = useRef(null)
  const setInputRef = (input) => (inputReference.current = input)
  const setFocus = () => inputReference.current.focus()
  const setBlur = () => inputReference.current.blur()

  const clearError = () => setHasError(false)
  const setError = () => setHasError(true)

  const updateFilter = (tags) => {
    setCurrentTags(tags)
    handleUpdate(tags)
  }

  const selectTag = (tag) => {
    const tagActive = activeTags.includes(tag)
    const updatedActive = tagActive
      ? activeTags.filter((current) => current !== tag)
      : [...activeTags, tag]
    setActiveTags(updatedActive)
  }

  const removeTag = (tags) => {
    const tagsToDelete = tags ? [tags] : activeTags
    const tagNames = currentTags.filter((tagName) => !tagsToDelete.includes(tagName))
    setActiveTags([])
    updateFilter(tagNames)
    setFocus()
  }

  const addTag = (tag) => {
    const updatedTags = new Set([...currentTags, tag])
    const tagNames = Array.from(updatedTags)
    updateFilter(tagNames)
    setFocus()
    setValue('')
  }

  const clearSelections = () => {
    if (activeTags.length) setActiveTags([])
  }

  const handleSave = () => confirmTags(value)

  const handleAdd = (tag) => {
    addTag(tag)
    inputReference.current.focus()
  }

  // Remove action is delete/backspace
  const handleBackspace = () => {
    if (activeTags.length) return removeTag()
    // If there are no selected tags, select the last tag
    const tag = currentTags.slice(-1)[0]
    if (tag) selectTag(tag)
  }

  const confirmTags = (value) => {
    const trimmedValue = value.trim()
    setBlur()
    if (trimmedValue) addTag(trimmedValue)
  }

  return (
    <TagBox onClick={setFocus}>
      {currentTags ? (
        <TagList
          tags={currentTags}
          activeTags={activeTags}
          selectClick={selectTag}
          removeClick={removeTag}
        />
      ) : null}
      <TagInput
        placeholder="Filter by tag"
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
  )
}
