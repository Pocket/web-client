import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { openWindow } from 'common/utilities/open-window/open-window'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { isValidHttpUrl } from 'common/utilities/urls/urls'
import { localStore } from 'common/utilities/browser-storage/browser-storage'
import { CACHE_KEY_MASTODON_INSTANCE } from 'common/constants'

export const localStoreWrapper = css`
  margin-top: 8px;
`

const customInstanceList = [
  { label: 'Mozilla.Social', link: 'https://mozilla.social' },
  { label: 'Mastodon.Social', link: 'https://mastodon.social' },
  { label: 'Mastodon.Online', link: 'https://mastodon.online' },
  { label: 'Mstdn.Social', link: 'https://mstdn.social' },
  { label: 'fosstodon.org', link: 'https://fosstodon.org' }
]

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

  const handleCheckboxClick = (e) => setCheckbox(e.target.checked)

  const callbackHandler = () => shareAction(network)

  const clickHandler = (e) => {
    e.preventDefault()
    const trimmedInstance = instance.trim()

    if (!trimmedInstance || !isValidHttpUrl(trimmedInstance)) return

    if (checkbox) {
      localStore.setItem(CACHE_KEY_MASTODON_INSTANCE, trimmedInstance)
    } else {
      localStore.removeItem(CACHE_KEY_MASTODON_INSTANCE)
    }

    const shareUrl = new URL(`${trimmedInstance}/share`)
    shareUrl.search = new URLSearchParams({ text: url })
    openWindow(shareUrl.href, opts, callbackHandler)
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
          placeholder="https://example.org"
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
          disabled={!isValidHttpUrl(instance.trim())}
          type="submit"
          data-cy="share-mastodon-confirm"
          onClick={clickHandler}>
          Confirm
        </button>
      </ModalFooter>
    </Modal>
  )
}
