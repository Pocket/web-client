import { useEffect } from 'react'
import { HomeSectionHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { getRecentSaves } from 'containers/home/home.state'
import { RecentCard } from 'connectors/item-card/home/card-recent'
import { OffsetList } from 'components/items-layout/list-offset'

export const HomeRecentSaves = () => {
  const dispatch = useDispatch()
  const recentSaves = useSelector((state) => state.home.recentSaves)

  // Initialize data
  useEffect(() => {
    dispatch(getRecentSaves())
  }, [dispatch])

  return recentSaves?.length > 2 ? (
    <>
      <HomeSectionHeader
        sectionTitle="Recent Saves"
        sectionDescription="What recently captured your interest"
      />

      <OffsetList
        items={recentSaves}
        offset={0}
        count={3}
        ItemCard={RecentCard}
        cardShape="display"
        showExcerpt={false}
        border={false}
        compact={true}
        dataCy="recent-saves"
      />
    </>
  ) : null
}
