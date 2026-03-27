import Reader from 'containers/read/reader'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON, LOCALE_READER } from 'common/constants'
import { getReaderItemMeta } from 'containers/read/reader.state'
import { hydrateItems } from 'connectors/items/items-display.state'
import { hydrateIdMap } from 'containers/read/idMap.state'
import { wrapper } from 'store'

// Types
import type { LocalizedProps } from '@common/types'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps<LocalizedProps> = wrapper.getServerSideProps(
  (store) =>
    async ({ locale = 'en', query }) => {
      const { dispatch } = store
      const { slug } = query
      const defaultProps = {
        ...(await serverSideTranslations(locale, [...LOCALE_COMMON, ...LOCALE_READER])),
        locale
      }

      if (slug === 'null') return { props: defaultProps }

      const { shareItem, itemsById } = await getReaderItemMeta(slug)
      const hasItems = itemsById ? Object.values(itemsById).length : false

      if (hasItems) {
        const idKey = shareItem?.preview?.item?.itemId
        dispatch(hydrateItems(itemsById))
        dispatch(hydrateIdMap(idKey, slug))
      }

      return { props: defaultProps }
    }
)

export default Reader
