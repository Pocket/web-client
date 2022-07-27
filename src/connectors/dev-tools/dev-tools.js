import { useEffect } from 'react'
import { QaModal } from 'connectors/dev-tools/qa-modal'
import { BrazeModal } from 'connectors/dev-tools/braze-modal'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { featuresAssign } from 'connectors/feature-flags/feature-flags.state'

export function DevTools() {
  const router = useRouter()
  const dispatch = useDispatch()
  const flagsReady = useSelector((state) => state.features.flagsReady)

  const { query, isReady } = router

  useEffect(() => {
    if (!isReady || !flagsReady) return

    const assignments = Array.isArray(query['assign']) ? query['assign'] : [query['assign']]
    if (!assignments.length) return

    for (const flag of assignments) {
      dispatch(featuresAssign(flag))
    }
  }, [query, isReady, dispatch, flagsReady])

  return (
    <>
      <QaModal />
      <BrazeModal />
    </>
  )
}
