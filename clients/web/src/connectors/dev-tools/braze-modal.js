import React, { useEffect, useState } from 'react'
import { Modal, ModalBody } from 'components/modal/modal'

import Mousetrap from 'mousetrap'
import { useSelector } from 'react-redux'
import { BrazeTools } from 'connectors/dev-tools/braze'

import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export function BrazeModal() {
  const isDevBuild = process.env.SHOW_DEV === 'included'
  const [modalOpen, setModalOpen] = useState(false)

  const featureState = useSelector((state) => state.features)
  const brazeUser = featureFlagActive({ flag: 'lab.braze', featureState })
  const showDevTools = brazeUser || isDevBuild

  const toggleBrazeModal = () => setModalOpen(!modalOpen)

  useEffect(() => {
    Mousetrap.bind('b+r', toggleBrazeModal) // Enter dev mode
    return () => Mousetrap.unbind('b+r') // Clean up
  }, []) //eslint-disable-line

  const appRootSelector = '#__next'
  const showModal = showDevTools && modalOpen

  return (
    <Modal
      title="Braze Tools"
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel="Braze Tools"
      handleClose={toggleBrazeModal}>
      <ModalBody>
        <BrazeTools />
      </ModalBody>
    </Modal>
  )
}
