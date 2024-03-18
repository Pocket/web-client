import {
  Tag,
  SuggestedTag,
  TrendingTag,
  BestOfTag,
  FavoriteTag,
  BulkSelectTag,
  WebOnlyTag,
  HighlightsTag
} from './tags'
import { css } from '@emotion/css'

export default {
  title: 'Components/Tags'
}

const marksGrid = css`
  display: flex;
  width: 80%;
  justify-content: space-between;
`

export const tag = () => (
  <div className={marksGrid}>
    <Tag selected>business</Tag>
    <Tag selected removeClick>
      business
    </Tag>
    <Tag removeClick>business</Tag>
    <Tag>business</Tag>
  </div>
)

export const suggested = () => <SuggestedTag>business</SuggestedTag>

export const bestOf = () => <BestOfTag>Best Of</BestOfTag>

export const favorite = () => <FavoriteTag />

export const bulkSelect = () => <BulkSelectTag>42 items</BulkSelectTag>

export const trending = () => <TrendingTag>Trending</TrendingTag>

export const webOnly = () => <WebOnlyTag />

export const highlights = () => <HighlightsTag count={3} />

export const allTags = () => (
  <div className={marksGrid}>
    <Tag selected>business</Tag>
    <Tag selected removeClick>
      business
    </Tag>
    <Tag removeClick>business</Tag>
    <Tag>business</Tag>
    <SuggestedTag>business</SuggestedTag>
    <BestOfTag>Best Of</BestOfTag>
    <FavoriteTag />
    <BulkSelectTag>42 items</BulkSelectTag>
    <TrendingTag>Trending</TrendingTag>
    <WebOnlyTag />
    <HighlightsTag count={3} />
  </div>
)

// export const normal = () => (
//   <div className={marksGrid}>
//     <Tag>Technology</Tag>
//     <Tag close={true}>Politics</Tag>
//     <Tag close={true} selected={true}>
//       Sportsball
//     </Tag>
//     <SuggestedTag>Entertainment</SuggestedTag>
//     <TrendingTag>Trending</TrendingTag>
//     <BestOfTag>Best Of</BestOfTag>
//     <Favorite />
//     <HighlightsTag count={3} />
//   </div>
// )
