import { Box, Divider } from '@mui/material'

import Card from 'components/Card'
import { thousandSeparator } from 'helpers/currency'
import { IDashboardData } from 'redux/reducers/dashboard'
import { CURRENCY } from 'types/currency'

const DashboardContentByCurrency = ({ data, currency }: { currency: string, data: IDashboardData | null }) => {
  const displayCurrency = currency === 'all' ? CURRENCY.KRW : currency
  return (
    <Box>
      <Box className='card_wrap_dashboard'>
        <Card
          // className={'d-flex flex-column'}
          title={'Bet Amount'}
          price={thousandSeparator(data?.totalBetAmount)}
          currency={displayCurrency}
          icon='dollarSvgGreen'
        />
        <Card
          // className={'d-flex flex-column'}
          title={'Win Amount'}
          price={thousandSeparator(data?.totalWinAmount)}
          currency={displayCurrency}
          icon={
            !data?.playerNumber
              ? ''
              : data.totalBetAmount - data.totalWinAmount
                ? 'dollarSvgRed'
                : 'dollarSvgGreen'
          }
        />
        <Card
          // className={'d-flex flex-column'}
          title={'GGR'}
          price={thousandSeparator(data?.grossRevenue)}
          currency={displayCurrency}
          icon={
            !data?.playerNumber
              ? ''
              : data.grossRevenue > 0
                ? 'upArrowSvg'
                : 'downArrowSvg'
          }
        />
        <Card
          // className={'d-flex flex-column'}
          title='GGR in %'
          price={`${data?.profitPercentage}%`}
          icon={
            !data?.playerNumber
              ? ''
              : data.profitPercentage > 0
                ? 'upArrowSvg'
                : 'downArrowSvg'
          }
        />
      </Box>

      <Divider sx={{ marginY: 6 }} />

      <Box className={'main_statistics_data'}>
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
          currency={displayCurrency}
        />
        <Card
          // className={'d-flex flex-column'}
          title={'Number of Players'}
          price={data?.playerNumber}
        />
      </Box>
    </Box>
  )
}

export default DashboardContentByCurrency
