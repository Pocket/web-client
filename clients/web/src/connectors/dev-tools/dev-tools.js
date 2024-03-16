import { useEffect } from 'react'
import { QaModal } from 'connectors/dev-tools/qa-modal'
import { BrazeModal } from 'connectors/dev-tools/braze-modal'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { featuresAssign } from 'connectors/feature-flags/feature-flags.state'
import { parseCookies, destroyCookie } from 'nookies'
import queryString from 'query-string'

export function DevTools() {
  const router = useRouter()
  const dispatch = useDispatch()
  const flagsReady = useSelector((state) => state.features.flagsReady)
  const { query, isReady, replace, route } = router

  // Set up passed in assignments
  useEffect(() => {
    if (!isReady || !flagsReady) return () => {}

    if (!query['assign']) return () => {}
    const assignments = Array.isArray(query['assign']) ? query['assign'] : [query['assign']]

    const isSticky = query['sticky'] === 'true'
    dispatch(featuresAssign(assignments, isSticky))
  }, [query, isReady, dispatch, flagsReady])

  useEffect(() => {
    // We don't want to do this if we are explicitly setting a test
    if (query['assign']) return () => {}
    const { query_assignments } = parseCookies()

    // No cookies? No problem, we good.
    if (!query_assignments) return () => {}

    // Get the assignments from the cookies
    const assignments = JSON.parse(query_assignments)
    const assign = Object.keys(assignments)

    // Build a url with the assignments and replace our current url (which triggers the above effect)
    const urlWithAssign = queryString.stringifyUrl({ url: route, query: { ...query, assign } })
    replace(urlWithAssign)

    // Destroy the cookies!  We could eventually make things even more persistant but
    // that can be a project for another day
    destroyCookie(null, 'query_assignments')
  }, [query, route, replace, isReady, dispatch, flagsReady])
  return (
    <>
      <QaModal />
      <BrazeModal />
    </>
  )
}
