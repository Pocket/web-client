// Components
import { ItemArticleLayout, type LayoutType } from '../item-article-layout'

// Types
import type { StoryFn } from '@storybook/react'

/**
 * inGrid
 * ---
 * Places the story in a grid
 * @see {@link https://storybook.js.org/docs/react/writing-stories/decorators}
 */
export function inArticleLayout(Story: StoryFn, layoutType: LayoutType) {
  return (
    <main className="page-container">
      <ItemArticleLayout layoutType={layoutType}>
        <Story />
      </ItemArticleLayout>
    </main>
  )
}

export type { LayoutType } from '../item-article-layout'
