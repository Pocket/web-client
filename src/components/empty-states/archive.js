import TreasureSVG from 'static/images/sunken-treasure-chest.svg'
import { emptyStyles } from './styles'
import { ArchiveIcon } from 'components/icons/ArchiveIcon'
import { useTranslation, Trans } from 'react-i18next'

export const EmptyArchive = () => {
  const { t } = useTranslation()

  return (
    <div className={emptyStyles}>
      <img src={TreasureSVG.src} alt="" />
      <h4>{t('empty:archives-title', 'Keep your Pocket fresh and clean')}</h4>
      <p>
        <Trans i18nKey="empty:archives-sub">
          Archive the saves you’re finished with using the <ArchiveIcon /> icon.
        </Trans>
      </p>
    </div>
  )
}
