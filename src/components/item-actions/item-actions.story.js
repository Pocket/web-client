import { ItemActions } from 'components/item-actions/inline'
import { IosShareIcon } from 'components/icons/IosShareIcon'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { ArchiveIcon } from 'components/icons/ArchiveIcon'
import { FavoriteIcon } from 'components/icons/FavoriteIcon'
import { TagIcon } from 'components/icons/TagIcon'
import { ReportIcon } from 'components/icons/ReportIcon'
import { RefreshIcon } from 'components/icons/RefreshIcon'
import { itemActionStyle } from 'components/item-actions/base'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { OverflowAction } from 'components/item-actions/overflow'
import { ShowSimilar } from 'components/item-actions/show-similar'

const noop = function () {
  /** noop */
}
export const Saves = ({ id }) => (
  <ItemActions
    menuItems={[
      { key: `archive-${id}`, label: 'Archive', icon: <ArchiveIcon />, onClick: noop },
      {
        key: `favorite-${id}`,
        label: 'Favorite',
        icon: <FavoriteIcon />,
        onClick: noop
      },
      {
        key: `tag-${id}`,
        label: 'Tag',
        icon: <TagIcon />,
        onClick: noop
      },
      {
        key: `share-${id}`,
        label: 'Share',
        icon: <IosShareIcon />,
        onClick: noop
      },
      {
        key: `delete-${id}`,
        label: 'Delete',
        icon: <DeleteIcon />,
        onClick: noop
      },
      {
        key: `refresh-${id}`,
        label: 'Refresh',
        icon: <RefreshIcon />,
        onClick: noop
      }
    ]}
  />
)

export const Recommendation = ({ id = 1 }) => {
  return (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={''}
        onOpen={noop}
        openExternal={noop}
        saveAction={noop}
        isAuthenticated={true}
        saveStatus={false}
        id={id}
      />

      <OverflowAction
        menuItems={[
          {
            label: 'Report',
            actionText: 'Report',
            icon: <ReportIcon />,
            onClick: noop
          }
        ]}
      />
    </div>
  )
}

export const Home = ({ id = 1 }) => {
  return (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={''}
        onOpen={noop}
        openExternal={noop}
        saveAction={noop}
        isAuthenticated={true}
        saveStatus="unsaved"
        id={id}
      />
    </div>
  )
}

export const Similar = () => {
  return (
    <div className={`${itemActionStyle} actions`}>
      <ShowSimilar similarAction={noop} />
    </div>
  )
}

export default {
  title: 'Card/Card Actions',
  component: ItemActions,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    )
  ]
}
