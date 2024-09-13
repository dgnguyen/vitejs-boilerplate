import { Formik } from 'formik'
import { Box, Snackbar } from '@mui/material'
import '../style.scss'
import { useState } from 'react'
import FormContent from './FormContent'
import axios from 'axios'
import { API_ENDPOINT } from 'api/endpoint'
import { headersContentType } from 'api/helpers'
import { useSnackbar } from 'hooks/useSnackbar'
import { useAppDispatch } from 'redux/store'
import { addNewAgentBetLimit } from 'redux/reducers/agent'

export type AgentBetLimitValuesProps = {
  minBet: string
  maxBet: string
  agentSelect: string
  gameSelect: string
  marketSelect: string
  eventSelect: string
}

const FormBetLimit = () => {
  const initialState: AgentBetLimitValuesProps = {
    minBet: '',
    maxBet: '',
    agentSelect: '',
    gameSelect: '',
    marketSelect: '',
    eventSelect: '',
  }

  const [submitting, setSubmiting] = useState(false)
  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()

  const dispatch = useAppDispatch()

  const onSubmit = (values: AgentBetLimitValuesProps) => {
    setSubmiting(true)

    const valuesSendToAPI = {
      partnerId:
        values?.agentSelect !== 'all' && values?.agentSelect !== ''
          ? values?.agentSelect
          : null,
      minBet: values?.minBet,
      maxBet: values?.maxBet,
      marketId:
        values?.marketSelect !== 'all' ? values?.marketSelect || null : null,
      eventId:
        values?.eventSelect !== 'all' ? values?.eventSelect || null : null,
      gameTypeId:
        values?.gameSelect !== 'all' ? values?.gameSelect || null : null,
    }
    const json = JSON.stringify(valuesSendToAPI)
    axios
      .post(API_ENDPOINT.UPDATE_BET_LIMIT_AGENT, json, headersContentType)
      .then((response) => {
        if (response?.data?.isSuccess) {
          dispatch(addNewAgentBetLimit(response?.data?.data))
          openSnackbar({ message: 'New bet limit values has been changed' })
        } else {
          openSnackbar({ message: response?.data?.message })
        }
      })
      .catch((e) => {
        openSnackbar({
          message:
            e?.response?.data?.message || 'Error while set agent bet limit',
        })
        console.error({ e })
      })
      .finally(() => {
        setSubmiting(false)
      })
  }

  return (
    <Box className='formAgentBetlimit-wrapper'>
      <Formik
        initialValues={{ ...initialState }}
        onSubmit={onSubmit}
      >
        {(props) => {
          return (
            <FormContent
              props={props}
              submitting={submitting}
            />
          )
        }}
      </Formik>
      {snackbar.open && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={closeSnackbar}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      )}
    </Box>
  )
}

export default FormBetLimit
