import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DataReturnProps } from './types'
import { RootState } from 'redux/store'
import axios from 'axios'
import { API_ENDPOINT } from 'api/endpoint'

interface IAgents extends DataReturnProps<unknown> {
  isExporting: boolean
}

const initialState: IAgents = {
  loading: false,
  isLoadingPage: false,
  errors: null,
  data: [],
  page: 1,
  take: 20,
  totalCount: 0,
  hasMore: false,
  isExporting: false,
}

export const agentReducer = createSlice({
  name: 'Agent',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase('getAgents/pending', (state, action) => {
        state.loading = true
        state.errors = false
      })
      .addCase('getAgents/fulfilled', (state, action: any) => {
        const { data, totalCount } = action.payload
        state.loading = false
        state.errors = false
        state.totalCount = totalCount
        state.hasMore = action.payload.hasMore
        state.data = state.page === 1 ? data : [...state.data, ...data]
        state.isLoadingPage = false
      })
      .addCase('getAgents/rejected', (state, action) => {
        state.loading = false
        state.isLoadingPage = false
        state.data = []
      })
  },
  reducers: {},
})

// Action creators are generated for each case reducer function
export const {} = agentReducer.actions

export const getAgentsListAction = createAsyncThunk(
  'getAgents',
  async (dispatch, { rejectWithValue, getState }) => {
    const {
      page,
      take,
      // eslint-disable-next-line no-unsafe-optional-chaining
    } = (getState() as RootState)?.agent
    try {
      const json = JSON.stringify({
        page,
        take,
      })

      const response = await axios.post(API_ENDPOINT.GET_AGENT, json, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log({ response })
      return {
        data: response.data.data,
        settings: {
          totalCount: response.data?.totalCount,
          hasMore: Math.ceil(response.data?.totalCount / take) > page,
        },
      }
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export default agentReducer.reducer
