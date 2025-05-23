import { SUPPORTED_LOCALES } from '@common/constants'
import { DEFAULT_LOCALE, DEFAULT_NS } from './constants'

const allNamespaces = [
  // You must list out all the namespaces here so that the translation engine loads them all
  'account',
  'ad',
  'annotations',
  'call-out',
  'collections',
  'common',
  'confirm',
  'discover',
  'empty',
  'error',
  'feedback',
  'fxa',
  'global-footer',
  'headers',
  'home',
  'item-action',
  'item',
  'learn-more',
  'list',
  'messages',
  'nav',
  'partner',
  'reader',
  'release',
  'search',
  'settings',
  'share',
  'shared-item',
  'shortcuts',
  'tags',
  'toast',
  'topic',
  'whats-new'
]

/**
 *
 */
export function getOptions(lng = DEFAULT_LOCALE, namespaces = allNamespaces) {
  return {
    // debug: true,
    supportedLngs: SUPPORTED_LOCALES,
    fallbackLng: DEFAULT_LOCALE,
    lng,
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    ns: namespaces
  }
}
