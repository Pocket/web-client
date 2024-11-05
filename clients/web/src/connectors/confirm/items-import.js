import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { itemsImportConfirm } from 'connectors/items/mutation-import.state'
import { itemsImportCancel } from 'connectors/items/mutation-import.state'
import { css } from '@emotion/css'

// import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { useTranslation } from 'next-i18next'
import { ImportIcon } from '@ui/icons/ImportIcon'
import { useRef, useState, useEffect } from 'react'
import { ProgressPill } from 'components/progress-pill/progress-pill'

const importBody = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1.5rem;
`

const importFooter = css`
  justify-content: space-between;
  align-items: center;
  flex-flow: row-reverse;
  .error {
    font-style: italic;
    color: var(--color-error);
  }
`

const importProgress = css`
  width: 100%;
`

export const ConfirmItemsImport = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const fileSelectorRef = useRef(null)
  const [fileList, setFileList] = useState(null)

  const showModal = useSelector((state) => state.mutationImport.showModal)
  const importError = useSelector((state) => state.mutationImport.err)
  const processing = useSelector((state) => state.mutationImport.processing)
  const success = useSelector((state) => state.mutationImport.success)

  const confirmImport = () => {
    // dispatch(sendSnowplowEvent('items-import.confirm'))
    dispatch(itemsImportConfirm(fileList))
  }
  const cancelImport = () => {
    // dispatch(sendSnowplowEvent('items-import.cancel'))
    setFileList(null)
    dispatch(itemsImportCancel())
  }

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      // We have files, let's set the fileList appropriately
      setFileList(Array.from(e.target.files)[0])
    } else {
      // No files, no ticket, no riding on the Zeppelin!!
      setFileList(null)
    }
  }

  return (
    <Modal
      title={t('item:import-items', 'Import items from Omnivore')}
      isOpen={showModal}
      screenReaderLabel={t('item:import-items', 'Import items from Omnivore')}
      handleClose={cancelImport}>
      <ModalBody>
        <div className={importBody}>
          <img
            src="https://avatars.githubusercontent.com/u/70113176?s=400&u=506b21d9f019f3160963c010ef363667fb24c7c9&v=4"
            height="100"
            alt=""
          />
          {success ? <ImportSuccess /> : null}
          {processing ? <ImportProcessing /> : null}
          {!success && !processing ? (
            <div>
              <label htmlFor="fileSelector">
                {t(
                  'items:select-a-file-to-import',
                  'Select an exported Omnivore zip file to import'
                )}
              </label>
              <input
                ref={fileSelectorRef}
                id="fileSelector"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          ) : null}
        </div>
      </ModalBody>
      <ModalFooter className={importFooter}>
        {success ? (
          <button
            type="submit"
            className="primary"
            data-testid="import-close"
            onClick={cancelImport}>
            {t('items:import-continue', 'Continue')}
          </button>
        ) : (
          <button
            type="submit"
            className="primary"
            data-testid="import-confirm"
            onClick={confirmImport}
            disabled={!fileList || processing}
            autoFocus={true}>
            <ImportIcon /> {t('items:import', 'Import')}
          </button>
        )}
        {importError ? <div className="error">{importError}</div> : null}
      </ModalFooter>
    </Modal>
  )
}

function ImportSuccess() {
  const { t } = useTranslation()
  return (
    <div>
      {t('items:file-import-success', 'Your file has been accepted and will be processed shortly.')}
    </div>
  )
}

function ImportProcessing() {
  const { t } = useTranslation()
  const [tick, setTick] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      if (tick > 99) return
      setTick(tick * 1.5)
    }, 10)

    return () => clearInterval(interval)
  }, [tick])

  return (
    <div className={importProgress}>
      {t('items:file-import-processing', 'Uploading your file...')}
      <ProgressPill total={100} current={tick} />
    </div>
  )
}
