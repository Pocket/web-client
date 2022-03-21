import { accountActions } from './account'
import { collectionsActions } from './collections'
import { discoverActions } from './discover'
import { globalNavActions } from './global-nav'
import { homeActions } from './home'
import { modalActions } from './modals'
import { myListActions } from './my-list'
import { onboardingActions } from './onboarding'
import { pocketHitsActions } from './pocket-hits'
import { profileActions } from './profile'
import { readerActions } from './reader'
import { shortcutActions } from './shortcuts'
import { sideNavActions } from './side-nav'
import { syndicatedArticleActions } from './syndicated-article'

export const analyticsActions = {
  ...accountActions,
  ...collectionsActions,
  ...discoverActions,
  ...globalNavActions,
  ...homeActions,
  ...modalActions,
  ...myListActions,
  ...onboardingActions,
  ...pocketHitsActions,
  ...profileActions,
  ...shortcutActions,
  ...readerActions,
  ...sideNavActions,
  ...syndicatedArticleActions
}
