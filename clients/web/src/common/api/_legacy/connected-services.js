import { request } from 'common/utilities/request/request'

export const revokeConnectedServices = (data) => {
  return request({
    method: 'POST',
    path: 'v3/setConnectedServices',
    body: JSON.stringify({ ...data }),
    auth: true
  })
}

export const getConnectedServices = () => {
  return request({
    method: 'POST',
    path: 'v3/getConnectedServices',
    auth: true
  })
    .then(processServices)
    .catch((error) => console.error(error))
}

function processServices(response) {
  const { status, error, official_apps, apps, socialServices, googleServices } = response

  const socialServicesMeta = {
    62: {
      name: 'Twitter'
    },
    60: {
      name: 'Facebook'
    }
  }

  const socialServicesWithMeta = Object.keys(socialServices).reduce(
    (previousValue, currentValue) => {
      return {
        [currentValue]: { ...socialServices[currentValue], ...socialServicesMeta[currentValue] }
      }
    },
    {}
  )

  return {
    status,
    error,
    officialApps: Object.keys(official_apps),
    thirdPartyApps: Object.keys(apps),
    socialServices: Object.keys(socialServices),
    googleServices: Object.keys(googleServices),
    servicesById: { ...official_apps, ...apps, ...socialServicesWithMeta, ...googleServices }
  }
}
