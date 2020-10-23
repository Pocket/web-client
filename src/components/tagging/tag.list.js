import React from 'react'
import { Tag } from 'components/tags/tags'

export const TagList = ({ tags, activeTags, selectClick, removeClick }) => {
  return tags.map((tag) => {
    const isActive = activeTags?.includes(tag)
    return (
      <Tag
        margin="0 5px 0.6em 0"
        key={tag}
        selectClick={selectClick}
        removeClick={removeClick}
        selected={isActive}>
        {tag}
      </Tag>
    )
  })
}
