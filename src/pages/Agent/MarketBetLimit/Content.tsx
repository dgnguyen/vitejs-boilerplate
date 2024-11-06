import { Box, Divider, Typography } from '@mui/material'

import Loader from 'components/Commons/Loader'
import { thousandSeparator } from 'helpers/currency'
import { DataMarketBetLimit } from 'hooks/useMarketBetLimit'

import { marketNames } from '../../Agent/helpers'

import { headerMarketBetLimit } from './helpers'

import '../style.scss'

type Props = {
  loading: boolean
  data?: DataMarketBetLimit
  error?: string
}

const MarketBetLimitContent = ({ error, loading, data }: Props) => {
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
              </Box>
              <Divider />
              <Box className='marketBetLimit-content-wrapper'>
                <Box className="header">
                  {
                    headerMarketBetLimit.map((header, index) => (
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
                          {thousandSeparator(eventMarket.minBet)}
                        </Typography>
                        <Typography>
                          {thousandSeparator(eventMarket.maxBet)}
                        </Typography>
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

export default MarketBetLimitContent