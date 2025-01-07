import style from './style.module.css'
import { useState, useRef } from 'react'

import type { ChangeEvent, KeyboardEvent } from 'react'

export function SavedTags({ tags = [] }: { tags?: string[] }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const suggestedTags = tags.filter((tag) => !activeTags.includes(tag))

  function addTag(tag: string) {
    const updatedTags = Array.from(new Set([...activeTags, tag]))
    // Add the value to the tags array
    setActiveTags(updatedTags)
  }

  const removeTag = (tag: string) => {
    const updatedTags = activeTags.filter((current) => current !== tag)
    setActiveTags(updatedTags)
  }

  const removeLastTag = () => {
    if (!activeTags.length) return
    const updatedTags = activeTags.slice(0, -1)
    setActiveTags(updatedTags)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    // Get the value of the input
    const target = e.target as HTMLInputElement
    const value = target.value.trim()

    // We don't want people to enter more than 25 characters
    if (value.length > 25 && e.key !== 'Backspace') return e.preventDefault()

    if (e.key === 'Enter' || e.key === 'Tab') {
      // If user did not press enter or tab key, return
      // If the value is empty, return
      if (!value) return

      // Otherwise let's add the tag
      addTag(value)

      // Clear the input and refocus it
      target.value = ''
      e.preventDefault()

      if (inputRef.current) inputRef.current.focus()
    }

    // If user did not press backspace, ignore it
    if (e.key === 'Backspace') {
      // Get the value of the input
      const target = e.target as HTMLInputElement
      const value = target.value.trim()

      // All we want to know is if we have an empty string
      if (!value.length) removeLastTag()
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // Get the value of the input
    const target = e.target as HTMLInputElement
    const value = target.value.trim()

    // Add some validation
    if (value.length > 25) {
      target.value = target.value.substring(0, 26)
      setErrorMessage('Tags can be up to 25 characters')
    }
    if (value.length <= 25 && errorMessage) return setErrorMessage(undefined)
  }

  return (
    <div className={style.container}>
      <label htmlFor="tags">Add Tags</label>
      <div className={style.tagInput}>
        <ActiveTags tags={activeTags} action={removeTag} />
        <input type="text" onKeyDown={handleKeyDown} onChange={handleChange} ref={inputRef} />
      </div>
      <SuggestedTags tags={suggestedTags} action={addTag} />
      {errorMessage ? <div className={style.error}>{errorMessage}</div> : null}
    </div>
  )
}

interface TagsElement {
  tags?: string[]
  action: (tag: string) => void
}

function ActiveTags({ tags, action }: TagsElement) {
  return <>{tags ? tags.map((tag) => <Tag key={tag} tag={tag} action={action} />) : null}</>
}

function SuggestedTags({ tags, action }: TagsElement) {
  return (
    <div className={style.suggestedTags}>
      {tags ? tags.map((tag) => <Tag key={tag} tag={tag} action={action} />) : null}
    </div>
  )
}

interface TagElement {
  tag: string
  action: (tag: string) => void
}
function Tag({ tag, action }: TagElement) {
  const onClick = () => action(tag)
  return (
    <button className={style.tag} onClick={onClick}>
      <span>{tag}</span>
    </button>
  )
}
