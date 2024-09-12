import React, { useMemo } from 'react'

import { emptyMarker, prepareArray } from './helpers'
import Ticket from './Ticket'
import { IMarketData } from 'redux/reducers/market'
import { Box, Divider, Typography } from '@mui/material'

type IProps = {
  ticket: IMarketData[]
  ticketLength: number
}

const TicketList: React.FC<IProps> = ({ ticket, ticketLength }) => {
  const sections = useMemo(() => {
    return prepareArray(ticket, ticketLength)
  }, [ticketLength, ticket])

  return (
    <Box className='ticket-list-wrapper'>
      <div>
        <Typography className={'market_section_title'}>
          {ticket[0].marketName}
        </Typography>
        <Divider sx={{ marginY: 1 }} />
        <div className={'market_section'}>
          {sections?.map((ticket: any, i: number) => {

            return (
              <div
                className={'row'}
                key={i}
              >
                {ticket.map((item: any) => (
                  <Ticket
                    ticket={item}
                    key={item.id}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </Box>
  )
}

export default React.memo(TicketList)
