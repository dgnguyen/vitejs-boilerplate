import { Box, Divider, Tooltip, Typography } from '@mui/material'

import Loader from 'components/Commons/Loader'
import { addCurrencyToPrice, thousandSeparator } from 'helpers/currency'
import { DataMarketGGR } from 'hooks/useMarketGGR'

import { marketNames } from '../helpers'

import { headerMarketGGR } from './helpers'

import '../style.scss'

type Props = {
  loading: boolean
  data?: DataMarketGGR
  error?: string
}

const MarketGGRContent = ({ error, loading, data }: Props) => {
  if (error) return <Typography color='error'>{error}</Typography>
  if (loading) return <Loader isOutSideOfRelativeContainer />

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          gap: '2px',
        }}
      >
        <Typography
          variant='h6'
          sx={{ color: 'var(--blue-primary)' }}
        >
          Total :
        </Typography>
        <Typography variant='h6'
          sx={{
            color: data && data?.total >= 0 ? 'var(--blue-primary)' : 'var(--red)',
          }}
          fontWeight="bold"
        > {addCurrencyToPrice(data?.total, data?.currency)}</Typography>
      </Box>
      <Divider sx={{ borderColor: 'white', borderWidth: 1, marginY: 2 }} />
      <Box className='marketCard'>
        {data?.allMarkets.map((item) => {
          return (
            <Box
              key={`game-${item.marketName}`}
              sx={{ paddingY: 2 }}
            >
              <Box
                display='flex'
                justifyContent='space-between'
              >
                <Typography
                  className='market_section_title'
                  textTransform='capitalize'
                  fontSize={20}
                  lineHeight='38px'
                  fontWeight='bold'
                >
                  {item.marketName}
                </Typography>
                <Typography
                  sx={{
                    color: item.total >= 0 ? 'var(--blue-primary)' : 'var(--red)',
                  }}
                  fontWeight='bold'
                  fontSize={20}
                >
                  {addCurrencyToPrice(item.total)}
                </Typography>
              </Box>
              <Divider />
              <Box className='marketGGR-content-wrapper'>
                <Box className="header">
                  {
                    headerMarketGGR.map((header, index) => (
                      (
                        <Box key={`${item.marketName}${header}`}>
                          <Typography>
                            {header}
                          </Typography>
                          {
                            index > 0 &&
                            <Typography>
                              ({data?.currency})
                            </Typography>
                          }
                        </Box>
                      )
                    ))
                  }
                </Box>
                <Box className="content">
                  {item.events.map((eventMarket) => {
                    return (
                      <Box
                        key={`game-${item.marketName}-${eventMarket.eventName}`}

                      >
                        <Typography
                          sx={{
                            color: 'var(--blue-primary)',
                          }}
                        >
                          {marketNames[
                            eventMarket.eventName as keyof typeof marketNames
                          ] || eventMarket.eventName}
                        </Typography>
                        <Typography>
                          {thousandSeparator(eventMarket.totalBet)}
                        </Typography>
                        <Typography>
                          {thousandSeparator(eventMarket.totalWin)}
                        </Typography>
                        <Tooltip
                          className="totalByEventName"
                          title={thousandSeparator(eventMarket.ggr)}
                        >
                          <Box
                            sx={{
                              color:
                                eventMarket.ggr < 0
                                  ? 'var(--red)'
                                  : 'default',
                            }}
                          >
                            {thousandSeparator(eventMarket.ggr)}
                          </Box>
                        </Tooltip>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default MarketGGRContent
