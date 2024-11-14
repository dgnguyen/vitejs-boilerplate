import { createSlice } from '@reduxjs/toolkit'
import { API_ENDPOINT } from 'api/endpoint'
import axios from 'axios'
import { AppDispatch, RootState } from 'redux/store'
import { IAgent, IRate } from 'types/listAgents'

export type ListAgents = {
  data: IAgent[]
  loading: boolean
  error: boolean
  rate: IRate
}

const initialState: ListAgents = {
  data: [],
  rate: {},
  loading: false,
  error: false,
}

export const listAgentsReducer = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action?.payload
    },
    setError: (state, action) => {
      state.error = action?.payload
    },
    setListAgents: (state, { payload: { data, conversionRates } }) => {
      state.data = data
      state.rate = conversionRates
    },
    resetListAgents: () => {
      return initialState
    },
  },
})

export const { setLoading, setListAgents, resetListAgents, setError } =
  listAgentsReducer.actions

export const getListAgents = () => {
  return async (dispatch: AppDispatch, getState: Function) => {
    try {
      const { gameType, agent } = getState()?.market?.searchValues
      dispatch(setLoading(true))
      const json = JSON.stringify({
        partnerId: agent,
        gameTypeId: gameType,
      })

      const response = await axios.post(API_ENDPOINT.GET_AGENT, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = response?.data?.data || null

      if (data) dispatch(setListAgents(data))
      return response
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      dispatch(setError(true))
      dispatch(setListAgents([]))
      throw e
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const listAgentsSelector = (state: RootState) => {
  return state?.listAgents
}

export default listAgentsReducer.reducer
