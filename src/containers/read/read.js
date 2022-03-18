import { useSelector } from 'react-redux'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import LegacyReader from './legacy-reader'
import Reader from './reader'

export const COLUMN_WIDTH_RANGE = [531, 574, 632, 718, 826, 933, 1041]
export const LINE_HEIGHT_RANGE = [1.2, 1.3, 1.4, 1.5, 1.65, 1.9, 2.5]
export const FONT_RANGE = [16, 19, 22, 25, 28, 32, 37]

export default function Read() {
  const flagsReady = useSelector((state) => state.features.flagsReady)
  const featureState = useSelector((state) => state.features)
  const useClientAPI = flagsReady && featureFlagActive({ flag: 'reader.client-api', featureState })
  const ContentToRender = useClientAPI ? Reader : LegacyReader

  return <ContentToRender />
}
