import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { openWindow } from 'common/utilities/open-window/open-window'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { localStore } from 'common/utilities/browser-storage/browser-storage'
import { CACHE_KEY_MASTODON_INSTANCE } from 'common/constants'
import { isValidUrl } from 'common/utilities/urls/urls'

export const localStoreWrapper = css`
  margin-top: 8px;
`

const customInstanceList = [
  { label: 'Mozilla.Social', link: 'mozilla.social' },
  { label: 'Mastodon.Social', link: 'mastodon.social' },
  { label: 'Mastodon.Online', link: 'mastodon.online' },
  { label: 'Mstdn.Social', link: 'mstdn.social' },
  { label: 'fosstodon.org', link: 'fosstodon.org' }
]

function addhttp(url) {
  const hasProtocol = /^(?:f|ht)tps?\:\/\//.test(url)
  return hasProtocol ? url : 'https://' + url
}

export const ShareToMastodon = ({
  url,
  showModal = false,
  cancelShare = () => {},
  shareAction = () => {}
}) => {
  const { t } = useTranslation()
  const [instance, setInstance] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  useEffect(() => {
    const storedInstance = localStore.getItem(CACHE_KEY_MASTODON_INSTANCE)
    if (storedInstance) {
      setInstance(storedInstance)
      setCheckbox(true)
    }
  }, [])

  const network = 'mastodon'
  const opts = {
    name: network,
    width: 550,
    height: 400
  }

  const handleInputChange = (e) => setInstance(e.target.value)

  const handleCheckboxClick = (e) => {
    setCheckbox(e.target.checked)
    if (!e.target.checked) localStore.removeItem(CACHE_KEY_MASTODON_INSTANCE)
  }

  const callbackHandler = () => shareAction(instance.trim())

  const clickHandler = (e) => {
    e.preventDefault()
    const trimmedInstance = instance.trim()

    if (!trimmedInstance || !isValidUrl(trimmedInstance)) return

    if (checkbox) localStore.setItem(CACHE_KEY_MASTODON_INSTANCE, trimmedInstance)

    const confirmedUrl = addhttp(trimmedInstance)
    const shareUrl = new URL(`${confirmedUrl}/share`)
    shareUrl.search = new URLSearchParams({ text: url })

    openWindow(shareUrl, opts, callbackHandler)
    cancelShare()
  }

  return (
    <Modal
      title={t('share:share-mastodon', 'Share to Mastodon')}
      isOpen={showModal}
      screenReaderLabel={t('share:share-mastodon', 'Share to Mastodon')}
      handleClose={cancelShare}>
      <ModalBody>
        <label htmlFor="instance">What instance would you like to share this to?</label>
        <input
          type="url"
          name="instance"
          id="instance"
          placeholder="mozilla.social"
          onChange={handleInputChange}
          value={instance}
          size="30"
          required
          list="defaultInstances"
          autoFocus
        />
        <datalist id="defaultInstances">
          {customInstanceList.map((i) => (
            <option key={i.link} value={i.link} label={i.label} />
          ))}
        </datalist>
        <div className={localStoreWrapper}>
          <input
            type="checkbox"
            id="save"
            name="save"
            onChange={handleCheckboxClick}
            checked={checkbox}
          />
          <label htmlFor="save">Remember my instance</label>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="primary"
          disabled={!isValidUrl(instance.trim())}
          type="submit"
          data-cy="share-mastodon-confirm"
          onClick={clickHandler}>
          Confirm
        </button>
      </ModalFooter>
    </Modal>
  )
}
