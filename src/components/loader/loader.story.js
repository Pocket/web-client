import { Loader, LoaderCentered, LoadMore } from './loader'

export default {
  title: 'Components/Loader'
}

export const loader = () => <Loader isVisible />

export const loaderCentered = () => (
  <LoaderCentered>
    <Loader isVisible />
  </LoaderCentered>
)

// This was a much more complicated example involving
// list items and such. In other words, make me more
// complex once you get list stuffs
export const loadMore = () => (
  <LoadMore>
    <Loader isVisible />
  </LoadMore>
)
