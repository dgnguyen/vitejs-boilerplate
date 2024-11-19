import { useEffect } from 'react'

import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'

import MuiButton from 'components/Commons/MuiButton'
import CurrencySelect from 'components/CurrencySelect'
import { Form, FormikProps, useFormikContext } from 'formik'
import { isOperator, isSuperAdmin } from 'helpers/auth'
import { IMarketSelect, useFetchMarketByGame } from 'hooks/useFecthMarketByGame'
import { useFetchEventByMarket } from 'hooks/useFetchEventByMarket'
import { IGamesSelect, useFetchGamesByAgent } from 'hooks/useFetchGamesByAgent'
import { getCurrencyByAgent } from 'pages/Dashboard/helpers'
import { NumericFormat } from 'react-number-format'
import { useSelector } from 'react-redux'
import { listAgentsSelector } from 'redux/reducers/listAgents'

import AgentSelectForBetLimit from './AgentSelectForBetLimit'
import { AgentBetLimitValuesProps } from './FormBetLimit'

const FormContent = ({
  props,
  submitting,
  isEdit,
}: {
  props: FormikProps<AgentBetLimitValuesProps>
  submitting: boolean
  isEdit?: boolean
}) => {
  const { values, setFieldValue } = useFormikContext<AgentBetLimitValuesProps>()
  //if its master agent, take his own partnerid to request gamesbyagent, if is superadmin show select agent
  const agentToAPI = values?.agentSelect
  const { games, loadingGames } = useFetchGamesByAgent(agentToAPI)

  const { markets, loadingMarkets } = useFetchMarketByGame({
    gameId: values?.gameSelect,
    agentId: agentToAPI,
  })
  const { events, loadingEvents } = useFetchEventByMarket({
    marketId: values?.marketSelect,
    gameId: values?.gameSelect,
    agentId: agentToAPI,
    currency: values?.currency
  })

  const listAgents = useSelector(listAgentsSelector)
  const { data: agents, loading, error } = listAgents
  const currencyTabs = getCurrencyByAgent(props.values.agentSelect, agents, true)

  useEffect(() => {
    if (isEdit) {
      // Set initial values for editing
      setFieldValue('minBet', props.values.minBet || '')
      setFieldValue('maxBet', props.values.maxBet || '')
      setFieldValue('agentSelect', props.values.agentSelect || '')
      setFieldValue('currency', props.values.currency || '')
      setFieldValue('gameSelect', props.values.gameSelect || '')
      setFieldValue('marketSelect', props.values.marketSelect || '')
      setFieldValue('eventSelect', props.values.eventSelect || '')
    }
  }, [isEdit, props.values, setFieldValue])


  useEffect(() => {
    if (!isEdit) {
      setFieldValue('gameSelect', '')
      setFieldValue('currencySelect', '')
    }
  }, [values.agentSelect])

  useEffect(() => {
    if (!isEdit) {
      setFieldValue('eventSelect', '')
    }
  }, [values.currency])

  useEffect(() => {
    if (!isEdit) {
      setFieldValue('marketSelect', '')
    }
  }, [values.gameSelect])

  useEffect(() => {
    if (!isEdit) {
      setFieldValue('eventSelect', '')
    }
  }, [values.marketSelect])

  const handleChangeCurrency = (e: SelectChangeEvent) => {
    props.setFieldValue('currency', e.target.value as string)
  }

  return (
    <Box>
      <Typography variant='h5'>{isEdit ? `Edit Bet Limit` : 'Add New Bet Limit'}</Typography>
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
                placeholder='Min Bet'
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
                placeholder='Max Bet'
                required
                thousandSeparator
              />
            </FormControl>
          </Box>
          <Box>
            <Typography fontWeight="bold">{props.values.currency}</Typography>
          </Box>
        </Box>
        <Box className='flex-wrapper-equal-portion'>
          <Typography>Applied for</Typography>
          <Box
            display='flex'
            gap={2}
            alignItems='center'
            flexWrap="wrap"
          >
            {(isSuperAdmin() || isOperator()) &&
              <AgentSelectForBetLimit
                props={props} />
            }
            <CurrencySelect
              required
              loading={loading}
              error={error}
              currencySelected={props.values.currency}
              currenciesList={currencyTabs}
              handleChangeCurrency={handleChangeCurrency}
            />
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
                disabled={((isSuperAdmin() || isOperator()) && games.length === 0) || loadingGames}
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
                disabled={events.length === 0 || loadingEvents || !props.values.currency}
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
            <MuiButton
              disabled={submitting}
              type='submit'
              variant='contained'
              sx={{ textTransform: 'uppercase' }}
              loading={submitting}
            >
              <Typography sx={{ textTransform: 'uppercase' }}>confirm</Typography>
            </MuiButton>
          </Box>
        </Box>
      </Form>
    </Box>
  )
}

export default FormContent
