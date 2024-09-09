
import { Box, Divider, Tooltip, Typography } from '@mui/material'
import Card from 'components/Card'
import Loader from 'components/Commons/Loader'
import { marketNames } from './helpers'
import { addCurrencyToPrice } from 'helpers/currency'


import './style.scss'
import { DataMarketStat } from 'hooks/useMarketStats'

type Props = {
  loading: boolean
  data?: DataMarketStat
  error?: string
}

const MarketStatisticContent = ({ error, loading, data }: Props) => {

  if (error) return <Typography color="error">{error}</Typography>
  if (loading) return <Loader isOutSideOfRelativeContainer />

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          gap: '2px'
        }}
      >
        <Typography variant="h6" sx={{ color: 'var(--blue-primary)' }}>
          RoundID :
        </Typography>
        <Typography variant="h6"> {data?.roundId}</Typography>
        <Box
          sx={{ borderRight: '3px solid lightgray' }}
          height="20px"
          marginX={1}
        />
        <Typography variant="h6" sx={{ color: 'var(--blue-primary)' }}>
          Total :
        </Typography>
        <Typography variant="h6">
          {' '}
          {addCurrencyToPrice(data?.total)}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'white', borderWidth: 1, marginY: 2 }} />
      <Card className="marketCard">
        <Box>
          {data?.allMarkets?.map(item => {
            return (
              <Box
                key={`game-${item.marketName}`}
                sx={{ paddingY: 2, borderBottom: '1px solid var(--color-grey)' }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    className="market_section_title"
                    textTransform="capitalize"
                    fontSize={24}
                    lineHeight="38px"
                    fontWeight="bold"
                  >
                    {item.marketName}
                  </Typography>
                  <Typography fontWeight="bold" fontSize={20}>
                    Total: {addCurrencyToPrice(item?.total)}
                  </Typography>
                </Box>
                <Box
                  className="marketStat-content-wrapper"
                >
                  {item.events.map(eventMarket => {
                    return (
                      <Box
                        key={`game-${item.marketName}-${eventMarket.eventName}`}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexWrap: 'nowrap'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            sx={{
                              color: '#4E23AD'
                            }}
                          >
                            {marketNames[
                              eventMarket.eventName as keyof typeof marketNames
                            ] || eventMarket.eventName}
                          </Typography>
                          <Box sx={{ marginLeft: 1 }}>
                            {eventMarket.maxRate ? (
                              <span className="ticket_point_bracket">
                                {`(${eventMarket.minRate} - ${eventMarket.maxRate})`}
                              </span>
                            ) : (
                              <span className="ticket_point_bracket">
                                {eventMarket.minRate
                                  ? `(${eventMarket.minRate})`
                                  : ''}
                              </span>
                            )}
                          </Box>
                        </Box>
                        <Box>
                          <Tooltip
                            className="totalByEventName"
                            title={addCurrencyToPrice(eventMarket.total)}
                          >
                            <Box
                              sx={{
                                color:
                                  eventMarket.total > 0
                                    ? 'var(--red)'
                                    : 'default'
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
      </Card>
    </Box>
  )
}

export default MarketStatisticContent
