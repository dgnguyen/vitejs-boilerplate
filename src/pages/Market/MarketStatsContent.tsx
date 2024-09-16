import { Box, Divider, Tooltip, Typography } from '@mui/material'

import Loader from 'components/Commons/Loader'
import { addCurrencyToPrice } from 'helpers/currency'
import { DataMarketStat } from 'hooks/useMarketStats'

import { marketNames } from './helpers'

import './style.scss'

type Props = {
  loading: boolean
  data?: DataMarketStat
  error?: string
}

const MarketStatisticContent = ({ error, loading, data }: Props) => {
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
          RoundID :
        </Typography>
        <Typography variant='h6'> {data?.roundId}</Typography>
        <Box
          sx={{ borderRight: '3px solid lightgray' }}
          height='20px'
          marginX={1}
        />
        <Typography
          variant='h6'
          sx={{ color: 'var(--blue-primary)' }}
        >
          Total :
        </Typography>
        <Typography variant='h6'> {addCurrencyToPrice(data?.total)}</Typography>
      </Box>
      <Divider sx={{ borderColor: 'white', borderWidth: 1, marginY: 2 }} />
      <Box className='marketCard'>
        {data?.allMarkets?.map((item) => {
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
                    color: 'var(--blue-primary)',
                  }}
                  fontWeight='bold'
                  fontSize={20}
                >
                  {addCurrencyToPrice(item?.total)}
                </Typography>
              </Box>
              <Divider />
              <Box className='marketStat-content-wrapper'>
                {item.events.map((eventMarket) => {
                  return (
                    <Box
                      key={`game-${item.marketName}-${eventMarket.eventName}`}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'nowrap',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          sx={{
                            color: 'var(--blue-primary)',
                          }}
                        >
                          {marketNames[
                            eventMarket.eventName as keyof typeof marketNames
                          ] || eventMarket.eventName}
                        </Typography>
                        <Box sx={{ marginLeft: 1 }}>
                          {eventMarket.maxRate ? (
                            <span className='ticket_point_bracket'>
                              {`(${eventMarket.minRate} - ${eventMarket.maxRate})`}
                            </span>
                          ) : (
                            <span className='ticket_point_bracket'>
                              {eventMarket.minRate
                                ? `(${eventMarket.minRate})`
                                : ''}
                            </span>
                          )}
                        </Box>
                      </Box>
                      <Box>
                        <Tooltip
                          className='totalByEventName'
                          title={addCurrencyToPrice(eventMarket.total)}
                        >
                          <Box
                            sx={{
                              color:
                                eventMarket.total > 0
                                  ? 'var(--red)'
                                  : 'default',
                            }}
                          >
                            {addCurrencyToPrice(eventMarket.total)}
                          </Box>
                        </Tooltip>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default MarketStatisticContent
