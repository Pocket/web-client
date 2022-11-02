import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { clearDeletion } from './read.state'
import LegacyReader from './legacy-reader'
import Reader from './reader'

export const COLUMN_WIDTH_RANGE = [531, 574, 632, 718, 826, 933, 1041]
export const LINE_HEIGHT_RANGE = [1.2, 1.3, 1.4, 1.5, 1.65, 1.9, 2.5]
export const FONT_RANGE = [16, 19, 22, 25, 28, 32, 37]

export default function Read() {
  const router = useRouter()
  const dispatch = useDispatch()

  const deleted = useSelector((state) => state.reader.deleted)
  const flagsReady = useSelector((state) => state.features.flagsReady)
  const featureState = useSelector((state) => state.features)
  const useClientAPI = flagsReady && featureFlagActive({ flag: 'api.next', featureState })
  const ContentToRender = useClientAPI ? Reader : LegacyReader

  useEffect(() => {
    if (deleted) {
      const { getStarted } = router.query
      const path = getStarted ? '/home' : '/saves'
      router.replace(path)
      dispatch(clearDeletion())
    }
  }, [deleted, router, dispatch])

  return flagsReady ? <ContentToRender /> : null
}
