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

  const [submiting, setSubmiting] = useState(false)
  const [errorSubmit, setErrorSubmit] = useState(false)

  const dispatch = useAppDispatch()

  const onSubmit = async (values: AgentBetLimitValuesProps) => {
    setSubmiting(true)
    try {
      const valuesSendToAPI = {
        partnerId: values?.agentSelect !== 'all' ? values?.agentSelect : null,
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
      const response = await axios.post(
        API_ENDPOINT.UPDATE_BET_LIMIT_AGENT,
        json,
        headersContentType
      )
      if (response?.data?.isSuccess) {
        dispatch(addNewAgentBetLimit(response?.data?.data))
        openSnackbar({ message: 'New bet limit values has been changed' })
      } else {
        setErrorSubmit(true)
        openSnackbar({ message: response?.data?.message })
      }
    } catch (e: any) {
      setErrorSubmit(true)
      openSnackbar({ message: e?.response?.data?.message || e })
    } finally {
      setSubmiting(false)
    }
  }
  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()

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
              submiting={submiting}
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
