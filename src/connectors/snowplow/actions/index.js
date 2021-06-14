import { collectionsActions } from './collections'
import { discoverActions } from './discover'
import { globalNavActions } from './global-nav'
import { homeActions } from './home'
import { modalActions } from './modals'
import { myListActions } from './my-list'
import { profileActions } from './profile'
import { readerActions } from './reader'
import { sideNavActions } from './side-nav'
import { syndicatedArticleActions } from './syndicated-article'

export const analyticsActions = {
  ...collectionsActions,
  ...discoverActions,
  ...globalNavActions,
  ...homeActions,
  ...modalActions,
  ...myListActions,
  ...profileActions,
  ...readerActions,
  ...sideNavActions,
  ...syndicatedArticleActions
}
