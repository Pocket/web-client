import { accountActions } from './account'
import { collectionsActions } from './collections'
import { discoverActions } from './discover'
import { globalNavActions } from './global-nav'
import { homeActions } from './home'
import { getStartedActions } from './get-started'
import { listenActions } from './listen'
import { marketingActions } from './marketing'
import { modalActions } from './modals'
import { savesActions } from './saves'
import { onboardingActions } from './onboarding'
import { pocketHitsActions } from './pocket-hits'
import { profileActions } from './profile'
import { readerActions } from './reader'
import { shortcutActions } from './shortcuts'
import { sideNavActions } from './side-nav'
import { syndicatedArticleActions } from './syndicated-article'
import { topicActions } from './topic'

export const analyticsActions = {
  ...accountActions,
  ...collectionsActions,
  ...discoverActions,
  ...globalNavActions,
  ...homeActions,
  ...getStartedActions,
  ...listenActions,
  ...marketingActions,
  ...modalActions,
  ...savesActions,
  ...onboardingActions,
  ...pocketHitsActions,
  ...profileActions,
  ...shortcutActions,
  ...readerActions,
  ...sideNavActions,
  ...syndicatedArticleActions,
  ...topicActions
}
