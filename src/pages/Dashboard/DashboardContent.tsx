import { Box, CircularProgress, Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import { dashboardDataSelector, dashboardErrorSelector, dashboardFilterSelector, dashboardLoadingPageSelector, getDashboardDataAction } from 'redux/reducers/dashboard'

import Card from "components/Card"
import { thousandSeparator } from 'helpers/currency'

import "./style.scss"
import { useAppDispatch } from 'redux/store'
import { useEffect } from 'react'

const DashboardContent = () => {

  const dispatch = useAppDispatch()
  const filterDashboard = useSelector(dashboardFilterSelector)
  const {
    dateRange: {
      startDate,
      endDate,
    },
    isTester,
  } = filterDashboard
  useEffect(() => {
    dispatch(
      getDashboardDataAction(
        new Date(startDate),
        new Date(endDate),
        JSON.parse(isTester),
        filterDashboard?.agentSelected,
      )
    )
  }, [startDate, endDate, filterDashboard?.agentSelected, , isTester, dispatch])

  const loadingPage = useSelector(dashboardLoadingPageSelector)
  const errorMsg = useSelector(dashboardErrorSelector)
  const data = useSelector(dashboardDataSelector)

  if (loadingPage) return <CircularProgress />
  if (errorMsg) return <Box>{errorMsg}</Box>

  return (
    <Box className="dashboard-content-wrapper">
      <Box sx={{
        height: "calc(100% - 240px)",
        overflowY: "auto"
      }}>
        <div className="card_wrap_dashboard">
          <Card
            // className={'d-flex flex-column'}
            title={'Bet Amount'}
            price={thousandSeparator(data?.totalBetAmount)}
            currency={'KRW'}
            icon="dollarSvgGreen"
          />
          <Card
            // className={'d-flex flex-column'}
            title={'Win Amount'}
            price={thousandSeparator(data?.totalWinAmount)}
            currency={'KRW'}
            icon={
              !data?.playerNumber
                ? ''
                : data.totalBetAmount - data.totalWinAmount
                  ? "dollarSvgRed"
                  : "dollarSvgGreen"
            }
          />
          <Card
            // className={'d-flex flex-column'}
            title={'GGR'}
            price={thousandSeparator(data?.grossRevenue)}
            currency={'KRW'}
            icon={
              !data?.playerNumber
                ? ''
                : data.grossRevenue > 0
                  ? "upArrowSvg"
                  : "downArrowSvg"
            }
          />
          <Card
            // className={'d-flex flex-column'}
            title="GGR in %"
            price={`${data?.profitPercentage}%`}
            icon={
              !data?.playerNumber
                ? ''
                : data.profitPercentage > 0
                  ? "upArrowSvg"
                  : "downArrowSvg"
            }
          />
        </div>

        <Divider />

        <div className={'main_statistics_data'}>
          <Card
            // className={'d-flex flex-column'}
            title={'Total Transactions'}
            price={data?.totalTransactions}
          />
          <Card
            // className={'d-flex flex-column'}
            title={'Win Transactions'}
            price={data?.winTransactions}
          />
          <Card
            // className={'d-flex flex-column'}
            title={'Average Bet Amount'}
            price={thousandSeparator(data?.averageBetAmount)}
            currency={'KRW'}
          />
          <Card
            // className={'d-flex flex-column'}
            title={'Number of Players'}
            price={data?.playerNumber}
          />
        </div>
      </Box>
    </Box>
  )
}

export default DashboardContent
