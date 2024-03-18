import { EmptySaves } from './saves'
import { EmptyFavorites } from './favorites'
import { EmptyHighlights } from './highlights'
import { EmptyVideos } from './videos'
import { EmptyArticles } from './articles'
import { EmptyArchive } from './archive'
import { EmptySearch } from './search'

export const EmptyFilters = ({ subset }) => {
  const EmptyComponent = {
    unread: <EmptySaves />,
    favorites: <EmptyFavorites />,
    highlights: <EmptyHighlights />,
    videos: <EmptyVideos />,
    articles: <EmptyArticles />,
    archive: <EmptyArchive />,
    search: <EmptySearch />
  }

  return EmptyComponent[subset] || <EmptySaves />
}
