import React, { useEffect } from 'react'
import { Modal, ModalBody } from 'components/modal/modal'

import Mousetrap from 'mousetrap'
import { useSelector, useDispatch } from 'react-redux'
import { devModeToggle } from 'connectors/app/app.state'
import { Features } from 'connectors/dev-tools/features'
// import { Links } from 'connectors/dev-tools/links'
import { Resets } from 'connectors/dev-tools/resets'
import { Toasts } from 'connectors/dev-tools/toasts'

import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { PremiumToggle } from './premium-toggle'

export function QaModal() {
  const dispatch = useDispatch()
  const isDevBuild = process.env.SHOW_DEV === 'included'

  const featureState = useSelector((state) => state.features)
  const labUser = featureFlagActive({ flag: 'lab', featureState })
  const showDevTools = labUser || isDevBuild

  const devMode = useSelector((state) => state.app.devMode)

  const toggleDevMode = () => dispatch(devModeToggle())

  useEffect(() => {
    Mousetrap.bind('q a', toggleDevMode) // Enter dev mode
    return () => Mousetrap.unbind('q a') // Clean up
  }, []) //eslint-disable-line

  const appRootSelector = '#__next'
  const showModal = showDevTools && devMode

  return (
    <Modal
      title="QA Tools"
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel="QA Tools"
      handleClose={toggleDevMode}>
      <ModalBody>
        <PremiumToggle />
        <Features />
        <Resets />
        {/* <Links toggleDevMode={toggleDevMode} /> */}
        <Toasts />
      </ModalBody>
    </Modal>
  )
}
