import { Box, Divider } from '@mui/material'

import Card from 'components/Card'
import { thousandSeparator } from 'helpers/currency'
import { IDashboardData } from 'redux/reducers/dashboard'

const DashboardContentByCurrency = ({ data, currency }: { currency: string, data: IDashboardData | null }) => {

  return (
    <Box>
      <Box className='card_wrap_dashboard'>
        <Card
          // className={'d-flex flex-column'}
          title={'Bet Amount'}
          price={thousandSeparator(data?.totalBetAmount)}
          currency={currency}
          icon='dollarSvgGreen'
        />
        <Card
          // className={'d-flex flex-column'}
          title={'Win Amount'}
          price={thousandSeparator(data?.totalWinAmount)}
          currency={currency}
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
          currency={currency}
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
          currency={currency}
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
