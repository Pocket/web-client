import { useEffect } from 'react'
import { ConnectedApp } from 'components/account/connections/connected-app'
import { PocketApps } from 'components/account/connections/pocket-apps'
import { Services } from 'components/account/connections/services'
import { ThirdParty } from 'components/account/connections/third-party-apps'
import { useSelector, useDispatch } from 'react-redux'

import { SaveIcon } from '@ui/icons/SaveIcon'
import { GoogleColorIcon } from '@ui/icons/GoogleColorIcon'
import { TwitterColorIcon } from '@ui/icons/TwitterColorIcon'
import { FacebookColorIcon } from '@ui/icons/FacebookColorIcon'

import { getConnections } from 'containers/account/connections/connections.state'
import { revokeConnection } from 'containers/account/connections/connections.state'

export const ConnectedServices = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getConnections())
  }, [dispatch])

  const officialApps = useSelector((state) => state?.userConnectedServices?.officialApps)
  const socialServices = useSelector((state) => state?.userConnectedServices?.socialServices) || []
  const googleServices = useSelector((state) => state?.userConnectedServices?.googleServices) || []
  const thirdParty = useSelector((state) => state?.userConnectedServices?.thirdPartyApps)

  return (
    <>
      <Services
        appIds={[...socialServices, ...googleServices]}
        ConnectedApp={ConnectedAppComponent}
      />

      <PocketApps appIds={officialApps} ConnectedApp={ConnectedAppComponent} />

      <ThirdParty appIds={thirdParty} ConnectedApp={ConnectedAppComponent} />
    </>
  )
}

const ConnectedAppComponent = ({ appId }) => {
  const dispatch = useDispatch()

  const servicesById = useSelector((state) => state?.userConnectedServices?.servicesById)
  const service = servicesById[appId]

  if (!service) return null

  const { api_id, name, platform_id, slug, is_native, google_id, social_service_id } = service

  const isPocketApp = is_native && is_native !== '0'
  const isGoogle = !!google_id
  const passedName = isGoogle ? 'Google' : name

  const FallbackImage = getFallbackImage(isGoogle, isPocketApp, name)

  const onRevoke = () => {
    // Remove google
    if (isGoogle) {
      return dispatch(revokeConnection('at', 'googleServices')) // this wants an access token
    }

    // Removing a social services
    if (name === 'Twitter' || name === 'Facebook') {
      return dispatch(revokeConnection(social_service_id, 'socialServices'))
    }

    // Remove Official Pocket app
    if (isPocketApp) {
      return dispatch(revokeConnection(slug, 'officialApps'))
    }

    // Default to removing a slug
    return dispatch(revokeConnection(slug, 'thirdPartyApps'))
  }

  return (
    <ConnectedApp
      api_id={api_id}
      name={passedName}
      onRevoke={onRevoke}
      platform_id={platform_id}
      slug={slug}
      FallbackImage={FallbackImage}
    />
  )
}

const getFallbackImage = function (isGoogle, isPocketApp, name) {
  if (isPocketApp) return SaveIcon
  if (isGoogle) return GoogleColorIcon
  if (name === 'Twitter') return TwitterColorIcon
  if (name === 'Facebook') return FacebookColorIcon

  return false
}
