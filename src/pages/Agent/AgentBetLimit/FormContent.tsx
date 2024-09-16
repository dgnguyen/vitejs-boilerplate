import { useEffect } from 'react'

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'

import { Form, FormikProps, useFormikContext } from 'formik'
import { getUser, isMasterAgent, isSuperAdmin } from 'helpers/auth'
import { IMarketSelect, useFetchMarketByGame } from 'hooks/useFecthMarketByGame'
import { useFetchEventByMarket } from 'hooks/useFetchEventByMarket'
import { IGamesSelect, useFetchGamesByAgent } from 'hooks/useFetchGamesByAgent'
import { NumericFormat } from 'react-number-format'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

import AgentSelectForBetLimit from './AgentSelectForBetLimit'
import { AgentBetLimitValuesProps } from './FormBetLimit'

const FormContent = ({
  props,
  submitting,
}: {
  props: FormikProps<AgentBetLimitValuesProps>
  submitting: boolean
}) => {
  const { values, setFieldValue } = useFormikContext<AgentBetLimitValuesProps>()
  const currency = useSelector((state: RootState) => state?.agent.currency)
  //if its master agent, take his own partnerid to request gamesbyagent, if is superadmin show select agent
  const agentToAPI = isMasterAgent()
    ? getUser()?.partnerId
    : values?.agentSelect
  const { games, loadingGames } = useFetchGamesByAgent(agentToAPI)
  const { markets, loadingMarkets } = useFetchMarketByGame({
    gameId: values?.gameSelect,
    agentId: agentToAPI,
  })
  const { events, loadingEvents } = useFetchEventByMarket({
    marketId: values?.marketSelect,
    gameId: values?.gameSelect,
    agentId: agentToAPI,
  })

  useEffect(() => {
    setFieldValue('gameSelect', '')
  }, [values.agentSelect])

  useEffect(() => {
    setFieldValue('marketSelect', '')
  }, [values.gameSelect])

  useEffect(() => {
    setFieldValue('eventSelect', '')
  }, [values.marketSelect])

  return (
    <Form
      id='betLimitFormSuperAdmin'
      autoComplete='off'
      onSubmit={props.handleSubmit}
    >
      <Box className='flex-wrapper-equal-portion'>
        <Typography>Set limit</Typography>
        <Box
          display='flex'
          gap={2}
          alignItems='center'
        >
          <FormControl>
            <NumericFormat
              value={props.values?.minBet}
              customInput={TextField}
              thousandSeparator
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              name='minBet'
              placeholder='Min bet'
              required
            />
          </FormControl>
          <Typography>to</Typography>
          <FormControl>
            <NumericFormat
              customInput={TextField}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values?.maxBet}
              name='maxBet'
              placeholder='Max bet'
              required
              thousandSeparator
            />
          </FormControl>
        </Box>
        <Box>
          <Typography
            fontSize={18}
            fontWeight='bold'
          >
            {currency}
          </Typography>
        </Box>
      </Box>
      <Box className='flex-wrapper-equal-portion'>
        <Typography>Applied for</Typography>
        <Box
          display='flex'
          gap={2}
          alignItems='center'
        >
          {isSuperAdmin() && <AgentSelectForBetLimit props={props} />}
          <FormControl sx={{ width: 150 }}>
            <InputLabel id='select-game-label'>
              {loadingGames ? <CircularProgress size={14} /> : 'Select Game'}
            </InputLabel>
            <Select
              id='select-game'
              label='Select game'
              labelId='select-game-label'
              name='gameSelect'
              value={props.values.gameSelect}
              onBlur={props.handleBlur}
              disabled={(isSuperAdmin() && games.length === 0) || loadingGames}
              onChange={(e) =>
                props.setFieldValue('gameSelect', e.target.value as string)
              }
              // error={formik.touched.userType && Boolean(formik.errors.userType)}
            >
              <MenuItem value='all'>All</MenuItem>
              {games.map((game: IGamesSelect) => (
                <MenuItem
                  key={game.id}
                  value={game.id}
                >
                  {game.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 150 }}>
            <InputLabel id='select-market-label'>
              {loadingMarkets ? (
                <CircularProgress size={14} />
              ) : (
                'Select Market'
              )}
            </InputLabel>
            <Select
              id='select-market'
              label='Select market'
              labelId='select-market-label'
              name='marketSelect'
              value={props.values.marketSelect}
              onBlur={props.handleBlur}
              disabled={markets.length === 0 || loadingMarkets}
              onChange={(e) =>
                props.setFieldValue('marketSelect', e.target.value as string)
              }
              // error={formik.touched.userType && Boolean(formik.errors.userType)}
            >
              <MenuItem value='all'>All</MenuItem>
              {markets.map((market: IMarketSelect) => (
                <MenuItem
                  key={market.marketId}
                  value={market.marketId}
                >
                  {market.marketName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 180 }}>
            <InputLabel id='select-event-label'>
              {loadingEvents ? (
                <CircularProgress size={14} />
              ) : (
                'Select Sub-Market'
              )}
            </InputLabel>
            <Select
              id='select-event'
              label='Select Sub-Market'
              labelId='select-event-label'
              name='eventSelect'
              value={props.values.eventSelect}
              onBlur={props.handleBlur}
              disabled={events.length === 0 || loadingEvents}
              onChange={(e) =>
                props.setFieldValue('eventSelect', e.target.value as string)
              }
              // error={formik.touched.userType && Boolean(formik.errors.userType)}
            >
              <MenuItem value='all'>All</MenuItem>
              {events.map((event: any) => (
                <MenuItem
                  key={event.id}
                  value={event.eventId}
                >
                  {event.eventName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            disabled={submitting}
            type='submit'
            variant='contained'
            sx={{ textTransform: 'uppercase' }}
          >
            {submitting && <CircularProgress size={14} />}
            <Typography sx={{ textTransform: 'uppercase' }}>confirm</Typography>
          </Button>
        </Box>
      </Box>
    </Form>
  )
}

export default FormContent
