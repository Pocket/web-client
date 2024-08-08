import { accountActions } from './account'
import { collectionsActions } from './collections'
import { discoverActions } from './discover'
import { globalNavActions } from './global-nav'
import { homeActions } from './home'
import { getStartedActions } from './get-started'
import { listenActions } from './listen'
import { modalActions } from './modals'
import { savesActions } from './saves'
import { pocketHitsActions } from './pocket-hits'
import { readerActions } from './reader'
import { shortcutActions } from './shortcuts'
import { sideNavActions } from './side-nav'
import { syndicatedArticleActions } from './syndicated-article'
import { topicActions } from './topic'
import { marketingActions } from './marketing'
import { shareableListActions } from './shareable-lists'
import { learnMoreActions } from './learn-more'
import { searchActions } from './search'

export const analyticsActions = {
  ...accountActions,
  ...collectionsActions,
  ...discoverActions,
  ...globalNavActions,
  ...homeActions,
  ...getStartedActions,
  ...listenActions,
  ...modalActions,
  ...savesActions,
  ...pocketHitsActions,
  ...shortcutActions,
  ...readerActions,
  ...sideNavActions,
  ...syndicatedArticleActions,
  ...topicActions,
  ...marketingActions,
  ...shareableListActions,
  ...learnMoreActions,
  ...searchActions
}
