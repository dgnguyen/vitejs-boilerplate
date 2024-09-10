import { Box } from '@mui/material'
import PageTitle from 'components/Commons/PageTitle'
import MarketTab from '../MarketTab'
import DateBlock from 'components/DateBlock'
import { useMarketStats } from 'hooks/useMarketStats'
import MarketFilter from '../MarketFilter'
import MarketSettingsFilter from './MarketSettingsFilter'
import { RootState, useAppDispatch } from 'redux/store'
import { useSelector } from 'react-redux'
import { useGames } from 'context/GamesContext'
import { useEffect, useState } from 'react'
import { getTickets } from 'redux/reducers/market'
import { useFetchAgents } from 'hooks/useFetchAgents'

const MarketSettings = () => {
  const dispatch = useAppDispatch()
  const marketSettingsData = useSelector((state: RootState) => state.market)
  const { loading } = marketSettingsData
  const tickets = marketSettingsData.data



  // useEffect(() => {
  //   if (agents) {
  //     setFilter((prevState: any) => ({
  //       ...prevState,
  //       agent: agents.find(item => !item.isBlock)?.id
  //     }))
  //   }
  // }, [agents])



  return (
    <Box className="market-settings-wrapper">
      <PageTitle title='Market Settings' />
      <MarketTab />
      <MarketSettingsFilter />

    </Box>
  )
}

export default MarketSettings
